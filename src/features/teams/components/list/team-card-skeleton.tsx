import { View } from 'react-native';

/** Skeleton com a estrutura do TeamCard (selo, nome e link). */
export function TeamCardSkeleton() {
  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      className="w-full gap-[16px] rounded-card border border-border-subtle bg-surface p-[24px]">
      <View className="gap-[12px]">
        <View className="flex-row items-center justify-between">
          <View className="size-[60px] rounded-control bg-surface-subtle" />
          <View className="h-[20px] w-[85px] rounded-full bg-surface-subtle" />
        </View>
        <View className="h-[26px] w-[60%] rounded-control bg-surface-subtle" />
      </View>
      <View className="h-[24px] w-[50%] rounded-control bg-surface-subtle" />
    </View>
  );
}
