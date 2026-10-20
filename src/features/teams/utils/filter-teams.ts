import type { Team } from '@/features/teams/types/team';

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/** Filtra por nome ou código, ignorando acentos e caixa. */
export function filterTeams(teams: Team[], query: string): Team[] {
  const term = normalize(query);
  if (!term) return teams;
  return teams.filter(
    (team) =>
      [team.name, team.code, team.displayName, team.displayCode].some((value) =>
        normalize(value).includes(term),
      ),
  );
}
