import type { Team } from '@/features/teams/types/team';

type RawTeam = Pick<Team, 'id' | 'name' | 'code'>;

export type TeamLabels = {
  /** Nome sem o designador de repetição: "Produção A" -> "Produção". */
  displayName: string;
  /** Sigla de 2 letras + número, como no protótipo: "PR-01". Sem número quando a equipe é única. */
  displayCode: string;
};

const CONNECTORS = new Set(['de', 'da', 'do', 'das', 'dos', 'e']);
// Designador de repetição no fim do nome: uma letra ("A") ou número ("2").
const DESIGNATOR = /^(.*\S)\s+([A-Za-z]|\d+)$/;

function stripAccents(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/** "Manutenção Química" -> "MQ"; nome de uma palavra usa as duas primeiras letras ("Expedição" -> "EX"). */
function abbreviate(name: string): string {
  const words = stripAccents(name)
    .split(/\s+/)
    .filter((word) => word && !CONNECTORS.has(word.toLowerCase()));
  const letters =
    words.length >= 2 ? words[0][0] + words[1][0] : (words[0] ?? name).replace(/[^A-Za-z]/g, '').slice(0, 2);
  return letters.toUpperCase();
}

function designatorValue(designator: string): number {
  return /^\d+$/.test(designator) ? Number(designator) : designator.toUpperCase().charCodeAt(0) - 64;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/**
 * Deriva nome e sigla de exibição. A API não separa sigla e número (`code` é livre: "ALMOX", "PROD-A"),
 * então equipes com o mesmo nome base viram sigla + número: "Produção A/B" -> "PR-01"/"PR-02".
 */
export function buildTeamLabels(teams: RawTeam[]): Map<string, TeamLabels> {
  const parsed = teams.map((team) => {
    const match = DESIGNATOR.exec(team.name.trim());
    return {
      id: team.id,
      base: match ? match[1] : team.name.trim() || team.code,
      designator: match ? match[2] : undefined,
    };
  });

  const groups = new Map<string, typeof parsed>();
  for (const item of parsed) {
    const key = stripAccents(item.base).toLowerCase();
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }

  const labels = new Map<string, TeamLabels>();
  for (const members of groups.values()) {
    members.forEach((member, index) => {
      const repeated = members.length > 1 || member.designator !== undefined;
      const number = member.designator ? designatorValue(member.designator) : index + 1;
      const abbreviation = abbreviate(member.base);
      labels.set(member.id, {
        displayName: member.base,
        displayCode: repeated ? `${abbreviation}-${pad(number)}` : abbreviation,
      });
    });
  }
  return labels;
}
