import { ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/components/data-display/icon';
import { TeamStatusBadge } from '@/features/teams/components/status/TeamStatusBadge';
import type { TeamStatus } from '@/features/teams/types/TeamStatus';
import { splitTeamCode } from '@/features/teams/utils/split-team-code';

export type TeamCardProps = {
  /** Nome da equipe. */
  name: string;
  /** Codigo no formato "AA-11": "AA" vai no quadro azul e "11" ao lado. A API pode nao ter codigo. */
  code?: string;
  /** `status` da API. DOING_5S pinta o card com brand-soft; NOT_DOING_5S usa a superficie branca. */
  status: TeamStatus;
  /** Toque em "Ver dados da equipe", normalmente abre os detalhes. */
  onViewDetails: () => void;
};

const FOCUS_RING = 'outline-solid outline-2 outline-offset-2 outline-focus-ring';

/** "Equipe Card" do Figma (node 228:7974): variante Default (sem fazer 5S) e Variant2 (fazendo 5S). */
export function TeamCard({ name, code, status, onViewDetails }: TeamCardProps) {
  const [focused, setFocused] = useState(false);
  const { prefix, number } = splitTeamCode(code ?? '');
  const background = status === 'DOING_5S' ? 'bg-brand-soft' : 'bg-surface';

  return (
    <View
      className={`w-full gap-[16px] rounded-card border border-border-subtle p-[24px] ${background}`}
    >
      <View className="gap-[12px]">
        <View className="flex-row items-center">
          {prefix ? (
            <View className="flex-row items-center gap-[8px]">
              <View className="size-[60px] items-center justify-center rounded-control bg-brand-primary">
                <Text className="font-montserrat-semibold text-section text-brand-soft">
                  {prefix}
                </Text>
              </View>
              {number ? (
                <Text className="font-montserrat-semibold text-section text-black">{number}</Text>
              ) : null}
            </View>
          ) : null}
          <TeamStatusBadge status={status} className="ml-auto min-w-[85px] self-start" />
        </View>
        <Text className="font-montserrat-semibold text-card text-text-primary">{name}</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ver dados da equipe, ${name}`}
        onPress={onViewDetails}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        hitSlop={12}
        className={`flex-row items-center gap-[24px] self-start ${focused ? FOCUS_RING : ''}`}
      >
        <Text className="font-montserrat-semibold text-button text-brand-action">
          Ver dados da equipe
        </Text>
        <Icon icon={ChevronRight} size={24} className="text-brand-action" />
      </Pressable>
    </View>
  );
}
