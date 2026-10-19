import { toAppError } from '@/shared/services/api/app-error';

import type { LoginFeedback, LoginField } from '../types/login-form';

export function feedbackForLoginError(error: unknown): LoginFeedback | null {
  const appError = toAppError(error);
  if (appError.kind === 'cancelled') return null;
  if (appError.kind === 'unauthorized' || (appError.status === 400 && appError.fields.length === 0)) {
    return {
      variant: 'error', title: 'Não foi possível entrar.',
      description: 'Usuário ou senha incorretos. Confira os dados e tente novamente.',
      fields: ['identifier', 'password'],
    };
  }
  if (appError.kind === 'validation') {
    const fields: LoginField[] = [];
    if (appError.fields.includes('username')) fields.push('identifier');
    if (appError.fields.includes('password')) fields.push('password');
    return { variant: 'error', title: 'Confira os dados informados.', description: 'Verifique os campos e tente novamente.', fields };
  }
  if (appError.kind === 'forbidden') {
    return { variant: 'error', title: 'Acesso não permitido.', description: 'Este aplicativo está disponível apenas para o perfil Visualizador.', fields: [] };
  }
  if (appError.kind === 'server' || appError.kind === 'notFound') {
    return { variant: 'error', title: 'Serviço indisponível.', description: 'Não foi possível entrar agora. Tente novamente em instantes.', fields: [] };
  }
  return { variant: 'error', title: 'Não foi possível entrar.', description: appError.message, fields: [] };
}
