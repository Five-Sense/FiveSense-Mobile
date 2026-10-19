import { ImagePlus, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/shared/components/ui/icon';

import { MAX_OCCURRENCE_IMAGES, type OccurrenceImage } from '../../types/occurrence';
import { ImageThumbnailMosaic } from './image-thumbnail-mosaic';
import { OccurrenceImageGallery } from './occurrence-image-gallery';

type Props = { images: OccurrenceImage[]; disabled: boolean; error?: string; onChoose: () => void; onRemove: (index: number) => void };

export function OccurrenceImageField({ images, disabled, error, onChoose, onRemove }: Props) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const addingDisabled = disabled || images.length >= MAX_OCCURRENCE_IMAGES;

  return (
    <View className="gap-[8px]">
      <View className="flex-row flex-wrap items-start justify-between gap-[4px]">
        <Text className="font-montserrat-semibold text-label text-text-primary">Imagem</Text>
        <Text className="font-montserrat text-helper text-text-secondary">Até 5 fotos · 5 MB cada · 20 MB no total</Text>
      </View>
      {images.length ? (
        <View className="h-[303px] flex-row items-center justify-center gap-[8px] rounded-control border border-dashed border-border-control bg-surface p-[16px]">
          <ImageThumbnailMosaic images={images} disabled={disabled} onOpen={() => setGalleryOpen(true)} />
          <Pressable accessibilityRole="button" accessibilityLabel="Adicionar mais fotos" accessibilityHint="Até 5 fotos. Remova uma foto na galeria para liberar espaço." onPress={onChoose}
            disabled={addingDisabled} accessibilityState={{ disabled: addingDisabled }} aria-disabled={addingDisabled}
            className="size-control items-center justify-center rounded-control focus:outline-2 focus:outline-offset-2 focus:outline-focus-ring">
            <View className="size-[32px] items-center justify-center rounded-control bg-brand-soft">
              <Icon icon={Plus} size={28} className={addingDisabled ? 'text-disabled-text' : 'text-brand-primary'} />
            </View>
          </Pressable>
        </View>
      ) : (
        <Pressable
          accessibilityRole="button" accessibilityLabel="Adicionar fotos" accessibilityHint="Selecione uma ou mais fotos da galeria ou use a câmera. Opcional, até 5 fotos, 5 MB cada e 20 MB no total."
          disabled={addingDisabled} accessibilityState={{ disabled: addingDisabled }} aria-disabled={addingDisabled} onPress={onChoose}
          className="h-[303px] flex-row flex-wrap content-center items-center justify-center gap-[16px] rounded-control border border-dashed border-border-control bg-surface p-[16px] hover:bg-surface-hover focus:outline-2 focus:outline-offset-2 focus:outline-focus-ring">
          <View className="size-[56px] items-center justify-center rounded-control bg-brand-soft"><Icon icon={ImagePlus} size={28} className="text-brand-primary" /></View>
          <View className="max-w-full shrink gap-[2px]">
            <Text className="font-montserrat-semibold text-card text-text-primary">Adicionar fotos</Text>
            <Text className="font-montserrat text-helper text-text-secondary">Escolha fotos da galeria ou use a câmera</Text>
          </View>
        </Pressable>
      )}
      {error ? <Text accessibilityRole="alert" className="font-montserrat text-helper text-error-text">{error}</Text> : null}
      <OccurrenceImageGallery visible={galleryOpen && images.length > 0} images={images} disabled={disabled} onClose={() => setGalleryOpen(false)} onRemove={onRemove} />
    </View>
  );
}
