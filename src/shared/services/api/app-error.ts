export type AppErrorKind =
  | 'network' | 'timeout' | 'cancelled' | 'unauthorized' | 'forbidden'
  | 'validation' | 'notFound' | 'conflict' | 'server' | 'config' | 'unknown';

const ERRORS = {
  network: { kind: 'network', message: 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.' },
  timeout: { kind: 'timeout', message: 'O servidor demorou para responder. Tente novamente em instantes.' },
  cancelled: { kind: 'cancelled', message: 'Solicitação cancelada.' },
  unauthorized: { kind: 'unauthorized', message: 'Sua sessão expirou. Entre novamente.' },
  forbidden: { kind: 'forbidden', message: 'Você não possui permissão para realizar esta ação.' },
  validation: { kind: 'validation', message: 'Os dados enviados não são válidos.' },
  notFound: { kind: 'notFound', message: 'Não encontramos o que você procura.' },
  conflict: { kind: 'conflict', message: 'Esta ação conflita com o estado atual do registro.' },
  server: { kind: 'server', message: 'O servidor encontrou um problema. Tente novamente em instantes.' },
  config: { kind: 'config', message: 'O aplicativo não está configurado corretamente.' },
  unknown: { kind: 'unknown', message: 'Algo deu errado. Tente novamente.' },
  invalidResponse: { kind: 'unknown', message: 'Resposta inesperada do serviço. Tente novamente.' },
  invalidCredentials: { kind: 'unauthorized', message: 'Credenciais incorretas.' },
  viewerOnly: { kind: 'forbidden', message: 'Este aplicativo está disponível apenas para o perfil Visualizador.' },
  tooManyImages: { kind: 'validation', message: 'Anexe no máximo 5 fotos por ocorrência. Remova uma foto antes de adicionar outra.' },
  invalidImageType: { kind: 'validation', message: 'Selecione fotos nos formatos JPG ou PNG.' },
  invalidImageSize: { kind: 'validation', message: 'Não foi possível verificar o tamanho de uma das fotos. Escolha outra imagem.' },
  imageTooLarge: { kind: 'validation', message: 'Cada foto deve ter no máximo 5 MB. Escolha um arquivo menor.' },
  attachmentsTooLarge: { kind: 'validation', message: 'As fotos devem somar no máximo 20 MB. Remova uma foto ou escolha arquivos menores.' },
  cameraPermissionDenied: { kind: 'validation', message: 'Permita o acesso à câmera ou escolha fotos da galeria.' },
  sessionSaveFailed: { kind: 'unknown', message: 'Não foi possível guardar seu acesso com segurança. Tente novamente.' },
  sessionClearFailed: { kind: 'unknown', message: 'Não foi possível limpar o acesso salvo. Tente novamente.' },
} satisfies Record<string, { kind: AppErrorKind; message: string }>;

export type AppErrorCode = keyof typeof ERRORS;

const HTTP_MESSAGES: Partial<Record<number, string>> = {
  413: 'Os arquivos enviados ultrapassam o tamanho permitido.',
  429: 'Muitas solicitações. Aguarde um momento e tente novamente.',
};

/** HTTP usa o status numérico; falhas locais usam códigos, nunca texto livre ou HTTP inventado. */
export class AppError extends Error {
  readonly kind: AppErrorKind;
  readonly status?: number;
  readonly fields: readonly string[];

  constructor(public readonly code: number | AppErrorCode, fields: readonly string[] = []) {
    const definition = ERRORS[typeof code === 'number' ? kindFromStatus(code) : code];
    super((typeof code === 'number' ? HTTP_MESSAGES[code] : undefined) ?? definition.message);
    this.name = 'AppError';
    this.kind = definition.kind;
    this.status = typeof code === 'number' ? code : undefined;
    this.fields = [...fields];
  }
}

export function kindFromStatus(status: number): AppErrorKind {
  if (status === 401) return 'unauthorized';
  if (status === 403) return 'forbidden';
  if (status === 404) return 'notFound';
  if (status === 409) return 'conflict';
  if (status === 400 || status === 413 || status === 422) return 'validation';
  if (status >= 500 && status < 600) return 'server';
  return 'unknown';
}

/** Mantém somente mensagens do catálogo; erros brutos nunca chegam à interface. */
export function toAppError(error: unknown): AppError {
  return error instanceof AppError ? error : new AppError('unknown');
}
