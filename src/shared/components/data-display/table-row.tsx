import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export type TableRowProps = {
  /** Nome do material (a API limita a 55 caracteres). */
  name: string;
  /** Código do material, ex.: "MAT-024". */
  code: string;
  /** Função executada ao tocar no item. */
  onPress?: () => void;
};

const FOCUS_RING = 'outline-solid outline-2 outline-offset-2 outline-focus-ring';

/**
 * Linha de tabela para materiais.
 * Exibe nome do material, código e ícone de ação.
 * Ajusta-se ao container pai.
 */
export function TableRow({ name, code, onPress }: TableRowProps) {
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${code}`}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`flex-1 flex-row items-center gap-[16px] rounded-xl border border-border-subtle bg-surface px-[16px] py-[16px] hover:bg-surface-hover active:bg-brand-soft ${focused ? FOCUS_RING : ''}`}
    >
      <View className="flex-1 flex-col items-start justify-start gap-[4px] overflow-hidden">
        <Text className="self-stretch font-montserrat-semibold text-lg leading-6 text-text-primary">
          {name}
        </Text>
        <View className="self-stretch flex-row items-start justify-start gap-[48px]">
          <Text className="font-montserrat-semibold text-sm leading-5 text-brand-primary">
            {code}
          </Text>
        </View>
      </View>
      <View className="size-12 flex items-center justify-center overflow-hidden">
        <View className="size-6 relative overflow-hidden">
          <View className="absolute left-[9px] top-[6px] h-3 w-1.5 border-2 border-brand-action" />
        </View>
      </View>
    </Pressable>
  );
}
