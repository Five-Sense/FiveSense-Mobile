import type { LucideIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable } from 'react-native';

import { Icon } from '@/shared/components/data-display/icon';

type QuantityStepperButtonProps = {
  /** `decrease` usa o estilo suave (brand-soft); `increase` usa o estilo de acao (brand-action). */
  kind: 'decrease' | 'increase';
  icon: LucideIcon;
  accessibilityLabel: string;
  /** No limite o botao desabilita sem usar vermelho (docs/design-guidelines.md). */
  disabled: boolean;
  onPress: () => void;
};

const FOCUS_RING = 'outline-solid outline-2 outline-offset-2 outline-focus-ring';

// Classes completas e estaticas para o Tailwind detectar. Somente tokens de src/shared/global.css.
const KIND_CLASSES = {
  decrease: {
    container: 'bg-brand-soft hover:bg-surface-subtle active:bg-border-subtle',
    icon: 'text-brand-primary',
  },
  increase: {
    container: 'bg-brand-action hover:bg-brand-action-hover active:bg-brand-dark',
    icon: 'text-on-brand',
  },
} as const;

const DISABLED_CLASSES = { container: 'bg-disabled-bg', icon: 'text-disabled-text' } as const;

/** Botao 48x48 do QuantityStepper. */
export function QuantityStepperButton({
  kind,
  icon,
  accessibilityLabel,
  disabled,
  onPress,
}: QuantityStepperButtonProps) {
  const [focused, setFocused] = useState(false);
  const classes = disabled ? DISABLED_CLASSES : KIND_CLASSES[kind];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`size-control items-center justify-center rounded-control ${classes.container} ${focused ? FOCUS_RING : ''}`}
    >
      <Icon icon={icon} size={24} className={classes.icon} />
    </Pressable>
  );
}
