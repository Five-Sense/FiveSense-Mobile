import type { LucideIcon } from 'lucide-react-native';
import { styled } from 'nativewind';
<<<<<<< HEAD
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';
=======
>>>>>>> origin/develop

type IconGlyphProps = {
  icon: LucideIcon;
  size?: number;
<<<<<<< HEAD
  /** Nativo: preenchido pelo NativeWind a partir de `className="text-..."`. */
  color?: string;
  /** Mantem o traco em 2 px mesmo quando `size` nao e 24 (ex.: icone de 20 px do Figma). */
  absoluteStrokeWidth?: boolean;
  /** Web: estilo gerado por `className="text-..."`; a cor chega ao SVG por heranca (currentColor). */
  style?: StyleProp<ViewStyle>;
};

function IconGlyph({
  icon: Glyph,
  size = 24,
  color,
  absoluteStrokeWidth = false,
  style,
}: IconGlyphProps) {
  const glyph = (
    <Glyph size={size} color={color} strokeWidth={2} absoluteStrokeWidth={absoluteStrokeWidth} />
  );
  return style ? <View style={style}>{glyph}</View> : glyph;
}

// No nativo, `color` do estilo vira a prop `color` do SVG. No web essa prop nao existe: o `className`
// vai para um wrapper e o SVG herda a cor (sem isso o icone sai preto).
const ICON_MAPPING =
  Platform.OS === 'web'
    ? { className: 'style' as const }
    : { className: { target: false as const, nativeStyleMapping: { color: 'color' as const } } };

/**
 * Icone Lucide colorido por token: `<Icon icon={Check} className="text-brand-primary" />`.
 * Converte a cor da classe em cor do SVG, sem hex no codigo.
 */
export const Icon = styled(IconGlyph, ICON_MAPPING);
=======
  /** Preenchido pelo NativeWind a partir de `className="text-..."`. */
  color?: string;
};

function IconGlyph({ icon: Icon, size = 24, color }: IconGlyphProps) {
  return <Icon size={size} color={color} strokeWidth={2} />;
}

/**
 * Icone Lucide colorido por token: `<Icon icon={Check} className="text-brand-primary" />`.
 * Converte a cor da classe na prop `color` do SVG, sem hex no codigo.
 */
export const Icon = styled(IconGlyph, {
  className: { target: false, nativeStyleMapping: { color: 'color' } },
});
>>>>>>> origin/develop
