import { LogOut } from 'lucide-react-native';
import { styled } from 'nativewind';
import { Image, Pressable, View } from 'react-native';

const logoText = require('@/assets/images/logo-text.png');

export type HeaderProps = {
  /** Acao executada ao tocar em sair. */
  onLogout?: () => void;
  /** Rotulo acessivel do botao de sair. */
  logoutAccessibilityLabel?: string;
};

type HeaderIconProps = { size: number; color?: string };

function HeaderIcon({ size, color }: HeaderIconProps) {
  return <LogOut size={size} color={color} strokeWidth={2} />;
}

// Converte o token NativeWind em `color` para o SVG, sem cor hexadecimal no componente.
const StyledHeaderIcon = styled(HeaderIcon, {
  className: { target: false, nativeStyleMapping: { color: 'color' } },
});

/**
 * Cabeçalho principal exclusivo do tablet.
 *
 * A largura acompanha o contêiner pai; a composição permanece preservada em
 * telas largas e estreitas, sem largura fixa.
 */
export default function Header({
  onLogout,
  logoutAccessibilityLabel = 'Sair da conta',
}: HeaderProps) {
  return (
    <View className="h-[72px] w-full flex-row items-center border-b border-border-subtle justify-between bg-surface px-[24px]">
      <Image
        accessibilityLabel="Five Sense"
        accessible
        resizeMode="contain"
        source={logoText}
        className="h-[30px] w-[246px] max-w-[70%]"
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={logoutAccessibilityLabel}
        accessibilityState={{ disabled: !onLogout }}
        disabled={!onLogout}
        hitSlop={8}
        onPress={onLogout}
        className="text-brand-primary size-control shrink-0 items-center justify-center rounded-control hover:bg-surface-hover active:bg-brand-soft focus:outline-solid focus:outline-2 focus:outline-offset-2 focus:outline-focus-ring"
      >
        <StyledHeaderIcon size={24} className="text-brand-primary" />
      </Pressable>
    </View>
  );
}
