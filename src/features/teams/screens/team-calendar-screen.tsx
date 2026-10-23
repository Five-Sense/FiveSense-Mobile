import { useMemo } from 'react';
import { RefreshControl, ScrollView, Text, useWindowDimensions, View } from 'react-native';

import { TeamsPageHeading } from '@/features/teams/components/layout/teams-page-heading';
import { TeamsViewSwitch } from '@/features/teams/components/layout/teams-view-switch';
import { TeamListMessage } from '@/features/teams/components/list/team-list-message';
import { useTeams } from '@/features/teams/hooks/use-teams';
import { buildScheduleSlots } from '@/features/teams/utils/build-schedule-slots';
import { getSlotStatus } from '@/features/teams/utils/get-slot-status';
import { isWorkingDay } from '@/features/teams/utils/working-hours';
import { TeamScheduleRow } from '@/shared/components/data-display/team-schedule-row';

export type TeamCalendarScreenProps = {
  onOpenTeams: () => void;
};

const SKELETON_ROWS = Array.from({ length: 10 }, (_, index) => index);

/** "07 · Equipes — Lista · Visualizador" no modo Calendário (Figma, frame 208:6892). */
export function TeamCalendarScreen({
  onOpenTeams,
}: TeamCalendarScreenProps) {
  const { width } = useWindowDimensions();
  const { teams, isLoading, isRefreshing, error, retry, refresh } = useTeams();
  const horizontalPadding = width >= 640 ? 40 : 16;
  const now = new Date();
  const workingDay = isWorkingDay(now);
  const slots = useMemo(() => buildScheduleSlots(teams), [teams]);

  return (
    <View className="flex-1 bg-page">
      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
        contentContainerStyle={{
          gap: 24,
          paddingHorizontal: horizontalPadding,
          paddingVertical: 24,
        }}>
        <TeamsPageHeading
          title="Calendário"
          description="Consulte os horários disponíveis para as equipes do 5s"
          teamCount={!isLoading && !error ? teams.length : undefined}
        />

        <View className="items-end">
          <TeamsViewSwitch active="calendar" onOpenTeams={onOpenTeams} onOpenCalendar={() => {}} />
        </View>

        <View className="gap-3">
          <View className="flex-row gap-[23px]">
            <Text className="font-montserrat-semibold text-card text-text-primary">Horários</Text>
            <Text className="font-montserrat-semibold text-card text-text-primary">Equipes</Text>
          </View>

          {!workingDay && !isLoading && !error ? (
            <Text className="font-montserrat text-helper text-text-secondary">
              Hoje não há expediente de 5S. As equipes trabalham de segunda a sexta.
            </Text>
          ) : null}

          {error ? (
            <TeamListMessage kind="error" message={error} onRetry={retry} />
          ) : isLoading ? (
            <View
              accessible={false}
              importantForAccessibility="no-hide-descendants"
              className="overflow-hidden rounded-card bg-surface">
              {SKELETON_ROWS.map((row) => (
                <View key={row} className="border-b border-border-subtle px-4 py-3">
                  <View className="h-[26px] w-[50%] rounded-control bg-surface-subtle" />
                </View>
              ))}
            </View>
          ) : slots.length > 0 ? (
            <View className="overflow-hidden rounded-card">
              {slots.map((slot) => (
                <TeamScheduleRow
                  key={slot.time}
                  time={slot.time}
                  teamName={slot.teamCodes.length > 0 ? slot.teamCodes.join(' - ') : 'Nenhuma Equipe'}
                  status={workingDay ? getSlotStatus(slot.time, now) : 'future'}
                />
              ))}
            </View>
          ) : (
            <TeamListMessage kind="empty" message="Nenhuma equipe tem horário de 5S cadastrado." />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
