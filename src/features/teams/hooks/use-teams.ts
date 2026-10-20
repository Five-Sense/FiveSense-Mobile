import { useCallback, useEffect, useState } from 'react';

import { fetchTeams, updateTeamStatus } from '@/features/teams/services/teams-service';
import type { Team } from '@/features/teams/types/team';
import type { TeamStatus } from '@/features/teams/types/TeamStatus';
import { toAppError } from '@/shared/services/api/app-error';

type TeamsState = {
  teams: Team[];
  isLoading: boolean;
  isRefreshing: boolean;
  /** Mensagem pronta para o usuario; sem detalhes internos. */
  error: string | null;
};

/** Carrega a lista de equipes da API com estados de loading, refresh e erro. */
export function useTeams() {
  const [state, setState] = useState<TeamsState>({
    teams: [],
    isLoading: true,
    isRefreshing: false,
    error: null,
  });

  const fetchInto = useCallback(() => {
    return fetchTeams().then(
      (teams) => setState({ teams, isLoading: false, isRefreshing: false, error: null }),
      (error: unknown) =>
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isRefreshing: false,
          error: toAppError(error).message,
        })),
    );
  }, []);

  const load = useCallback(
    (mode: 'initial' | 'refresh') => {
      setState((prev) => ({
        ...prev,
        isLoading: mode === 'initial',
        isRefreshing: mode === 'refresh',
        error: null,
      }));
      return fetchInto();
    },
    [fetchInto],
  );

  // O estado inicial já é "carregando"; o efeito apenas busca (setState só no callback da promessa).
  useEffect(() => {
    let active = true;
    fetchTeams().then(
      (teams) => active && setState({ teams, isLoading: false, isRefreshing: false, error: null }),
      (error: unknown) =>
        active &&
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isRefreshing: false,
          error: toAppError(error).message,
        })),
    );
    return () => {
      active = false;
    };
  }, []);

  const [pendingIds, setPendingIds] = useState<ReadonlySet<string>>(new Set());
  const [statusError, setStatusError] = useState<string | null>(null);

  /**
   * Alterna Fazendo 5S <-> Não fazendo 5S. Sem atualização otimista: o card só muda quando a API confirma;
   * em falha mantém o último status confirmado e expõe `statusError`. Ignora toques enquanto processa.
   */
  const toggleStatus = useCallback(
    async (team: Team) => {
      if (pendingIds.has(team.id)) return;
      const next: TeamStatus = team.status === 'DOING_5S' ? 'NOT_DOING_5S' : 'DOING_5S';

      setStatusError(null);
      setPendingIds((prev) => new Set(prev).add(team.id));
      try {
        const confirmed = await updateTeamStatus(team.id, next);
        setState((prev) => ({
          ...prev,
          teams: prev.teams.map((item) =>
            item.id === team.id ? { ...item, status: confirmed } : item,
          ),
        }));
      } catch (error) {
        setStatusError(toAppError(error).message);
      } finally {
        setPendingIds((prev) => {
          const rest = new Set(prev);
          rest.delete(team.id);
          return rest;
        });
      }
    },
    [pendingIds],
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
