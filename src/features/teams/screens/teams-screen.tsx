import { useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, Text, useWindowDimensions, View } from 'react-native';

import { TeamDetailsCard } from '@/features/teams/components/details/team-details-card';
import { TeamsPageFrame } from '@/features/teams/components/layout/teams-page-frame';
import { TeamsPageHeading } from '@/features/teams/components/layout/teams-page-heading';
import { TeamsViewSwitch } from '@/features/teams/components/layout/teams-view-switch';
import { TeamCard } from '@/features/teams/components/list/team-card';
import { TeamCardSkeleton } from '@/features/teams/components/list/team-card-skeleton';
import { TeamListMessage } from '@/features/teams/components/list/team-list-message';
import { TeamSearchField } from '@/features/teams/components/list/team-search-field';
import { useTeams } from '@/features/teams/hooks/use-teams';
import type { Team } from '@/features/teams/types/team';
import { filterTeams } from '@/features/teams/utils/filter-teams';
import { formatWorkingHours } from '@/features/teams/utils/working-hours';
import { Alert } from '@/shared/components/feedback/alert';
import { ModalOverlay } from '@/shared/components/overlays/modal-overlay';

export type TeamsScreenProps = {
  onLogout: () => void;
  onNavigateHome: () => void;
  onOpenCalendar: () => void;
};

const SKELETON_ITEMS = Array.from({ length: 6 }, (_, index) => ({ id: `skeleton-${index}` }));
const CARD_GAP = 10;

function columnsFor(width: number): number {
  if (width >= 1100) return 3;
  if (width >= 640) return 2;
  return 1;
}

/** "07 · Equipes — Lista · Visualizador" (Figma, frame 186:3355). */
export function TeamsScreen({ onLogout, onNavigateHome, onOpenCalendar }: TeamsScreenProps) {
  const { width } = useWindowDimensions();
  const {
    teams,
    isLoading,
    isRefreshing,
    error,
    retry,
    refresh,
    pendingIds,
    statusError,
    dismissStatusError,
    toggleStatus,
  } = useTeams();
  const [query, setQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const columns = columnsFor(width);
  const horizontalPadding = width >= 640 ? 40 : 16;
  const visibleTeams = useMemo(() => filterTeams(teams, query), [teams, query]);
  const showSkeleton = isLoading;
  const data: { id: string }[] = showSkeleton ? SKELETON_ITEMS : visibleTeams;

  const header = (
    <View className="gap-6 pb-6">
      <TeamsPageHeading
        title="Equipes"
        description="Consulte as equipes responsaveis para o 5S"
        teamCount={!isLoading && !error ? teams.length : undefined}
      />

      <View className="gap-3">
        <View className="flex-row flex-wrap items-center justify-between gap-3">
          <Text className="font-montserrat-semibold text-label text-text-primary">
            Buscar equipe
          </Text>
          <TeamsViewSwitch active="teams" onOpenTeams={() => {}} onOpenCalendar={onOpenCalendar} />
        </View>
        <TeamSearchField value={query} onChangeText={setQuery} />
      </View>

      {statusError ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dispensar aviso"
          accessibilityHint="Toque para fechar o aviso"
          onPress={dismissStatusError}>
          <Alert variant="error" title="Não foi possível alterar o status" description={statusError} />
        </Pressable>
      ) : null}
    </View>
  );

  return (
    <TeamsPageFrame onLogout={onLogout} onNavigateHome={onNavigateHome}>
      <FlatList
        // A troca de colunas exige nova instância do FlatList.
        key={columns}
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={columns}
        columnWrapperStyle={columns > 1 ? { gap: CARD_GAP } : undefined}
        contentContainerStyle={{
          gap: CARD_GAP,
          paddingHorizontal: horizontalPadding,
          paddingTop: 24,
          paddingBottom: 24,
        }}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
        ListHeaderComponent={header}
        ListEmptyComponent={
          error ? (
            <TeamListMessage kind="error" message={error} onRetry={retry} />
          ) : (
            <TeamListMessage
              kind="empty"
              message={
                query
                  ? 'Nenhuma equipe corresponde à busca. Tente outro nome ou código.'
                  : 'Ainda não há equipes disponíveis.'
              }
            />
          )
        }
        renderItem={({ item }) => (
          <View style={{ flex: 1 / columns }} className="self-start">
            {showSkeleton ? (
              <TeamCardSkeleton />
            ) : (
              <TeamCard
                name={(item as Team).displayName}
                code={(item as Team).displayCode}
                status={(item as Team).status}
                onViewDetails={() => setSelectedTeam(item as Team)}
                onToggleStatus={() => void toggleStatus(item as Team)}
                statusPending={pendingIds.has(item.id)}
              />
            )}
          </View>
        )}
      />

      <ModalOverlay
        visible={selectedTeam !== null}
        onClose={() => setSelectedTeam(null)}
        accessibilityLabel="Detalhes da equipe">
        {selectedTeam ? (
          <TeamDetailsCard
            name={selectedTeam.displayName}
            code={selectedTeam.displayCode}
            schedule={formatWorkingHours(selectedTeam)}
            status={selectedTeam.status}
            representatives={selectedTeam.representatives}
            onClose={() => setSelectedTeam(null)}
          />
        ) : null}
      </ModalOverlay>
    </TeamsPageFrame>
  );
}
