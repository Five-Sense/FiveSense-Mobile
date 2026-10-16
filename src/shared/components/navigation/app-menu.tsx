import type { ReactNode } from 'react';
import { Platform, View } from 'react-native';

export type AppMenuProps = {
  /** Componha o slot com MenuButtons já filtrados para o perfil atual. */
  children: ReactNode;
  accessibilityLabel?: string;
};

/** App/Menu do Figma. Posicionamento e área segura pertencem ao layout da tela. */
export function AppMenu({ children, accessibilityLabel = 'Navegação principal' }: AppMenuProps) {
  return (
    <View
      {...(Platform.OS === 'web' ? { role: 'navigation' as const } : {})}
      accessibilityLabel={accessibilityLabel}
      className="w-full border-t border-border-subtle bg-surface p-1">
      <View className="min-h-menu-slot flex-row flex-wrap items-center justify-center gap-6 p-[10px]">
        {children}
      </View>
    </View>
  );
}
