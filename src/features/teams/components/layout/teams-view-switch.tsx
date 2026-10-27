import { Calendar, Users } from 'lucide-react-native';
import { View } from 'react-native';

import { Button } from '@/shared/components/ui/button';

export type TeamsViewSwitchProps = {
  active: 'teams' | 'calendar';
  onOpenTeams: () => void;
  onOpenCalendar: () => void;
};

/** Par de botões "Equipes" / "Calendário"; o ativo usa o botão primário. */
export function TeamsViewSwitch({ active, onOpenTeams, onOpenCalendar }: TeamsViewSwitchProps) {
  return (
    <View className="flex-row gap-4">
      <View className="flex-1">
        <Button
          icon={Users}
          variant={active === 'teams' ? 'primary' : 'secondary'}
          onPress={active === 'teams' ? undefined : onOpenTeams}>
          Equipes
        </Button>
      </View>
      <View className="flex-1">
        <Button
          icon={Calendar}
          variant={active === 'calendar' ? 'primary' : 'secondary'}
          onPress={active === 'calendar' ? undefined : onOpenCalendar}>
          Calendário
        </Button>
      </View>
    </View>
  );
}
