import * as SecureStore from 'expo-secure-store';

import { sessionSchema, type Session } from '@/shared/types/session';

const KEY = 'five-sense.viewer-session';

export async function readSession(): Promise<Session | null> {
  const value = await SecureStore.getItemAsync(KEY);
  if (!value) return null;
  let data: unknown;
  try { data = JSON.parse(value); }
  catch { await clearSession(); return null; }
  const result = sessionSchema.safeParse(data);
  if (!result.success) { await clearSession(); return null; }
  return result.data;
}

export async function saveSession(session: Session): Promise<void> {
  await SecureStore.setItemAsync(KEY, JSON.stringify(session), {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}

export async function clearSession(): Promise<void> {
  await SecureStore.deleteItemAsync(KEY);
}
