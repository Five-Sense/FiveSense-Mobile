import type { LucideIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../icon';
import { Spinner } from '../spinner';

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
  /** Ícone Lucide opcional; posição inicial preserva os usos existentes. */
  icon?: LucideIcon;
  iconPosition?: 'start' | 'end';
  iconSize?: number;
};

const ICON_SIZE = 24;

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

export function Button({
  children,
  variant = 'primary',
  onPress,
  disabled = false,
  loading = false,
  loadingLabel,
  icon,
  iconPosition = 'start',
  iconSize = ICON_SIZE,
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
      disabled={blocked}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: blocked, busy: loading }}
      aria-disabled={blocked}
      aria-busy={loading}
      onPress={handlePress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`${BASE_CONTAINER} ${colors.container} ${focused ? FOCUS_RING : ''}`}
    >
      {loading ? (
        <Spinner size={20} className={colors.content} />
      ) : icon && iconPosition === 'start' ? (
        <View className="size-icon-slot items-center justify-center">
          <Icon icon={icon} size={iconSize} className={colors.content} />
        </View>
      ) : null}
      <Text
        className={`shrink text-center text-button font-montserrat-semibold ${colors.content}`}
      >
        {label}
      </Text>
      {!loading && icon && iconPosition === 'end' ? (
        <View className="size-icon-slot items-center justify-center">
          <Icon icon={icon} size={iconSize} className={colors.content} />
        </View>
      ) : null}
    </Pressable>
  );
}
