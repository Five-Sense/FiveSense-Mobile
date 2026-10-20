import { Text, View } from 'react-native';

export function OccurrenceHeading({ progress }: { progress: number }) {
  return (
    <View className="gap-[4px]">
      <View className="gap-[8px]">
        <View className="gap-[4px]">
          <View className="flex-row items-center justify-between gap-[8px]">
            <Text className="font-montserrat-semibold text-label text-brand-primary">Visualizador</Text>
            <Text accessibilityLiveRegion="polite" className="font-montserrat text-helper text-text-secondary">Etapa {progress} de 3</Text>
          </View>
          <Text accessibilityRole="header" className="font-montserrat-semibold text-page-heading text-text-primary">Registre a ocorrência</Text>
        </View>
        <Text className="font-montserrat text-body text-text-secondary">Informe os dados gerais sobre a ocorrência</Text>
      </View>
      <View accessible accessibilityRole="progressbar" accessibilityLabel="Preenchimento dos campos obrigatórios" accessibilityValue={{ min: 0, max: 3, now: progress }} aria-valuemin={0} aria-valuemax={3} aria-valuenow={progress} className="flex-row gap-[8px] pt-[8px]">
        {[1, 2, 3].map((step) => <View key={step} className={`h-[4px] flex-1 rounded-full ${step <= progress ? 'bg-brand-action' : 'bg-border-subtle'}`} />)}
      </View>
    </View>
  );
}
