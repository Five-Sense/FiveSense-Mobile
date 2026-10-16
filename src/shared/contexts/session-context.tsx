import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { AppError } from '@/shared/services/api/app-error';
import * as storage from '@/shared/services/storage/session-storage';
import type { Session } from '@/shared/types/session';

type SessionContextValue = {
  session: Session | null;
  restoring: boolean;
  storageError: string | null;
  startSession: (session: Session) => Promise<void>;
  endSession: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [restoring, setRestoring] = useState(true);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    storage.readSession()
      .then((saved) => { if (active) setSession(saved); })
      .catch(() => { if (active) setStorageError('Não foi possível restaurar seu acesso. Entre novamente.'); })
      .finally(() => { if (active) setRestoring(false); });
    return () => { active = false; };
  }, []);

  async function startSession(next: Session) {
    try { await storage.saveSession(next); }
    catch { throw new AppError('unknown', 'Não foi possível guardar seu acesso com segurança. Tente novamente.'); }
    setStorageError(null);
    setSession(next);
  }

  async function endSession() {
    setSession(null);
    try { await storage.clearSession(); }
    catch { throw new AppError('unknown', 'Não foi possível limpar o acesso salvo. Tente novamente.'); }
  }

  return (
    <SessionContext.Provider value={{ session, restoring, storageError, startSession, endSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession deve estar dentro de SessionProvider.');
  return context;
}
