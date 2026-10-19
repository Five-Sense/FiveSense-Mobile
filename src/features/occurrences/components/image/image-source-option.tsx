import type { LucideIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/shared/components/ui/icon';

type Props = { icon: LucideIcon; label: string; description: string; onPress: () => void };

export function ImageSourceOption({ icon, label, description, onPress }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      accessibilityRole="button" accessibilityLabel={label} accessibilityHint={description}
      onPress={onPress} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      className={`min-w-0 flex-1 items-center gap-[12px] rounded-card bg-surface p-[20px] hover:bg-surface-hover active:bg-surface-subtle ${focused ? 'outline-solid outline-2 outline-offset-2 outline-focus-ring' : ''}`}>
      <View pointerEvents="none" className="absolute inset-0 rounded-card border border-border-subtle" />
      <View className="size-[56px] items-center justify-center rounded-full bg-brand-action">
        <Icon icon={icon} size={28} className="text-on-brand" />
      </View>
      <Text className="font-montserrat-semibold text-card text-brand-action">{label}</Text>
      <Text className="w-full text-center font-montserrat text-helper text-brand-action">{description}</Text>
    </Pressable>
  );
}
