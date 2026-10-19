import { LogOut } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/shared/components/ui/icon';

export type AppHeaderProps = {
  onLogout: () => void;
  logoutDisabled?: boolean;
  referenceSize?: boolean;
};

const FOCUS_RING = 'outline-solid outline-2 outline-offset-2 outline-focus-ring';

/** Cabeçalho do app: marca à esquerda e "Sair" à direita. Altura 64 no celular e 72 a partir de tablet. */
export function AppHeader({ onLogout, logoutDisabled = false, referenceSize = false }: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const [focused, setFocused] = useState(false);

  return (
    <View
      className="w-full border-b border-border-subtle bg-surface px-[16px] md:px-[24px] lg:px-[32px]"
      style={{ paddingTop: insets.top }}>
      <View className="h-[64px] flex-row items-center justify-between md:h-[72px]">
        <View className={referenceSize ? 'h-[26px] w-[199px]' : 'h-[15px] w-[123px]'}>
          <Image
            source={require('../../../../assets/images/logo-text.png')}
            accessibilityRole="image"
            accessibilityLabel="Five Sense"
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sair"
          accessibilityState={{ disabled: logoutDisabled }}
          disabled={logoutDisabled}
          onPress={onLogout}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`size-control items-center justify-center rounded-control hover:bg-surface-hover active:bg-surface-subtle ${
            focused ? FOCUS_RING : ''
          }`}>
          <Icon
            icon={LogOut}
            size={referenceSize ? 32 : 24}
            className={logoutDisabled ? 'text-disabled-text' : 'text-brand-primary'}
          />
        </Pressable>
      </View>
    </View>
  );
}