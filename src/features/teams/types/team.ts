import type { TeamStatus } from '@/features/teams/types/TeamStatus';

/** Equipe como o app usa (convertida de `Team` da API na fronteira, ver teams-service). */
export type Team = {
  id: string;
  /** Nome original da API, ex.: "Produção A". */
  name: string;
  /** Código original (texto livre na API), ex.: "ALMOX", "PROD-A". */
  code: string;
  /** Nome sem designador de repetição, ex.: "Produção". Ver `buildTeamLabels`. */
  displayName: string;
  /** Sigla de 2 letras + número como no protótipo, ex.: "PR-01". */
  displayCode: string;
  status: TeamStatus;
  /** Início do horário de 5S (HH:MM); vazio quando a API não informa. */
  startTime: string;
  /** Fim do horário de 5S (HH:MM); vazio quando a API não informa. */
  endTime: string;
  /** Nomes separados por vírgula na API, já divididos. */
  representatives: string[];
};
