import { UserRound } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Icon } from '@/shared/components/ui/icon';

export type RepresentativeCardProps = {
  name: string;
  className?: string;
};

export function RepresentativeCard({ name, className }: RepresentativeCardProps) {
  return (
    <View
      className={`flex-row items-center gap-[12px] overflow-hidden rounded-control bg-surface-hover px-[16px] py-[8px] ${className ?? ''}`}
    >
      <View className="size-[40px] items-center justify-center rounded-[999px] bg-brand-soft">
        <Icon icon={UserRound} size={20} absoluteStrokeWidth className="text-brand-primary" />
      </View>
      <Text className="flex-1 font-montserrat-semibold text-label text-text-primary">{name}</Text>
      <View
        pointerEvents="none"
        className="absolute inset-0 rounded-control border border-border-subtle"
      />
    </View>
  );
}
