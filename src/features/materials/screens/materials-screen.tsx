import { PackageSearch, SearchX } from 'lucide-react-native';
import { useMemo, useState, type ReactNode } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

import { Alert } from '@/shared/components/feedback/alert';
import { Input } from '@/shared/components/ui/input';

import { MaterialDetailsDialog } from '../components/details/material-details-dialog';
import { MaterialItem } from '../components/list/material-item';
import { MaterialListEmpty, MaterialListError } from '../components/list/material-list-message';
import { MaterialListSkeleton } from '../components/list/material-list-skeleton';
import { useMaterials } from '../hooks/use-materials';
import type { Material } from '../types/material';
import { filterMaterials } from '../utils/filter-materials';
import { countLabel, describeMaterialsError } from '../utils/materials-feedback';

/** Largura e margens da página (padrão das telas autenticadas: 16 no celular, 40 no tablet). */
function PageColumn({ children }: { children: ReactNode }) {
  return <View className="w-full max-w-[1440px] self-center px-[16px] md:px-[40px]">{children}</View>;
}

/** Consulta de materiais do Visualizador (somente leitura): busca, lista e detalhes em pop-up. */
export default function MaterialsScreen() {
  const query = useMaterials();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Material | null>(null);

  const materials = query.data;
  const filtered = useMemo(() => filterMaterials(materials ?? [], search), [materials, search]);
  const feedback = query.isError ? describeMaterialsError(query.error) : null;

  let body: ReactNode = null;
  if (query.isPending && query.fetchStatus !== 'idle') {
    body = <MaterialListSkeleton />;
  } else if (!materials) {
    body = feedback ? (
      <MaterialListError title={feedback.title} description={feedback.description} retrying={query.isFetching} onRetry={() => { void query.refetch(); }} />
    ) : null;
  } else if (materials.length === 0) {
    body = <MaterialListEmpty icon={PackageSearch} title="Nenhum material disponível." description="Quando houver materiais cadastrados, eles aparecerão aqui." />;
  } else if (filtered.length === 0) {
    body = <MaterialListEmpty icon={SearchX} title="Nenhum material encontrado." description="Revise o nome digitado e tente novamente." />;
  }

  const header = (
    <PageColumn>
      <View className="gap-[24px] pb-[16px] pt-[32px]">
        <View className="gap-[8px]">
          <View className="gap-[4px]">
            <View className="flex-row items-center justify-between gap-[8px]">
              <Text className="font-montserrat-semibold text-label text-brand-primary">Visualizador</Text>
              {materials ? (
                <Text accessibilityLiveRegion="polite" className="font-montserrat text-helper text-text-secondary">
                  {countLabel(materials.length)}
                </Text>
              ) : null}
            </View>
            <Text accessibilityRole="header" className="font-montserrat-semibold text-section text-text-primary md:text-page-heading">
              Materiais
            </Text>
          </View>
          <Text className="font-montserrat text-body text-text-secondary">
            Consulte os materiais disponíveis e acompanhe a situação do estoque.
          </Text>
        </View>

        {materials && query.isError && feedback ? (
          <Alert variant="warning" title="Não foi possível atualizar a lista." description={`${feedback.description} Os dados exibidos podem estar desatualizados.`} />
        ) : null}

        {materials && materials.length > 0 ? (
          <Input
            label="Buscar material"
            optionalIndicator={false}
            value={search}
            onChangeText={setSearch}
            placeholder="Nome do material"
            maxLength={55}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            clearButtonMode="while-editing"
            accessibilityHint="Filtra a lista pelo nome do material"
          />
        ) : null}
      </View>
    </PageColumn>
  );

  return (
    <>
      <FlatList
        className="flex-1 bg-page"
        data={body ? [] : filtered}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={header}
        ListEmptyComponent={body ? <PageColumn>{body}</PageColumn> : null}
        ListFooterComponent={<View className="h-[24px]" />}
        renderItem={({ item }) => (
          <PageColumn>
            <View className="pb-[12px]">
              <MaterialItem name={item.name} onPress={() => setSelected(item)} />
            </View>
          </PageColumn>
        )}
        refreshControl={
          <RefreshControl
            refreshing={query.isRefetching}
            onRefresh={() => { void query.refetch(); }}
          />
        }
      />
      <MaterialDetailsDialog material={selected} onClose={() => setSelected(null)} />
    </>
  );
}
