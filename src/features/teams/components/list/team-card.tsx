import { ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { TeamStatusBadge } from '@/features/teams/components/status/TeamStatusBadge';
import type { TeamStatus } from '@/features/teams/types/TeamStatus';
import { splitTeamCode } from '@/features/teams/utils/split-team-code';
import { Icon } from '@/shared/components/ui/icon';

export type TeamCardProps = {
  name: string;
  code?: string;
  status: TeamStatus;
  /** Abre os detalhes (link "Ver dados da equipe"). */
  onViewDetails: () => void;
  /** Alterna Fazendo 5S <-> Não fazendo 5S ao tocar no card. */
  onToggleStatus: () => void;
  /** Enquanto a API processa a alteração: bloqueia novos toques e atenua o card. */
  statusPending?: boolean;
};

const FOCUS_RING = 'outline-solid outline-2 outline-offset-2 outline-focus-ring';

/**
 * "Equipe Card" do Figma (node 228:7974): variante Default (sem fazer 5S) e Variant2 (fazendo 5S).
 * O card inteiro é um interruptor de status; só o link de detalhes tem ação própria. Para não aninhar
 * botões, o interruptor é uma camada absoluta atrás do conteúdo, e o conteúdo informativo deixa o toque passar.
 */
export function TeamCard({
  name,
  code,
  status,
  onViewDetails,
  onToggleStatus,
  statusPending = false,
}: TeamCardProps) {
  const [toggleFocused, setToggleFocused] = useState(false);
  const [linkFocused, setLinkFocused] = useState(false);
  const { prefix, number } = splitTeamCode(code ?? '');
  const doing = status === 'DOING_5S';
  const background = doing ? 'bg-brand-soft' : 'bg-surface';

  return (
    <View
      className={`relative w-full rounded-card border border-border-subtle ${background} ${
        statusPending ? 'opacity-60' : ''
      }`}
    >
      <Pressable
        accessibilityRole="switch"
        accessibilityLabel={`Equipe ${[code, name].filter(Boolean).join(' ')}, fazendo 5S`}
        accessibilityHint="Toque para alternar entre fazendo e não fazendo 5S"
        accessibilityState={{ checked: doing, busy: statusPending, disabled: statusPending }}
        aria-checked={doing}
        disabled={statusPending}
        onPress={onToggleStatus}
        onFocus={() => setToggleFocused(true)}
        onBlur={() => setToggleFocused(false)}
        className={`absolute inset-0 rounded-card ${toggleFocused ? FOCUS_RING : ''}`}
      />

      <View pointerEvents="box-none" className="gap-[16px] p-[24px]">
        <View
          pointerEvents="none"
          importantForAccessibility="no-hide-descendants"
          accessibilityElementsHidden
          className="gap-[12px]"
        >
          <View className="flex-row items-center">
            {prefix ? (
              <View className="flex-row items-center gap-[8px]">
                {/* Altura e largura mínima do Figma (60); códigos mais longos crescem. */}
                <View className="h-[60px] min-w-[60px] items-center justify-center rounded-control bg-brand-primary px-[12px]">
                  <Text className="font-montserrat-semibold text-section text-brand-soft">
                    {prefix}
                  </Text>
                </View>
                {number ? (
                  <Text className="font-montserrat-semibold text-section text-black">
                    {number}
                  </Text>
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
          onFocus={() => setLinkFocused(true)}
          onBlur={() => setLinkFocused(false)}
          hitSlop={12}
          className={`flex-row items-center gap-[24px] self-start ${linkFocused ? FOCUS_RING : ''}`}
        >
          <Text className="font-montserrat-semibold text-button text-brand-action">
            Ver dados da equipe
          </Text>
          <Icon icon={ChevronRight} size={24} className="text-brand-action" />
        </Pressable>
      </View>
    </View>
  );
}
