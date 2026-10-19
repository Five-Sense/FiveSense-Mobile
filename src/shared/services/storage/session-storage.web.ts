import type { Session } from '@/shared/types/session';

// Sem armazenamento seguro no navegador: somente memória durante esta visita.
let currentSession: Session | null = null;

export async function readSession(): Promise<Session | null> { return currentSession; }
export async function saveSession(session: Session): Promise<void> { currentSession = session; }
export async function clearSession(): Promise<void> { currentSession = null; }
