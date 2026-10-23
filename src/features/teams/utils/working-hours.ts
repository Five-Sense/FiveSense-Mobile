import type { Team } from '@/features/teams/types/team';

/** Todos os setores trabalham apenas de segunda a sexta (regra informada pelo humano, 2026-10-19). */
export const WORKING_DAYS_LABEL = 'Segunda a sexta';

const TIME = /^([01]\d|2[0-3]):([0-5]\d)$/;

/** "HH:MM" -> minutos desde 00:00; `null` se vazio ou inválido. */
export function timeToMinutes(time: string): number | null {
  const match = TIME.exec(time.trim());
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

/** Janela válida (início antes do fim) em minutos, ou `null` quando a equipe não tem horário utilizável. */
export function getWorkingWindow(team: Pick<Team, 'startTime' | 'endTime'>) {
  const start = timeToMinutes(team.startTime);
  const end = timeToMinutes(team.endTime);
  return start !== null && end !== null && end > start ? { start, end } : null;
}

/** Texto do pop-up: "Segunda a sexta · 13:00 - 15:00"; `undefined` sem horário informado. */
export function formatWorkingHours(team: Pick<Team, 'startTime' | 'endTime'>): string | undefined {
  const window = getWorkingWindow(team);
  return window ? `${WORKING_DAYS_LABEL} · ${team.startTime.trim()} - ${team.endTime.trim()}` : undefined;
}

/** segunda (1) a sexta (5). */
export function isWorkingDay(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}
