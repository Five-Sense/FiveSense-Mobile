/** Linha de 30 min do calendário de 5S com as equipes previstas. */
export type ScheduleSlot = {
  /** "HH:MM". */
  time: string;
  /** Códigos das equipes no horário; vazio mostra "Nenhuma Equipe". */
  teamCodes: string[];
};
