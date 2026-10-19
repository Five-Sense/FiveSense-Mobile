import { Image, Text, View } from 'react-native';

import { Button } from '@/shared/components/ui/button';

import type { OccurrenceImage } from '../../types/occurrence';
import { formatAttachmentSize } from '../../utils/occurrence-images';

type Props = { image: OccurrenceImage; index: number; disabled: boolean; onRemove: () => void };

export function OccurrenceImagePreview({ image, index, disabled, onRemove }: Props) {
  return (
    <View className="min-w-[240px] flex-1 gap-[8px] rounded-card border border-border-subtle bg-surface p-[12px]">
      <View className="h-[160px] w-full overflow-hidden rounded-control bg-surface-hover">
        <Image source={{ uri: image.uri }} accessibilityLabel={`Foto ${index + 1}: ${image.name}`} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
      </View>
      <Text numberOfLines={2} className="font-montserrat-semibold text-helper text-text-primary">{image.name}</Text>
      <Text className="font-montserrat text-helper text-text-secondary">{formatAttachmentSize(image.file?.size ?? image.size)}</Text>
      <Button variant="secondary" disabled={disabled} onPress={onRemove}>{`Remover foto ${index + 1}`}</Button>
    </View>
  );
}
