import { toAppError } from '@/shared/services/api/app-error';

export type MaterialsFeedback = { title: string; description: string };

/** Mensagem segura para o usuário; nunca expõe o conteúdo bruto da resposta. Acesso negado não vira falha de conexão. */
export function describeMaterialsError(error: unknown): MaterialsFeedback {
  const appError = toAppError(error);
  switch (appError.kind) {
    case 'forbidden':
      return { title: 'Acesso negado.', description: 'Você não possui permissão para realizar esta ação.' };
    case 'unauthorized':
      return { title: 'Sua sessão expirou.', description: 'Entre novamente para consultar os materiais.' };
    case 'network':
    case 'timeout':
      return { title: 'Não foi possível conectar.', description: 'Verifique sua conexão e tente novamente.' };
    case 'server':
      return { title: 'O serviço está indisponível.', description: 'Tente novamente em instantes.' };
    default:
      return { title: 'Não foi possível carregar os materiais.', description: appError.message };
  }
}

export function countLabel(total: number) {
  return `${total} ${total === 1 ? 'material disponível' : 'materiais disponíveis'}`;
}
