import { LogOut } from 'lucide-react-native';
import { Image, Pressable, View } from 'react-native';

import { Icon } from '@/shared/components/ui/icon';

const LOGO = require('../../../../assets/images/logo-text.png');

export type AppHeaderProps = {
  onNavigateHome: () => void;
  onLogout: () => void;
  homeDisabled?: boolean;
  logoutDisabled?: boolean;
};

/** App/Header (Tablet) do Figma `46:3845`: logo à esquerda e saída à direita, altura 72. */
export function AppHeader({ onNavigateHome, onLogout, homeDisabled = false, logoutDisabled = false }: AppHeaderProps) {
  return (
    <View className="h-[72px] flex-row items-center justify-between border-b border-border-subtle bg-surface px-6 py-5">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Five Sense: ir para a Home"
        accessibilityHint="Volta para o menu principal"
        accessibilityState={{ disabled: homeDisabled }}
        disabled={homeDisabled}
        onPress={onNavigateHome}
        className="min-h-control justify-center rounded-control focus:outline-2 focus:outline-offset-2 focus:outline-focus-ring">
        <Image source={LOGO} accessible={false} resizeMode="contain" style={{ width: 199, height: 26 }} />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Sair"
        accessibilityState={{ disabled: logoutDisabled }}
        disabled={logoutDisabled}
        onPress={onLogout}
        hitSlop={8}
        className="size-control items-center justify-center rounded-control focus:outline-2 focus:outline-offset-2 focus:outline-focus-ring">
        <Icon icon={LogOut} size={32} className={logoutDisabled ? 'text-disabled-text' : 'text-brand-primary'} />
      </Pressable>
    </View>
  );
}
