import type { LucideIcon } from 'lucide-react-native';
import { LoaderCircle } from 'lucide-react-native';
import { styled } from 'nativewind';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive';

export type ButtonProps = {
  /** Rotulo exibido no botao. */
  children: string;
  /** Variacao visual. Padrao: `primary`. */
  variant?: ButtonVariant;
  onPress?: () => void;
  /** Desabilita o botao: sem toque e com o visual de desabilitado. */
  disabled?: boolean;
  /** Mostra o spinner e bloqueia toques repetidos. */
  loading?: boolean;
  /** Rotulo no estado de carregamento (ex.: "Salvando..."). Sem ele, mantem `children`. */
  loadingLabel?: string;
  /** Icone Lucide opcional, exibido antes do rotulo. */
  icon?: LucideIcon;
};

const ICON_SIZE = 24;
const SPINNER_SIZE = 20;

type VariantClasses = {
  /** Fundo e borda por estado de interacao. */
  container: string;
  /** Cor do rotulo e do icone. */
  content: string;
};

// Classes completas e estaticas para o Tailwind detectar. Somente tokens de src/global.css.
const VARIANT_CLASSES: Record<ButtonVariant, { idle: VariantClasses; interactive: VariantClasses }> = {
  primary: {
    idle: { container: 'bg-brand-action', content: 'text-on-brand' },
    interactive: {
      container: 'bg-brand-action hover:bg-brand-action-hover active:bg-brand-dark',
      content: 'text-on-brand',
    },
  },
  secondary: {
    idle: { container: 'bg-surface border border-border-subtle', content: 'text-brand-action' },
    interactive: {
      container:
        'bg-surface border border-border-subtle hover:bg-surface-hover active:bg-brand-soft',
      content: 'text-brand-action',
    },
  },
  destructive: {
    idle: { container: 'bg-destructive', content: 'text-on-brand' },
    interactive: {
      container: 'bg-destructive hover:bg-destructive-pressed active:bg-destructive-pressed',
      content: 'text-on-brand',
    },
  },
};

const DISABLED_CLASSES: VariantClasses = {
  container: 'bg-disabled-bg',
  content: 'text-disabled-text',
};

const BASE_CONTAINER =
  'w-full min-h-control flex-row items-center justify-center gap-[8px] p-[8px] rounded-control';
const FOCUS_RING = 'outline-solid outline-2 outline-offset-2 outline-focus-ring';

type IconGlyphProps = { icon: LucideIcon; size: number; color?: string };

function IconGlyph({ icon: Icon, size, color }: IconGlyphProps) {
  return <Icon size={size} color={color} strokeWidth={2} />;
}

// Converte `className="text-..."` na prop `color` do SVG, sem hex no codigo.
const StyledIconGlyph = styled(IconGlyph, {
  className: { target: false, nativeStyleMapping: { color: 'color' } },
});

function Spinner({ contentClassName }: { contentClassName: string }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1);
    return () => cancelAnimation(rotation);
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <StyledIconGlyph icon={LoaderCircle} size={SPINNER_SIZE} className={contentClassName} />
    </Animated.View>
  );
}

export function Button({
  children,
  variant = 'primary',
  onPress,
  disabled = false,
  loading = false,
  loadingLabel,
  icon,
}: ButtonProps) {
  const [focused, setFocused] = useState(false);

  const colors = disabled
    ? DISABLED_CLASSES
    : loading
      ? VARIANT_CLASSES[variant].idle
      : VARIANT_CLASSES[variant].interactive;

  const trimmedLoadingLabel = loadingLabel?.trim();
  const label = loading && trimmedLoadingLabel ? trimmedLoadingLabel : children;
  const blocked = disabled || loading;

  function handlePress() {
    if (blocked) return;
    onPress?.();
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled, busy: loading }}
      onPress={handlePress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`${BASE_CONTAINER} ${colors.container} ${focused ? FOCUS_RING : ''}`}
    >
      {loading ? (
        <Spinner contentClassName={colors.content} />
      ) : icon ? (
        <View className="size-icon-slot items-center justify-center">
          <StyledIconGlyph icon={icon} size={ICON_SIZE} className={colors.content} />
        </View>
      ) : null}
      <Text
        className={`shrink text-center text-button font-montserrat-semibold ${colors.content}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
