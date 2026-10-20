import { AppError, kindFromStatus } from '@/shared/services/api/app-error';

const API_PREFIX = '/api/v1';
// O host (Render) pode levar dezenas de segundos para "acordar" na primeira chamada.
const TIMEOUT_MS = 60_000;

/**
 * Perfil enviado em `X-User-Role` (exigido pela API em toda rota fora de /auth). Este app é exclusivo do
 * Visualizador (decisão 0009). Quando o login existir (ISSUE-003), o valor deve vir do `role` da sessão.
 */
const USER_ROLE = 'VIEWER';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  query?: Record<string, string | number | undefined>;
};

function baseUrl(): string {
  const url = process.env.EXPO_PUBLIC_API_URL;
  if (!url) throw new AppError('config');
  return url.replace(/\/+$/, '');
}

/** Único ponto de saída HTTP do app. Devolve dado tipado ou lança `AppError`. */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, query } = options;

  const params = Object.entries(query ?? {})
    .filter((entry): entry is [string, string | number] => entry[1] !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  const url = `${baseUrl()}${API_PREFIX}${path}${params ? `?${params}` : ''}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'X-User-Role': USER_ROLE,
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    throw new AppError(error instanceof Error && error.name === 'AbortError' ? 'timeout' : 'network');
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) throw new AppError(kindFromStatus(response.status), response.status);
  if (response.status === 204) return undefined as T;

  try {
    return (await response.json()) as T;
  } catch {
    throw new AppError('unknown', response.status);
  }
}
