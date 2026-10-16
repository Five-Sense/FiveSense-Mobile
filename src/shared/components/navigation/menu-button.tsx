import type { LucideIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

import { Icon } from '@/shared/components/ui/icon';

export type MenuButtonProps = {
  label: string;
  icon: LucideIcon;
  onPress: () => void;
  selected?: boolean;
  disabled?: boolean;
  accessibilityHint?: string;
};

/** Menu - Button do Figma. A seleção é controlada pela tela que o utiliza. */
export function MenuButton({
  label,
  icon,
  onPress,
  selected = false,
  disabled = false,
  accessibilityHint,
}: MenuButtonProps) {
  const [focused, setFocused] = useState(false);
  const contentClassName = disabled
    ? 'text-disabled-text'
    : selected
      ? 'text-brand-primary'
      : 'text-text-secondary';

  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ selected, disabled }}
      {...(Platform.OS === 'web' ? { 'aria-current': selected ? ('page' as const) : undefined } : {})}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`min-h-control min-w-control max-w-full items-center gap-1 p-2 ${
        disabled ? '' : 'hover:bg-surface-hover active:bg-surface-subtle'
      } ${focused && !disabled ? 'outline-solid outline-2 outline-offset-2 outline-focus-ring' : ''}`}>
      <View
        accessible={false}
        importantForAccessibility="no-hide-descendants"
        className={`size-icon-slot shrink-0 items-center justify-center ${Platform.OS === 'web' ? contentClassName : ''}`}>
        <Icon icon={icon} size={32} className={contentClassName} />
      </View>
      <Text className={`max-w-full text-center font-montserrat text-helper ${contentClassName}`}>
        {label}
      </Text>
    </Pressable>
  );
}
