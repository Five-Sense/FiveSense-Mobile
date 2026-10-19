import { LogOut } from 'lucide-react-native';
import { Image, Pressable, View } from 'react-native';

import { Icon } from '@/shared/components/ui/icon';

const LOGO = require('../../../../assets/images/logo-text.png');

export type AppHeaderProps = {
  onLogout: () => void;
};

/** App/Header (Tablet) do Figma `46:3845`: logo à esquerda e saída à direita, altura 72. */
export function AppHeader({ onLogout }: AppHeaderProps) {
  return (
    <View className="h-[72px] flex-row items-center justify-between border-b border-border-subtle bg-surface px-6 py-5">
      <Image
        source={LOGO}
        accessibilityLabel="Five Sense"
        resizeMode="contain"
        style={{ width: 199, height: 26 }}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Sair"
        onPress={onLogout}
        hitSlop={8}
        className="size-control items-center justify-center">
        <Icon icon={LogOut} size={32} className="text-brand-primary" />
      </Pressable>
    </View>
  );
}
