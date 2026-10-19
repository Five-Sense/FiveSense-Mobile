export type AppErrorKind =
  | 'network' | 'timeout' | 'cancelled' | 'unauthorized' | 'forbidden'
  | 'validation' | 'notFound' | 'conflict' | 'server' | 'unknown';

export class AppError extends Error {
  constructor(
    public readonly kind: AppErrorKind,
    message: string,
    public readonly status?: number,
    public readonly fields: readonly string[] = [],
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function toAppError(error: unknown): AppError {
  return error instanceof AppError
    ? error
    : new AppError('unknown', 'Não foi possível concluir a operação. Tente novamente.');
}
