import { Text, View } from 'react-native';

import { QuantityStepper } from '@/shared/components/forms/quantity-stepper';
import { Select } from '@/shared/components/ui/select';

import type { useOccurrenceForm } from '../../hooks/use-occurrence-form';
import { MAX_AFFECTED_QUANTITY } from '../../types/occurrence';
import { OccurrenceImageField } from '../image/occurrence-image-field';

export function OccurrenceFields({ form }: { form: ReturnType<typeof useOccurrenceForm> }) {
  return (
    <View className="gap-[20px] rounded-card border border-border-subtle bg-surface p-[20px] md:p-[32px]">
      <Select
        label="Problema" required value={form.values.problemId} onChange={(value) => form.change('problemId', value)}
        options={(form.options.problems.data ?? []).map((item) => ({ value: item.id, label: item.name }))}
        placeholder="Selecionar problema" valueTextSize="helper" disabled={form.sending} loading={form.options.problems.isPending}
        loadError={form.options.problems.isError ? 'Não foi possível carregar os problemas.' : undefined}
        helperText={form.options.problems.isPending ? 'Carregando problemas...' : form.options.problems.isError ? 'Abra a lista para tentar carregar novamente.' : undefined}
        error={form.errors.problemId} onRetry={() => { void form.options.problems.refetch(); }} emptyMessage="Nenhum problema disponível."
      />
      <Select
        label="Material" required value={form.values.materialId} onChange={(value) => form.change('materialId', value)}
        options={(form.options.materials.data ?? []).map((item) => ({ value: item.id, label: item.name }))}
        placeholder="Selecionar material" valueTextSize="helper" disabled={form.sending} loading={form.options.materials.isPending}
        loadError={form.options.materials.isError ? 'Não foi possível carregar os materiais.' : undefined}
        helperText={form.options.materials.isPending ? 'Carregando materiais...' : form.options.materials.isError ? 'Abra a lista para tentar carregar novamente.' : undefined}
        error={form.errors.materialId} onRetry={() => { void form.options.materials.refetch(); }} emptyMessage="Nenhum material disponível."
      />
      <View className="gap-[8px]">
        <Text className="font-montserrat-semibold text-label text-text-primary">Quantidade de materiais afetados *</Text>
        <QuantityStepper label="Quantidade de materiais afetados" value={form.values.affectedQuantity} onChange={(value) => form.change('affectedQuantity', value)} min={0} max={MAX_AFFECTED_QUANTITY} unitLabel={form.values.affectedQuantity === 1 ? 'unidade' : 'unidades'} valueTextSize="section" disabled={form.sending} />
        {form.errors.affectedQuantity ? <Text accessibilityRole="alert" className="font-montserrat text-helper text-error-text">{form.errors.affectedQuantity}</Text> : null}
      </View>
      <OccurrenceImageField image={form.image} disabled={form.sending || form.picking} error={form.errors.image} onChoose={() => form.setImageChooserOpen(true)} onRemove={form.removeImage} />
    </View>
  );
}
