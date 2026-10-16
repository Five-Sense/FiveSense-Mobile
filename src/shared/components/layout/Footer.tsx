import { Text, View } from 'react-native';

const DEFAULT_COPYRIGHT_TEXT = '© 2026 Five Sense Group. Todos os direitos reservados.';

export type FooterProps = {
  /** Texto institucional exibido no rodapé. */
  text?: string;
};

/**
 * Rodapé institucional do aplicativo para tablet.
 *
 * A largura acompanha o contêiner pai e a altura cresce se o texto for
 * ampliado ou precisar quebrar de linha.
 */
export default function Footer({ text = DEFAULT_COPYRIGHT_TEXT }: FooterProps) {
  return (
    <View className="min-h-[32px] w-full flex-row items-center border-t border-border-subtle bg-surface px-[8px] py-[8px]">
      <Text className="shrink font-montserrat text-[12px] leading-[15px] text-text-primary">
        {text}
      </Text>
    </View>
  );
}
