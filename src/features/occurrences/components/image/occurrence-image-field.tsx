import { ImagePlus } from 'lucide-react-native';
import { Image, Pressable, Text, View } from 'react-native';

import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';

import type { OccurrenceImage } from '../../types/occurrence';

type Props = { image: OccurrenceImage | null; disabled: boolean; error?: string; onChoose: () => void; onRemove: () => void };

export function OccurrenceImageField({ image, disabled, error, onChoose, onRemove }: Props) {
  return (
    <View className="gap-[8px]">
      <View className="flex-row flex-wrap items-start justify-between gap-[4px]">
        <Text className="font-montserrat-semibold text-label text-text-primary">Imagem</Text>
        <Text className="font-montserrat text-helper text-text-secondary">Opcional · máximo 5 MB</Text>
      </View>
      {image ? (
        <View className="gap-[12px]">
          <View className="h-[303px] w-full overflow-hidden rounded-control border border-border-control bg-surface">
            <Image source={{ uri: image.uri }} accessibilityLabel="Prévia da imagem da ocorrência" resizeMode="contain" style={{ width: '100%', height: '100%' }} />
          </View>
          <Text numberOfLines={2} className="font-montserrat text-helper text-text-secondary">{image.name}</Text>
          <View className="flex-row flex-wrap gap-[12px]">
            <View className="min-w-[120px] flex-1"><Button variant="secondary" disabled={disabled} onPress={onChoose}>Substituir</Button></View>
            <View className="min-w-[120px] flex-1"><Button variant="secondary" disabled={disabled} onPress={onRemove}>Remover</Button></View>
          </View>
        </View>
      ) : (
        <Pressable
          accessibilityRole="button" accessibilityLabel="Adicionar uma imagem" accessibilityHint="Escolha uma foto da galeria ou use a câmera. Opcional, máximo 5 MB."
          disabled={disabled} accessibilityState={{ disabled }} aria-disabled={disabled} onPress={onChoose}
          className="h-[303px] flex-row flex-wrap content-center items-center justify-center gap-[16px] rounded-control border border-dashed border-border-control bg-surface p-[16px] hover:bg-surface-hover focus:outline-2 focus:outline-offset-2 focus:outline-focus-ring">
          <View className="size-[56px] items-center justify-center rounded-control bg-brand-soft"><Icon icon={ImagePlus} size={28} className="text-brand-primary" /></View>
          <View className="max-w-full shrink gap-[2px]">
            <Text className="font-montserrat-semibold text-card text-text-primary">Adicionar uma imagem</Text>
            <Text className="font-montserrat text-helper text-text-secondary">Escolha uma foto da galeria ou use a câmera</Text>
          </View>
        </Pressable>
      )}
      {error ? <Text accessibilityRole="alert" className="font-montserrat text-helper text-error-text">{error}</Text> : null}
    </View>
  );
}
