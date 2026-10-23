import { X } from 'lucide-react-native';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/shared/components/ui/icon';

import { useImageDialogDismiss } from '../../hooks/use-image-dialog-dismiss';
import type { OccurrenceImage } from '../../types/occurrence';
import { attachmentBytes, formatAttachmentSize } from '../../utils/occurrence-images';
import { OccurrenceImagePreview } from './occurrence-image-preview';

type Props = { visible: boolean; images: OccurrenceImage[]; disabled: boolean; onClose: () => void; onRemove: (index: number) => void };

export function OccurrenceImageGallery({ visible, images, disabled, onClose, onRemove }: Props) {
  const insets = useSafeAreaInsets();
  useImageDialogDismiss(visible, onClose);

  function remove(index: number) {
    if (disabled) return;
    onRemove(index);
    if (images.length === 1) onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} supportedOrientations={['portrait', 'landscape']}>
      <View className="flex-1 items-center justify-center bg-overlay/40 px-[40px]" style={{ paddingTop: 40 + insets.top, paddingBottom: 40 + insets.bottom }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Fechar galeria de fotos" onPress={onClose} className="absolute inset-0" />
        <View accessibilityViewIsModal role="dialog" aria-modal accessibilityLabel="Imagens da ocorrência" onAccessibilityEscape={onClose}
          className="max-h-full w-full shrink overflow-hidden rounded-modal bg-page shadow-[0px_12px_32px_0px_rgba(17,17,17,0.16)]">
          <View className="flex-row items-start justify-between gap-[16px] p-[24px]">
            <View className="min-w-0 flex-1 gap-[8px]">
              <Text accessibilityRole="header" className="font-montserrat-semibold text-section text-text-primary">Imagens da ocorrência</Text>
              <Text accessibilityLiveRegion="polite" className="font-montserrat text-helper text-text-secondary">
                {images.length} {images.length === 1 ? 'foto anexada' : 'fotos anexadas'} · {formatAttachmentSize(attachmentBytes(images))} de 20 MB
              </Text>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="Fechar imagens" onPress={onClose}
              className="size-control items-center justify-center rounded-control hover:bg-surface-hover active:bg-surface-subtle focus:outline-2 focus:outline-offset-2 focus:outline-focus-ring">
              <Icon icon={X} size={24} className="text-text-secondary" />
            </Pressable>
          </View>
          <ScrollView className="shrink" contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24, gap: 12 }} keyboardShouldPersistTaps="handled">
            {Array.from({ length: Math.ceil(images.length / 2) }, (_, row) => (
              <View key={row} className="flex-row gap-[12px]">
                {images.slice(row * 2, row * 2 + 2).map((image, column) => {
                  const index = row * 2 + column;
                  return <OccurrenceImagePreview key={`${image.uri}-${index}`} image={image} index={index} disabled={disabled} onRemove={() => remove(index)} />;
                })}
                {row * 2 + 1 >= images.length ? <View className="flex-1" /> : null}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
