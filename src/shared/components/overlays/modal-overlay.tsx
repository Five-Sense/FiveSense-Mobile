import type { ReactNode } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';

export type ModalOverlayProps = {
  visible: boolean;
  onClose: () => void;
  /** Rótulo lido por leitores de tela para o diálogo. */
  accessibilityLabel: string;
  children: ReactNode;
};

/**
 * Overlay de pop-up do Figma: fundo #111 a 48%, conteúdo centralizado com largura máxima de 680 e margem
 * lateral. Fecha ao tocar fora, e pelo botão voltar no Android / Esc no web (`onRequestClose`).
 */
export function ModalOverlay({ visible, onClose, accessibilityLabel, children }: ModalOverlayProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityViewIsModal>
      <View className="flex-1 bg-text-primary/[0.48]" accessibilityLabel={accessibilityLabel}>
        <ScrollView
          contentContainerClassName="min-h-full"
          keyboardShouldPersistTaps="handled">
          {/* A área fora do cartão é o "fundo": tocar nela fecha. O cartão absorve o toque (não propaga). */}
          {/* Não é um botão acessível (evitaria <button> aninhado); o fechamento acessível é o X do cartão e Esc/voltar. */}
          <Pressable
            accessible={false}
            onPress={onClose}
            className="min-h-full flex-1 cursor-auto items-center justify-center p-4 md:p-[77px]">
            <Pressable
              accessible={false}
              onPress={() => {}}
              className="w-full max-w-[680px] cursor-auto">
              {children}
            </Pressable>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
}
