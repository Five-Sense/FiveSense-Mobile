import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchTeams, updateTeamStatus } from '@/features/teams/services/teams-service';
import type { Team } from '@/features/teams/types/team';
import type { TeamStatus } from '@/features/teams/types/TeamStatus';
import { useSession } from '@/shared/contexts/session-context';
import { toAppError } from '@/shared/services/api/app-error';

type TeamsState = {
  teams: Team[];
  isLoading: boolean;
  isRefreshing: boolean;
  /** Mensagem pronta para o usuario; sem detalhes internos. */
  error: string | null;
};

/** Carrega a lista de equipes da API; 401 encerra a sessão e volta ao login. */
export function useTeams() {
  const { session, endSession } = useSession();
  const userId = session?.userId;
  const active = useRef(false);
  const generation = useRef(0);
  const expired = useRef(false);
  const [state, setState] = useState<TeamsState>({
    teams: [],
    isLoading: Boolean(userId),
    isRefreshing: false,
    error: null,
  });
  const [pendingIds, setPendingIds] = useState<ReadonlySet<string>>(new Set());
  const [statusError, setStatusError] = useState<string | null>(null);

  const isCurrent = useCallback((run: number) => (
    active.current && generation.current === run && !expired.current
  ), []);

  const expireSession = useCallback(async () => {
    if (expired.current) return;
    expired.current = true;
    // O contexto já apresenta falhas de limpeza do acesso salvo no login.
    await endSession('Sua sessão expirou. Entre novamente.').catch(() => undefined);
  }, [endSession]);

  const fetchInto = useCallback(async () => {
    if (!userId || !active.current || expired.current) return;
    const run = generation.current;
    try {
      const teams = await fetchTeams();
      if (isCurrent(run)) setState({ teams, isLoading: false, isRefreshing: false, error: null });
    } catch (failure) {
      if (!isCurrent(run)) return;
      const error = toAppError(failure);
      if (error.kind === 'unauthorized') { await expireSession(); return; }
      setState((prev) => ({ ...prev, isLoading: false, isRefreshing: false, error: error.message }));
    }
  }, [userId, isCurrent, expireSession]);

  const load = useCallback(
    (mode: 'initial' | 'refresh') => {
      if (!userId || !active.current || expired.current) return Promise.resolve();
      setState((prev) => ({
        ...prev,
        isLoading: mode === 'initial',
        isRefreshing: mode === 'refresh',
        error: null,
      }));
      return fetchInto();
    },
    [userId, fetchInto],
  );

  // A geração impede que respostas anteriores atualizem uma tela desmontada ou outra sessão.
  useEffect(() => {
    active.current = true;
    generation.current += 1;
    expired.current = false;
    void Promise.resolve().then(fetchInto);
    return () => {
      active.current = false;
      generation.current += 1;
    };
  }, [fetchInto]);

  /**
   * Alterna Fazendo 5S <-> Não fazendo 5S. Sem atualização otimista: o card só muda quando a API confirma;
   * em falha mantém o último status confirmado e expõe `statusError`. Ignora toques enquanto processa.
   */
  const toggleStatus = useCallback(
    async (team: Team) => {
      if (!userId || !active.current || expired.current || pendingIds.has(team.id)) return;
      const run = generation.current;
      const next: TeamStatus = team.status === 'DOING_5S' ? 'NOT_DOING_5S' : 'DOING_5S';

      setStatusError(null);
      setPendingIds((prev) => new Set(prev).add(team.id));
      try {
        const confirmed = await updateTeamStatus(team.id, next);
        if (!isCurrent(run)) return;
        setState((prev) => ({
          ...prev,
          teams: prev.teams.map((item) =>
            item.id === team.id ? { ...item, status: confirmed } : item,
          ),
        }));
      } catch (failure) {
        if (!isCurrent(run)) return;
        const error = toAppError(failure);
        if (error.kind === 'unauthorized') { await expireSession(); return; }
        setStatusError(error.message);
      } finally {
        if (isCurrent(run)) {
          setPendingIds((prev) => {
            const rest = new Set(prev);
            rest.delete(team.id);
            return rest;
          });
        }
      }
    },
    [userId, pendingIds, isCurrent, expireSession],
  );

  return {
    ...state,
    pendingIds,
    statusError,
    dismissStatusError: () => setStatusError(null),
    toggleStatus,
    retry: () => load('initial'),
    refresh: () => load('refresh'),
  };
}
