import { Text, View } from 'react-native';

import type { TeamStatus } from '@/features/teams/types/TeamStatus';

type StatusBadgeStyle = {
  label: string;
  /** Cor do texto (classe NativeWind com token). */
  text: string;
};

// Textos e cores do componente "Badge 5S" do Figma (node 208:4707), variantes Fazendo e Nao Sendo Feito.
const STATUS_BADGE: Record<TeamStatus, StatusBadgeStyle> = {
  DOING_5S: { label: 'Fazendo 5S', text: 'text-brand-action' },
  NOT_DOING_5S: { label: 'Sem fazer 5s', text: 'text-error-text' },
};

export type TeamStatusBadgeProps = {
  status: TeamStatus;
  /** Ajustes de posicao/largura minima feitos pelo card que usa a badge. */
  className?: string;
};

/**
 * Badge de status de 5S da equipe. Fiel ao Figma: pilula branca, borda border-subtle,
 * padding horizontal 10, texto Montserrat SemiBold 10/20. A borda e um overlay para nao
 * somar ao layout (a altura do Figma e exatamente 20).
 */
export function TeamStatusBadge({ status, className }: TeamStatusBadgeProps) {
  const { label, text } = STATUS_BADGE[status];

  return (
    <View
      className={`justify-center overflow-hidden rounded-[999px] bg-surface px-[10px] ${className ?? ''}`}
    >
      <Text className={`font-montserrat-semibold text-[10px] leading-[20px] ${text}`}>{label}</Text>
      <View
        pointerEvents="none"
        className="absolute inset-0 rounded-[999px] border border-border-subtle"
      />
    </View>
  );
}
