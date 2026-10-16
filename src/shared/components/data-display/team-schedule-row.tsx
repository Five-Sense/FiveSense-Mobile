import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export type ScheduleStatus = 'future' | 'past' | 'current';

export type TeamScheduleRowProps = {
  /** Horário da agenda, ex.: "07:30". */
  time: string;
  /** Nome da equipe ou "Nenhuma Equipe". */
  teamName: string;
  /** Status do horário: future (branco), past (cinza), current (brand-soft). */
  status: ScheduleStatus;
  /** Função executada ao tocar no item. */
  onPress?: () => void;
};

const FOCUS_RING = 'outline-solid outline-2 outline-offset-2 outline-focus-ring';

/**
 * Linha de tabela para agenda de equipes em 5S.
 * Três estados de visualização:
 * - future: branco, texto primário (próximo)
 * - past: cinza, texto muted (já passou)
 * - current: fundo brand-soft, texto brand-primary (acontecendo)
 */
export function TeamScheduleRow({ time, teamName, status, onPress }: TeamScheduleRowProps) {
  const [focused, setFocused] = useState(false);

  // Determina cores baseado no status
  const getBackgroundColor = () => {
    switch (status) {
      case 'current':
        return 'bg-brand-soft';
      default:
        return 'bg-surface';
    }
  };

  const getTimeTextColor = () => {
    switch (status) {
      case 'past':
        return 'text-text-muted';
      case 'current':
        return 'text-brand-primary';
      default:
        return 'text-text-primary';
    }
  };

  const getTeamTextColor = () => {
    switch (status) {
      case 'past':
        return 'text-text-muted';
      case 'current':
        return 'text-brand-primary';
      default:
        return 'text-text-primary';
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${time}, ${teamName}`}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`flex-row items-center justify-start gap-[32px] border-b border-border-subtle px-[16px] py-[12px] ${getBackgroundColor()} ${focused ? FOCUS_RING : ''}`}
    >
      <View className="min-w-14 justify-center text-center">
        <Text className={`font-montserrat-semibold text-lg leading-6 ${getTimeTextColor()}`}>
          {time}
        </Text>
      </View>
      <Text className={`font-montserrat-semibold text-lg leading-6 ${getTeamTextColor()}`}>
        {teamName}
      </Text>
    </Pressable>
  );
}
