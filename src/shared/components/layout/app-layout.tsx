import type { LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppMenu } from '@/shared/components/navigation/app-menu';
import { MenuButton } from '@/shared/components/navigation/menu-button';

import { AppHeader } from './app-header';

export type AppLayoutItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export type AppLayoutProps = {
  /** Somente os itens permitidos ao perfil atual. */
  items: readonly AppLayoutItem[];
  activeItemId?: string;
  onNavigate: (itemId: string) => void;
  onLogout: () => void;
  /** Conteúdo da tela, entre o cabeçalho e o menu. */
  children: ReactNode;
  navigationDisabled?: boolean;
  logoutDisabled?: boolean;
  referenceHeader?: boolean;
};

/** Moldura do sistema (protótipo "04 · Principal"): cabeçalho, conteúdo e menu inferior. */
export function AppLayout({ items, activeItemId, onNavigate, onLogout, children, navigationDisabled = false, logoutDisabled = false, referenceHeader = false }: AppLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-page">
      <AppHeader onLogout={onLogout} logoutDisabled={logoutDisabled} referenceSize={referenceHeader} />
      <View className="flex-1">{children}</View>
      <View className="bg-surface" style={{ paddingBottom: insets.bottom }}>
        <AppMenu>
          {items.map((item) => (
            <MenuButton
              key={item.id}
              disabled={navigationDisabled}
              label={item.label}
              icon={item.icon}
              selected={item.id === activeItemId}
              onPress={() => onNavigate(item.id)}
            />
          ))}
        </AppMenu>
      </View>
    </View>
  );
}