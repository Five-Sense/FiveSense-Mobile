import type { Team } from '@/features/teams/types/team';
import type { ScheduleSlot } from '@/features/teams/types/team-schedule';
import { getWorkingWindow } from '@/features/teams/utils/working-hours';

const SLOT_MINUTES = 30;

function format(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

/**
 * Monta as linhas de 30 min do calendário a partir de `startTime`/`endTime` de cada equipe. Todos os
 * setores trabalham de segunda a sexta, então o calendário é o mesmo em todos os dias úteis.
 * Vai do primeiro início ao último término; equipes sem horário válido ficam de fora. Cada linha lista
 * as equipes cuja janela cobre algum trecho dela.
 */
export function buildScheduleSlots(teams: Team[]): ScheduleSlot[] {
  const scheduled = teams.flatMap((team) => {
    const window = getWorkingWindow(team);
    return window ? [{ team, ...window }] : [];
  });
  if (scheduled.length === 0) return [];

  const first = Math.floor(Math.min(...scheduled.map((item) => item.start)) / SLOT_MINUTES) * SLOT_MINUTES;
  const last = Math.max(...scheduled.map((item) => item.end));

  const slots: ScheduleSlot[] = [];
  for (let minutes = first; minutes < last; minutes += SLOT_MINUTES) {
    const slotEnd = minutes + SLOT_MINUTES;
    slots.push({
      time: format(minutes),
      teamCodes: scheduled
        .filter((item) => item.start < slotEnd && item.end > minutes)
        .map((item) => item.team.displayCode.replace('-', '') || item.team.name),
    });
  }
  return slots;
}
