import { z } from 'zod';

import { AppError } from '@/shared/services/api/app-error';
import { requestJson } from '@/shared/services/api/client';
import { sessionSchema, type Session } from '@/shared/types/session';

export type LoginCredentials = { username: string; password: string };

const authenticatedSchema = z.object({ authenticated: z.boolean() });
const identitySchema = z.object({ role: z.string() });

export async function login(credentials: LoginCredentials, signal?: AbortSignal): Promise<Session> {
  const response = await requestJson('/auth/login', { method: 'POST', body: credentials, signal });
  const auth = authenticatedSchema.safeParse(response);
  if (!auth.success) throw new AppError('unknown', 'Resposta inesperada do serviço. Tente novamente.');
  if (!auth.data.authenticated) throw new AppError('unauthorized', 'Credenciais incorretas.');
  const identity = identitySchema.safeParse(response);
  if (identity.success && identity.data.role !== 'VIEWER') {
    throw new AppError('forbidden', 'Este aplicativo está disponível apenas para o perfil Visualizador.');
  }
  const result = sessionSchema.safeParse(response);
  if (!result.success) throw new AppError('unknown', 'Resposta inesperada do serviço. Tente novamente.');
  return result.data;
}
