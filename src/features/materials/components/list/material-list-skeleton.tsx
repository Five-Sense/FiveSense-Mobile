import { View } from 'react-native';

const ROWS = 6;

/** Skeleton estático (sem animação contínua) com a estrutura do MaterialItem. */
export function MaterialListSkeleton() {
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Carregando materiais"
      accessibilityState={{ busy: true }}
      aria-busy
      className="gap-[12px]">
      {Array.from({ length: ROWS }, (_, index) => (
        <View
          key={index}
          className="min-h-control w-full flex-row items-center justify-between gap-[16px] rounded-card border border-border-subtle bg-surface p-[16px] md:p-[24px]">
          <View className="flex-1 gap-[8px]">
            <View className="h-[18px] w-3/5 rounded-control bg-surface-subtle" />
          </View>
          <View className="size-[24px] rounded-full bg-surface-subtle" />
        </View>
      ))}
    </View>
  );
}
