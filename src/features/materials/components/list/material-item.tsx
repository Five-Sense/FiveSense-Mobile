import { ChevronRight, TriangleAlert } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/shared/components/ui/icon';

export type MaterialItemProps = {
  name: string;
  code?: string;
  lowStock?: boolean;
  onPress: () => void;
};

const FOCUS_RING = 'outline-solid outline-2 outline-offset-2 outline-focus-ring';

export function MaterialItem({ name, code, lowStock = false, onPress }: MaterialItemProps) {
  const [focused, setFocused] = useState(false);

  const accessibilityLabel = [name, code, lowStock ? 'Estoque baixo' : null]
    .filter(Boolean)
    .join(', ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`min-h-control w-full flex-row items-center justify-between gap-[16px] rounded-card border border-border-subtle bg-surface p-[16px] hover:bg-surface-hover active:bg-brand-soft md:p-[24px] ${focused ? FOCUS_RING : ''}`}
    >
      <View className="shrink gap-[4px]">
        <Text className="font-montserrat-semibold text-card-title text-text-primary">{name}</Text>
        {code ? (
          <Text className="font-montserrat-semibold text-label text-brand-primary">{code}</Text>
        ) : null}
        {lowStock ? (
          <View className="flex-row items-center gap-[8px]">
            <Icon icon={TriangleAlert} size={20} className="text-warning-text" />
            <Text className="font-montserrat-semibold text-label text-warning-text">
              Estoque baixo
            </Text>
          </View>
        ) : null}
      </View>
      <Icon icon={ChevronRight} size={24} className="text-brand-action" />
    </Pressable>
  );
}
