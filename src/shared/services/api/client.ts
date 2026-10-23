import { AppError } from './app-error';

const API_PREFIX = '/api/v1';
const TIMEOUT_MS = 60_000;

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  formData?: FormData;
  query?: Record<string, string | number | undefined>;
  signal?: AbortSignal;
  role?: 'VIEWER';
  responseType?: 'json' | 'void';
};

function requestUrl(path: string, query: RequestOptions['query']): string {
  const host = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (!host) throw new AppError('config');
  const params = Object.entries(query ?? {})
    .filter((entry): entry is [string, string | number] => entry[1] !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  return `${host.replace(/\/+$/, '')}${API_PREFIX}${path}${params ? `${path.includes('?') ? '&' : '?'}${params}` : ''}`;
}

function validationFields(data: unknown): string[] {
  if (!data || typeof data !== 'object' || !('errors' in data)) return [];
  const errors = data.errors;
  if (Array.isArray(errors)) {
    return errors.flatMap((entry: unknown) =>
      entry && typeof entry === 'object' && 'field' in entry && typeof entry.field === 'string' ? [entry.field] : [],
    );
  }
  return errors && typeof errors === 'object' ? Object.keys(errors) : [];
}

/** Único transporte HTTP: JSON e multipart; mensagens/erros brutos não são expostos nem registrados. */
export async function requestJson<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  if (options.signal?.aborted) throw new AppError('cancelled');
  const url = requestUrl(path, options.query);
  const controller = new AbortController();
  let timedOut = false;
  const cancel = () => controller.abort();
  options.signal?.addEventListener('abort', cancel, { once: true });
  const timer = setTimeout(() => { timedOut = true; controller.abort(); }, TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: options.method ?? 'GET',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(options.role ? { 'X-User-Role': options.role } : {}),
        ...(options.body !== undefined && !options.formData ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(options.formData ? { body: options.formData } : options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
    });
    if (controller.signal.aborted) throw new AppError(timedOut ? 'timeout' : 'cancelled');
    if (response.ok && (options.responseType === 'void' || response.status === 204)) return undefined as T;
    const text = await response.text();
    if (controller.signal.aborted) throw new AppError(timedOut ? 'timeout' : 'cancelled');
    let data: unknown;
    try { data = text ? JSON.parse(text) : null; }
    catch {
      if (response.ok) throw new AppError('invalidResponse');
    }
    if (!response.ok) throw new AppError(response.status, validationFields(data));
    return data as T;
  } catch (error) {
    if (options.signal?.aborted) throw new AppError('cancelled');
    if (timedOut) throw new AppError('timeout');
    if (error instanceof AppError) throw error;
    throw new AppError('network');
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener('abort', cancel);
  }
}

/** Compatibilidade com consumidores antigos de equipes; não mantém outro transporte. */
export function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  return requestJson<T>(path, { role: 'VIEWER', ...options });
}
