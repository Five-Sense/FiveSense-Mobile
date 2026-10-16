import { X } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/shared/components/ui/icon';
import { RepresentativeCard } from '@/features/teams/components/details/representative-card';
import { TeamStatusBadge } from '@/features/teams/components/status/TeamStatusBadge';
import type { TeamStatus } from '@/features/teams/types/TeamStatus';

export type TeamDetailsCardProps = {
  name: string;
  code?: string;
  schedule?: string;
  status: TeamStatus;
  representatives?: string[];
  onClose: () => void;
};

const FOCUS_RING = 'outline-solid outline-2 outline-offset-2 outline-focus-ring';

export function TeamDetailsCard({
  name,
  code,
  schedule,
  status,
  representatives,
  onClose,
}: TeamDetailsCardProps) {
  const [closeFocused, setCloseFocused] = useState(false);

  const details = [
    { label: 'Nome da Equipe / Código', value: [name, code].filter(Boolean).join(' · ') },
    { label: 'Horário de 5S', value: schedule },
  ].filter((detail) => detail.value);

  return (
    <View className="w-full gap-[24px] rounded-modal bg-surface p-[32px] shadow-[0px_12px_32px_0px_rgba(17,17,17,0.16)]">
      <View className="flex-row items-start justify-between">
        <View className="min-w-0 flex-1 gap-[8px] pr-[12px]">
          <View className="flex-row items-center justify-between gap-[12px]">
            <Text className="shrink font-montserrat-semibold text-section text-text-primary">
              Detalhes da equipe
            </Text>
            <TeamStatusBadge status={status} />
          </View>
          <Text className="font-montserrat text-body text-text-secondary">
            Informações cadastradas para a rotina operacional de 5S.
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Fechar"
          onPress={onClose}
          onFocus={() => setCloseFocused(true)}
          onBlur={() => setCloseFocused(false)}
          hitSlop={8}
          className={`rounded-control p-[4px] ${closeFocused ? FOCUS_RING : ''}`}
        >
          <Icon icon={X} size={24} className="text-text-secondary" />
        </Pressable>
      </View>

      {details.length > 0 ? (
        <View className="gap-[16px] pb-[16px]">
          <View
            pointerEvents="none"
            className="absolute inset-x-0 bottom-0 h-px bg-border-subtle"
          />
          {details.map(({ label, value }) => (
            <View key={label} className="gap-[8px] md:flex-row md:items-center md:gap-[24px]">
              <Text className="font-montserrat-semibold text-label text-text-secondary md:w-[200px]">
                {label}
              </Text>
              <Text className="shrink font-montserrat text-body text-text-primary">{value}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {representatives && representatives.length > 0 ? (
        <View className="gap-[12px]">
          <Text className="font-montserrat-semibold text-label text-text-secondary">
            Representantes
          </Text>
          <View className="flex-row flex-wrap gap-[12px]">
            {representatives.map((representative, index) => (
              <RepresentativeCard
                key={`${representative}-${index}`}
                name={representative}
                className="grow basis-[200px]"
              />
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
}
