import type { Team } from '@/features/teams/types/team';
import type { TeamStatus } from '@/features/teams/types/TeamStatus';
import { buildTeamLabels } from '@/features/teams/utils/team-labels';
import { apiRequest } from '@/shared/services/api/client';
import type { Page } from '@/shared/types/page';

/** Formato de GET /teams (docs/data-model.md). Não vaza para as telas. */
type TeamDto = {
  id: string;
  name?: string | null;
  code?: string | null;
  representatives?: string | null;
  /** HH:MM; a API aceita vazio. */
  startTime?: string | null;
  endTime?: string | null;
  status: TeamStatus;
};

const PAGE_SIZE = 100;

/** PATCH /teams/{id}/status. Devolve o status confirmado pela API. */
export async function updateTeamStatus(id: string, status: TeamStatus): Promise<TeamStatus> {
  const result = await apiRequest<TeamDto>(`/teams/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    body: { status },
  });
  return result.status;
}

function toTeam(dto: TeamDto): Omit<Team, 'displayName' | 'displayCode'> {
  return {
    id: dto.id,
    name: dto.name?.trim() ?? '',
    code: dto.code?.trim() ?? '',
    status: dto.status,
    startTime: dto.startTime?.trim() ?? '',
    endTime: dto.endTime?.trim() ?? '',
    representatives: (dto.representatives ?? '')
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean),
  };
}

/** Busca todas as páginas de GET /teams (a API pagina; o app lista e filtra localmente). */
export async function fetchTeams(): Promise<Team[]> {
  const teams: Omit<Team, 'displayName' | 'displayCode'>[] = [];
  let page = 0;
  let totalPages = 1;

  while (page < totalPages) {
    const result = await apiRequest<Page<TeamDto>>('/teams', {
      query: { page, size: PAGE_SIZE },
    });
    teams.push(...result.content.map(toTeam));
    totalPages = result.totalPages;
    page += 1;
  }

  const labels = buildTeamLabels(teams);
  return teams.map((team) => ({ ...team, ...labels.get(team.id)! }));
}
