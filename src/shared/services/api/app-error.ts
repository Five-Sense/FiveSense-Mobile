export type AppErrorKind =
  | 'network'
  | 'timeout'
  | 'unauthorized'
  | 'forbidden'
  | 'validation'
  | 'notFound'
  | 'conflict'
  | 'server'
  | 'config'
  | 'unknown';

const USER_MESSAGES: Record<AppErrorKind, string> = {
  network: 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
  timeout: 'O servidor demorou para responder. Tente novamente em instantes.',
  unauthorized: 'Sua sessão expirou. Entre novamente.',
  forbidden: 'Você não possui permissão para realizar esta ação.',
  validation: 'Os dados enviados não são válidos.',
  notFound: 'Não encontramos o que você procura.',
  conflict: 'Esta ação conflita com o estado atual do registro.',
  server: 'O servidor encontrou um problema. Tente novamente em instantes.',
  config: 'O aplicativo não está configurado corretamente.',
  unknown: 'Algo deu errado. Tente novamente.',
};

/** Erro tipado do cliente de API. `message` é seguro para exibir; detalhes internos ficam fora. */
export class AppError extends Error {
  readonly kind: AppErrorKind;
  readonly status?: number;

  constructor(kind: AppErrorKind, status?: number) {
    super(USER_MESSAGES[kind]);
    this.name = 'AppError';
    this.kind = kind;
    this.status = status;
  }
}

export function kindFromStatus(status: number): AppErrorKind {
  if (status === 401) return 'unauthorized';
  if (status === 403) return 'forbidden';
  if (status === 404) return 'notFound';
  if (status === 409) return 'conflict';
  if (status === 400 || status === 422) return 'validation';
  if (status >= 500) return 'server';
  return 'unknown';
}

/** Converte qualquer erro capturado em AppError (nunca devolve o erro bruto às telas). */
export function toAppError(error: unknown): AppError {
  return error instanceof AppError ? error : new AppError('unknown');
}
