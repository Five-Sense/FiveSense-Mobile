import { Text, View } from 'react-native';

import { TEAM_STATUS_LABEL } from '../../constants/team-status';
import type { TeamStatus } from '../../types/team-status';

export type TeamStatusBadgeProps = {
  status: TeamStatus;
};

// Fazendo 5S: sucesso. Não fazendo 5S: neutro (inatividade não é erro). Só tokens de src/global.css.
const STATUS_CLASSES: Record<TeamStatus, { container: string; text: string }> = {
  DOING_5S: {
    container: 'border-success-border bg-success-bg',
    text: 'text-success-text',
  },
  NOT_DOING_5S: {
    container: 'border-neutral-border bg-neutral-bg',
    text: 'text-neutral-text',
  },
};

/** Badge do status de 5S da equipe. O estado é dado pelo texto, não só pela cor. */
export function TeamStatusBadge({ status }: TeamStatusBadgeProps) {
  const classes = STATUS_CLASSES[status];
  const label = TEAM_STATUS_LABEL[status];

  return (
    <View
      accessible
      accessibilityLabel={`Status de 5S: ${label}`}
      className={`min-h-[28px] flex-row items-center justify-center self-start rounded-full border px-[10px] ${classes.container}`}
    >
      <Text className={`font-montserrat-semibold text-label ${classes.text}`}>{label}</Text>
    </View>
  );
}
