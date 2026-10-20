import { FileExclamationPoint, House, Package, Users } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@/shared/components/layout/app-header';
import { AppMenu } from '@/shared/components/navigation/app-menu';
import { MenuButton } from '@/shared/components/navigation/menu-button';

export type TeamsPageFrameProps = {
  onLogout: () => void;
  onNavigateHome: () => void;
  children: ReactNode;
};

/** Moldura das telas de Equipes (lista e calendário): header, conteúdo e menu inferior com "Equipes" ativo. */
export function TeamsPageFrame({ onLogout, onNavigateHome, children }: TeamsPageFrameProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-page" style={{ paddingTop: insets.top }}>
      <AppHeader onLogout={onLogout} />
      {children}
      <View style={{ paddingBottom: insets.bottom }} className="bg-surface">
        <AppMenu>
          <MenuButton label="Home" icon={House} onPress={onNavigateHome} />
          <MenuButton label="Ocorrências" icon={FileExclamationPoint} onPress={() => {}} />
          <MenuButton label="Equipes" icon={Users} selected onPress={() => {}} />
          <MenuButton label="Materiais" icon={Package} onPress={() => {}} />
        </AppMenu>
      </View>
    </View>
  );
}
