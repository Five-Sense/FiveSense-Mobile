import { Image, Pressable, Text, View } from 'react-native';

import type { OccurrenceImage } from '../../types/occurrence';

type Props = { images: OccurrenceImage[]; disabled: boolean; onOpen: () => void };

export function ImageThumbnailMosaic({ images, disabled, onOpen }: Props) {
  const visible = images.slice(0, 4);
  const columns = images.length === 1 ? 1 : 2;
  const extra = images.length - visible.length;

  return (
    <View className="size-[200px] overflow-hidden rounded-modal">
      {Array.from({ length: Math.ceil(visible.length / columns) }, (_, row) => (
        <View key={row} className="flex-1 flex-row">
          {visible.slice(row * columns, row * columns + columns).map((image, column) => {
            const index = row * columns + column;
            const showExtra = index === 3 && extra > 0;
            return (
              <Pressable key={`${image.uri}-${index}`} disabled={disabled} onPress={onOpen}
                accessibilityRole="button" accessibilityLabel={showExtra ? `Ver todas as ${images.length} fotos. Mais ${extra} fotos` : `Ver foto ${index + 1} de ${images.length}`}
                accessibilityState={{ disabled }} aria-disabled={disabled}
                className="relative flex-1 overflow-hidden bg-surface-hover focus:outline-2 focus:outline-offset-[-2px] focus:outline-focus-ring">
                <Image source={{ uri: image.uri }} resizeMode="cover" accessible={false} style={{ width: '100%', height: '100%' }} />
                {showExtra ? (
                  <View pointerEvents="none" className="absolute inset-0 items-center justify-center bg-overlay/40">
                    <Text className="font-montserrat-semibold text-page-heading text-on-brand">{`+${extra}`}</Text>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
