import type { LucideIcon } from 'lucide-react-native';
import { styled } from 'nativewind';

type IconGlyphProps = {
  icon: LucideIcon;
  size?: number;
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
