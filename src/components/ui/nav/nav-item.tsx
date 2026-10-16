import type { LucideIcon } from 'lucide-react-native';
import { styled } from 'nativewind';
import { useState } from 'react';
import { Platform, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';

export type NavItemProps = {
  label: string;
  icon: LucideIcon;
  onPress: () => void;
  selected?: boolean;
  disabled?: boolean;
  accessibilityHint?: string;
};

function IconGlyph({ icon: Icon, color, style }: { icon: LucideIcon; color?: string; style?: StyleProp<ViewStyle> }) {
  // Web inherits currentColor from the wrapper; native receives the resolved color prop.
  return <View style={style}><Icon size={24} strokeWidth={2} color={color} /></View>;
}

const StyledIconGlyph = styled(IconGlyph, {
  className: { target: 'style', nativeStyleMapping: { color: 'color' } },
});

/** Selected is controlled by the screen; pressing does not change it implicitly. */
export function NavItem({
  label,
  icon,
  onPress,
  selected = false,
  disabled = false,
  accessibilityHint,
}: NavItemProps) {
  const [focused, setFocused] = useState(false);
  const contentClassName = disabled
    ? 'text-disabled-text'
    : selected
      ? 'text-brand-primary'
      : 'text-text-secondary';
  const backgroundClassName = disabled
    ? 'bg-surface'
    : selected
      ? 'bg-brand-soft'
      : 'bg-surface hover:bg-surface-hover active:bg-brand-soft';

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
      className={`w-full min-h-nav-item flex-row items-center gap-3 rounded-control px-4 py-3 ${backgroundClassName} ${
        focused && !disabled ? 'outline-solid outline-2 outline-offset-2 outline-focus-ring' : ''
      }`}>
      <View
        accessible={false}
        importantForAccessibility="no-hide-descendants"
        className="size-icon-slot shrink-0 items-center justify-center">
        <StyledIconGlyph icon={icon} className={contentClassName} />
      </View>
      <Text className={`min-w-0 flex-1 font-montserrat-semibold text-nav ${contentClassName}`}>
        {label}
      </Text>
    </Pressable>
  );
}
