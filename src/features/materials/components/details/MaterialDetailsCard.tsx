import { X } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/components/data-display/icon';

export type MaterialDetailsCardProps = {
  code: string;
  name: string;
  stockQuantity: number;
  onClose: () => void;
};

const FOCUS_RING = 'outline-solid outline-2 outline-offset-2 outline-focus-ring';

/** "Material-Especifico - Card" do Figma (node 208:7927). Conteudo de pop-up; o Modal vem de fora. */
export function MaterialDetailsCard({
  code,
  name,
  stockQuantity,
  onClose,
}: MaterialDetailsCardProps) {
  const [closeFocused, setCloseFocused] = useState(false);

  const fields = [
    { label: 'Código', value: code },
    { label: 'Nome', value: name },
  ];

  return (
    <View className="w-full gap-[24px] rounded-modal bg-surface p-[32px] shadow-[0px_12px_32px_0px_rgba(17,17,17,0.16)]">
      <View className="flex-row items-start justify-between">
        <View className="min-w-0 flex-1 gap-[8px]">
          <Text className="font-montserrat-semibold text-section text-text-primary">
            Detalhes do material
          </Text>
          <Text className="font-montserrat text-body text-text-secondary">
            Informações cadastradas e situação atual do estoque.
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Fechar"
          onPress={onClose}
          onFocus={() => setCloseFocused(true)}
          onBlur={() => setCloseFocused(false)}
          hitSlop={12}
          className={`rounded-control ${closeFocused ? FOCUS_RING : ''}`}
        >
          <Icon icon={X} size={24} className="text-text-secondary" />
        </Pressable>
      </View>

      <View className="gap-[12px]">
        {fields.map(({ label, value }) => (
          <View key={label} className="gap-[8px]">
            <Text className="font-montserrat-semibold text-label text-text-secondary">{label}</Text>
            <Text className="font-montserrat text-body text-text-primary">{value}</Text>
          </View>
        ))}

        {/* Borda em overlay: no Figma ela nao soma ao layout (indicador de 88 de altura). */}
        <View className="gap-[4px] overflow-hidden rounded-control bg-surface p-[16px]">
          <Text className="font-montserrat text-helper text-text-secondary">
            Quantidade em estoque
          </Text>
          <Text className="font-montserrat-semibold text-section text-brand-primary">
            {stockQuantity} {stockQuantity === 1 ? 'unidade' : 'unidades'}
          </Text>
          <View
            pointerEvents="none"
            className="absolute inset-0 rounded-control border border-border-subtle"
          />
        </View>
      </View>
    </View>
  );
}
