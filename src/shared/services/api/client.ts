import { AppError, type AppErrorKind } from './app-error';

const API_HOST = process.env.EXPO_PUBLIC_API_URL ?? 'https://fivesense-api.onrender.com';
const TIMEOUT_MS = 60_000;

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  formData?: FormData;
  responseType?: 'json' | 'void';
  signal?: AbortSignal;
  role?: 'VIEWER';
};

function kindForStatus(status: number): AppErrorKind {
  if (status === 401) return 'unauthorized';
  if (status === 403) return 'forbidden';
  if (status === 400 || status === 413 || status === 422) return 'validation';
  if (status === 404) return 'notFound';
  if (status === 409) return 'conflict';
  return status >= 500 ? 'server' : 'unknown';
}

function validationFields(data: unknown): string[] {
  if (!data || typeof data !== 'object' || !('errors' in data)) return [];
  const errors = data.errors;
  if (Array.isArray(errors)) {
    return errors.flatMap((entry: unknown) =>
      entry && typeof entry === 'object' && 'field' in entry && typeof entry.field === 'string'
        ? [entry.field] : [],
    );
  }
  return errors && typeof errors === 'object' ? Object.keys(errors) : [];
}

/** Único ponto HTTP; conteúdo bruto de erros nunca é exibido nem registrado. */
export async function requestJson(path: string, options: RequestOptions = {}): Promise<unknown> {
  const controller = new AbortController();
  let timedOut = false;
  const cancel = () => controller.abort();
  options.signal?.addEventListener('abort', cancel, { once: true });
  if (options.signal?.aborted) controller.abort();
  const timer = setTimeout(() => { timedOut = true; controller.abort(); }, TIMEOUT_MS);

  try {
    const response = await fetch(`${API_HOST.replace(/\/+$/, '')}/api/v1${path}`, {
      method: options.method ?? 'GET',
      headers: {
        Accept: 'application/json',
        ...(options.body !== undefined && !options.formData ? { 'Content-Type': 'application/json' } : {}),
        ...(options.role ? { 'X-User-Role': options.role } : {}),
      },
      ...(options.formData ? { body: options.formData } : options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
      signal: controller.signal,
    });
    if (response.ok && options.responseType === 'void') return null;
    const text = await response.text();
    let data: unknown;
    try { data = text ? JSON.parse(text) : null; }
    catch {
      if (response.ok) throw new AppError('unknown', 'Resposta inesperada do serviço. Tente novamente.');
    }
    if (!response.ok) {
      throw new AppError(kindForStatus(response.status), 'A solicitação não foi concluída.', response.status, validationFields(data));
    }
    return data;
  } catch (error) {
    if (timedOut) throw new AppError('timeout', 'O serviço demorou para responder. Tente novamente.');
    if (controller.signal.aborted) throw new AppError('cancelled', 'Solicitação cancelada.');
    if (error instanceof AppError) throw error;
    throw new AppError('network', 'Não foi possível conectar. Verifique sua conexão e tente novamente.');
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener('abort', cancel);
  }
}
