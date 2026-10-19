import { useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { AccessCard } from '../components/home/access-card';
import { HOME_ACCESS_ITEMS } from '../constants/home-access-items';

const CARD_GAP = 16;
const CARD_MIN_WIDTH = 320;
const CARD_MAX_WIDTH = 369;

/** Largura única para todos os cards: colunas que cabem no contêiner, limitada a 369 (Figma). */
function getCardWidth(containerWidth: number) {
  const columns = Math.max(1, Math.floor((containerWidth + CARD_GAP) / (CARD_MIN_WIDTH + CARD_GAP)));
  const width = (containerWidth - CARD_GAP * (columns - 1)) / columns;
  return Math.min(CARD_MAX_WIDTH, width);
}

/** Página principal do Visualizador. Saudação genérica até a sessão (Fase 2) fornecer o nome. */
export function HomeScreen() {
  const router = useRouter();
  const [gridWidth, setGridWidth] = useState(0);
  const cardWidth = gridWidth > 0 ? getCardWidth(gridWidth) : undefined;

  return (
    <ScrollView
      className="flex-1 bg-page"
      contentContainerClassName="px-[16px] py-[24px] md:px-[40px]">
      <View className="w-full max-w-[1440px] gap-[24px] self-center">
        <View className="gap-[4px]">
          <Text className="font-montserrat-semibold text-label text-brand-primary">Visualizador</Text>
          {/* text-page-heading: "text-page" também é uma cor (#FCFCFC) e deixava o título invisível a partir de md. */}
          <Text
            accessibilityRole="header"
            className="font-montserrat-semibold text-section text-text-primary md:text-page-heading">
            Olá!
          </Text>
          <Text className="font-montserrat text-helper text-text-secondary">
            O que você deseja fazer hoje?
          </Text>
        </View>

        {/* Figma Home (tablet): cards 369 de largura, gap 16, quebrando em linhas. Sem troca de layout por breakpoint. */}
        <View className="flex-row flex-wrap gap-[16px]" onLayout={(event) => setGridWidth(event.nativeEvent.layout.width)}>
          {HOME_ACCESS_ITEMS.map((item) => (
            <View key={item.id} style={cardWidth ? { width: cardWidth } : { width: '100%' }}>
              <AccessCard
                icon={item.icon}
                title={item.title}
                description={item.description}
                actionLabel={item.actionLabel}
                onPress={() => router.navigate(item.href as Href)}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}