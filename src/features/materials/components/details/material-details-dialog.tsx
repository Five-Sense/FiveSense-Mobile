import { useEffect } from 'react';
import { Modal, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Material } from '../../types/material';
import { MaterialDetailsCard } from './material-details-card';

type Props = { material: Material | null; onClose: () => void };

/** Pop-up de consulta (Figma "Detalhes do material"): overlay, fechar pelo X, fundo, Escape ou voltar. */
export function MaterialDetailsDialog({ material, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const visible = material !== null;

  useEffect(() => {
    if (!visible || Platform.OS !== 'web') return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      onClose();
    };
    document.addEventListener('keydown', dismiss, true);
    return () => document.removeEventListener('keydown', dismiss, true);
  }, [visible, onClose]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} supportedOrientations={['portrait', 'landscape']}>
      <View
        className="flex-1 items-center justify-center bg-overlay/40 px-[24px]"
        style={{ paddingTop: 24 + insets.top, paddingBottom: 24 + insets.bottom }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Fechar detalhes do material" onPress={onClose} className="absolute inset-0" />
        {material ? (
          <View
            accessibilityViewIsModal
            role="dialog"
            aria-modal
            accessibilityLabel="Detalhes do material"
            onAccessibilityEscape={onClose}
            className="max-h-full w-full max-w-[640px]">
            <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
              <MaterialDetailsCard name={material.name} stockQuantity={material.stockQuantity} onClose={onClose} />
            </ScrollView>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}
