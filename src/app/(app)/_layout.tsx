import { Slot, usePathname, useRouter, type Href } from 'expo-router';

import { AppLayout } from '@/shared/components/layout/app-layout';
import { VIEWER_NAVIGATION_ITEMS } from '@/shared/constants/navigation';

function isActive(href: string, pathname: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function AppGroupLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const activeItem = VIEWER_NAVIGATION_ITEMS.find((item) => isActive(item.href, pathname));

  function handleNavigate(itemId: string) {
    const item = VIEWER_NAVIGATION_ITEMS.find((candidate) => candidate.id === itemId);
    // Rotas de Ocorrências, Equipes e Materiais entram com as respectivas telas.
    if (item) router.navigate(item.href as Href);
  }

  // Logout real (limpar sessão e ir ao login) depende da sessão da Fase 2.
  function handleLogout() {
    router.replace('/');
  }

  return (
    <AppLayout
      items={VIEWER_NAVIGATION_ITEMS}
      activeItemId={activeItem?.id}
      onNavigate={handleNavigate}
      onLogout={handleLogout}>
      <Slot />
    </AppLayout>
  );
}