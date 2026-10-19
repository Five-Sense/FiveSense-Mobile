import type { ScheduleStatus } from '@/shared/components/data-display/team-schedule-row';

const SLOT_MINUTES = 30;

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/** past: já terminou; current: em andamento (janela de 30 min); future: ainda vai acontecer. */
export function getSlotStatus(time: string, now: Date): ScheduleStatus {
  const start = toMinutes(time);
  const current = now.getHours() * 60 + now.getMinutes();
  if (current >= start + SLOT_MINUTES) return 'past';
  if (current >= start) return 'current';
  return 'future';
}
