import { useEffect, useRef, useState } from 'react';

import { useSession } from '@/shared/contexts/session-context';

import { validateLogin } from '../schemas/login-schema';
import { login } from '../services/auth-service';
import type { LoginFeedback, LoginField, LoginValues } from '../types/login-form';
import { feedbackForLoginError } from '../utils/login-feedback';

export function useLogin() {
  const { session, restoring, storageError, startSession } = useSession();
  const [values, setValues] = useState<LoginValues>({ identifier: '', password: '' });
  const [feedback, setFeedback] = useState<LoginFeedback | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const busy = useRef(false);
  const mounted = useRef(true);
  const request = useRef<AbortController | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; request.current?.abort(); };
  }, []);

  function change(field: LoginField, value: string) {
    if (busy.current || session) return;
    setValues((current) => ({ ...current, [field]: value }));
    setFeedback((current) => {
      if (!current || current.fields.length === 0 || current.title === 'Não foi possível entrar.') return null;
      const fields = current.fields.filter((item) => item !== field);
      return fields.length ? { ...current, fields } : null;
    });
  }

  async function submit(): Promise<void> {
    if (busy.current || restoring || session) return;
    const validation = validateLogin(values);
    if (!validation.success) { setFeedback(validation.feedback); return; }
    busy.current = true;
    setSubmitting(true);
    setFeedback(null);
    const controller = new AbortController();
    request.current = controller;

    try {
      const next = await login({ username: validation.values.identifier, password: validation.values.password }, controller.signal);
      if (!mounted.current || controller.signal.aborted) return;
      await startSession(next);
      if (mounted.current) setValues({ identifier: next.username, password: '' });
    } catch (error) {
      if (mounted.current) setFeedback(feedbackForLoginError(error));
    } finally {
      busy.current = false;
      if (mounted.current) setSubmitting(false);
      if (request.current === controller) request.current = null;
    }
  }

  const displayedFeedback: LoginFeedback | null = session
    ? { variant: 'success', title: 'Login realizado.', description: 'Seu acesso foi confirmado. Você está conectado.', fields: [] }
    : feedback ?? (storageError ? { variant: 'error', title: 'Entre novamente.', description: storageError, fields: [] } : null);

  return { values, feedback: displayedFeedback, loading: submitting || restoring, connected: session !== null, change, submit };
}
