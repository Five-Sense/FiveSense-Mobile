import { useIsMutating } from '@tanstack/react-query';
import { Redirect, Slot, usePathname, useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AppLayout } from '@/shared/components/layout/app-layout';
import { Spinner } from '@/shared/components/ui/spinner';
import { VIEWER_NAVIGATION_ITEMS } from '@/shared/constants/navigation';
import { useSession } from '@/shared/contexts/session-context';

export default function AppGroupLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { session, restoring, endSession } = useSession();
  const [loggingOut, setLoggingOut] = useState(false);
  const sending = useIsMutating({ mutationKey: ['occurrence-create'] }) > 0;
  const activeItem = VIEWER_NAVIGATION_ITEMS.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));

  if (restoring) return <View className="flex-1 items-center justify-center gap-[12px] bg-page"><Spinner size={32} className="text-brand-action" /><Text className="font-montserrat text-helper text-text-secondary">Carregando seu acesso...</Text></View>;
  if (!session) return <Redirect href="/" />;

  function handleNavigate(itemId: string) {
    if (sending || loggingOut) return;
    const item = VIEWER_NAVIGATION_ITEMS.find((candidate) => candidate.id === itemId);
    if (item && pathname !== item.href) router.navigate(item.href as Href);
  }

  async function handleLogout() {
    if (sending || loggingOut) return;
    setLoggingOut(true);
    try { await endSession(); router.replace('/'); }
    catch { router.replace('/'); }
    finally { setLoggingOut(false); }
  }

  return (
    <AppLayout items={VIEWER_NAVIGATION_ITEMS} activeItemId={activeItem?.id} onNavigate={handleNavigate}
      onNavigateHome={() => handleNavigate('home')} onLogout={handleLogout}
      navigationDisabled={sending || loggingOut} logoutDisabled={sending || loggingOut}>
      <Slot />
    </AppLayout>
  );
}
