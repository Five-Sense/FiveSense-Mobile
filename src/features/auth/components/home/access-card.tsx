import type { LucideIcon } from 'lucide-react-native';
import { ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/shared/components/ui/icon';

export type AccessCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Texto da ação, ex.: "Registrar ocorrência". */
  actionLabel: string;
  onPress: () => void;
};

const FOCUS_RING = 'outline-solid outline-2 outline-offset-2 outline-focus-ring';

/** Card de acesso aos módulos (Figma Access `31:2461`). O card inteiro é o alvo de toque. */
export function AccessCard({ icon, title, description, actionLabel, onPress }: AccessCardProps) {
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${description} ${actionLabel}`}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`flex-1 gap-[16px] rounded-card border border-border-subtle bg-surface p-[16px] hover:bg-surface-hover active:bg-brand-soft md:p-[24px] ${
        focused ? FOCUS_RING : ''
      }`}>
      <View className="size-icon-slot items-start justify-center">
        <Icon icon={icon} size={24} className="text-text-primary" />
      </View>

      <View className="gap-[8px]">
        <Text className="font-montserrat-semibold text-card text-text-primary">{title}</Text>
        <Text className="font-montserrat text-helper text-text-secondary">{description}</Text>
      </View>

      <View className="mt-auto flex-row items-center gap-[16px] pt-[8px]">
        <Text className="shrink font-montserrat-semibold text-label text-brand-action">
          {actionLabel}
        </Text>
        <Icon icon={ChevronRight} size={24} className="text-brand-action" />
      </View>
    </Pressable>
  );
}