import { Camera, Images } from 'lucide-react-native';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ImageSourceOption } from './image-source-option';
import { useImageDialogDismiss } from '../../hooks/use-image-dialog-dismiss';

type Props = { visible: boolean; onClose: () => void; onChoose: (source: 'camera' | 'library') => void };

export function ImageSourceDialog({ visible, onClose, onChoose }: Props) {
  const insets = useSafeAreaInsets();

  useImageDialogDismiss(visible, onClose);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} supportedOrientations={['portrait', 'landscape']}>
      <View className="flex-1 items-center justify-end bg-overlay/40 px-[40px] pt-[40px]" style={{ paddingBottom: 40 + insets.bottom }}>
        <Pressable
          accessibilityRole="button" accessibilityLabel="Fechar seleção de imagem"
          onPress={onClose} className="absolute inset-0"
        />
        <View
          accessibilityViewIsModal role="dialog" aria-modal accessibilityLabel="Adicionar fotos"
          onAccessibilityEscape={onClose}
          className="max-h-full w-full overflow-hidden rounded-modal bg-page shadow-[0px_12px_32px_0px_rgba(17,17,17,0.16)]">
          <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
            <View className="gap-[20px] p-[24px]">
              <View className="items-center" accessible={false}>
                <View className="h-[4px] w-[48px] rounded-full bg-border-subtle" />
              </View>
              <View className="gap-[6px]">
                <Text accessibilityRole="header" className="font-montserrat-semibold text-section text-text-primary">Adicionar fotos</Text>
                <Text className="font-montserrat text-body text-text-secondary">Escolha de onde deseja obter as fotos da ocorrência.</Text>
              </View>
              <View className="flex-row gap-[16px] p-[4px]">
                <ImageSourceOption icon={Images} label="Galeria" description="Escolher fotos do dispositivo" onPress={() => onChoose('library')} />
                <ImageSourceOption icon={Camera} label="Câmera" description="Tirar uma foto agora" onPress={() => onChoose('camera')} />
              </View>
              <Text className="text-center font-montserrat text-helper text-text-secondary">JPG ou PNG · até 5 fotos · 5 MB cada · 20 MB no total</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
