import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { useSession } from '@/shared/contexts/session-context';
import { toAppError } from '@/shared/services/api/app-error';

import { getMaterials } from '../services/materials-service';

/** Consulta de materiais do Visualizador, com cache por usuário. 401 encerra a sessão e volta ao login. */
export function useMaterials() {
  const { session, endSession } = useSession();
  const expired = useRef(false);

  const query = useQuery({
    queryKey: ['materials', session?.userId],
    queryFn: ({ signal }) => getMaterials(signal),
    enabled: Boolean(session),
    retry: false,
    staleTime: 30_000,
  });

  useEffect(() => {
    if (expired.current || !query.error || toAppError(query.error).kind !== 'unauthorized') return;
    expired.current = true;
    // Falha ao limpar o acesso salvo já é informada pelo contexto de sessão (storageError).
    endSession('Sua sessão expirou. Entre novamente.').catch(() => undefined);
  }, [query.error, endSession]);

  return query;
}
