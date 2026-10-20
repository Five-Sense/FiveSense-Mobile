import { useState } from 'react';
import { TextInput, View } from 'react-native';

export type TeamSearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
};

/**
 * "Controle" do Figma `186:3367`. O `Input` global sempre renderiza o próprio rótulo
 * ("(Opcional)"), enquanto aqui o rótulo "Buscar equipe" fica na linha das abas; por isso o campo é local.
 */
export function TeamSearchField({ value, onChangeText }: TeamSearchFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="relative min-h-control w-full justify-center rounded-control bg-surface">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Nome ou código da equipe"
        accessibilityLabel="Buscar equipe"
        returnKeyType="search"
        autoCorrect={false}
        className="min-h-control rounded-control px-4 py-3 font-montserrat text-body text-text-primary placeholder:text-text-muted web:outline-none"
      />
      {/* Overlay: a borda engrossa no foco sem mexer no tamanho. */}
      <View
        pointerEvents="none"
        className={`absolute inset-0 rounded-control ${
          focused ? 'border-2 border-focus-ring' : 'border border-border-control'
        }`}
      />
    </View>
  );
}
