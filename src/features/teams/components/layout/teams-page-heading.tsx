import { Text, View } from 'react-native';

export type TeamsPageHeadingProps = {
  title: string;
  description: string;
  /** Total de equipes; oculto enquanto carrega ou em erro. */
  teamCount?: number;
};

/** "Título da página" do Figma (Contexto + título 28/36 + descrição). */
export function TeamsPageHeading({ title, description, teamCount }: TeamsPageHeadingProps) {
  return (
    <View className="gap-2">
      <View className="gap-1">
        <View className="flex-row items-center justify-between gap-2">
          <Text className="font-montserrat-semibold text-label text-brand-primary">
            Visualizador
          </Text>
          {teamCount !== undefined ? (
            <Text className="font-montserrat text-label text-text-secondary">
              {teamCount} {teamCount === 1 ? 'equipe disponível' : 'equipes disponíveis'}
            </Text>
          ) : null}
        </View>
        <Text
          accessibilityRole="header"
          className="font-montserrat-semibold text-[28px] leading-[36px] text-text-primary">
          {title}
        </Text>
      </View>
      <Text className="font-montserrat text-body text-text-secondary">{description}</Text>
    </View>
  );
}
