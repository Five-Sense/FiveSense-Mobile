import type { TeamStatus } from '../types/team-status';

/** Textos exibidos por status (regra funcional do briefing em docs/design-guidelines.md). */
export const TEAM_STATUS_LABEL: Record<TeamStatus, string> = {
  DOING_5S: 'Fazendo 5S',
  NOT_DOING_5S: 'Não fazendo 5S',
};
