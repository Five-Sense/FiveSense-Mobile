import { z } from 'zod';

import type { LoginFeedback, LoginField, LoginValues } from '../types/login-form';

export const loginSchema = z.object({
  identifier: z.string().trim().min(1).max(255),
  // Validar presença sem modificar a senha enviada ao servidor.
  password: z.string().min(1).max(255).refine((value) => value.trim().length > 0),
});

type LoginValidation =
  | { success: true; values: LoginValues }
  | { success: false; feedback: LoginFeedback };

export function validateLogin(values: LoginValues): LoginValidation {
  const result = loginSchema.safeParse(values);
  if (result.success) return { success: true, values: result.data };
  const fields = [...new Set(result.error.issues.map((issue) => issue.path[0]))]
    .filter((field): field is LoginField => field === 'identifier' || field === 'password');
  const missing = !values.identifier.trim() || !values.password.trim();
  return {
    success: false,
    feedback: {
      variant: 'error',
      title: missing ? 'Preencha os campos obrigatórios.' : 'Confira os dados informados.',
      description: missing
        ? 'Informe seu nome de usuário e sua senha para entrar.'
        : 'O nome de usuário e a senha devem ter no máximo 255 caracteres.',
      fields,
    },
  };
}
