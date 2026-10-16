import { useRouter, type Href } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { AccessCard } from '../components/home/access-card';
import { HOME_ACCESS_ITEMS } from '../constants/home-access-items';

/** Página principal do Visualizador. Saudação genérica até a sessão (Fase 2) fornecer o nome. */
export function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-page"
      contentContainerClassName="px-[16px] py-[24px] md:px-[24px] lg:px-[32px]">
      <View className="w-full max-w-[1440px] gap-[24px] self-center">
        <View className="gap-[4px]">
          <Text className="font-montserrat-semibold text-label text-brand-primary">Visualizador</Text>
          <Text
            accessibilityRole="header"
            className="font-montserrat-semibold text-section text-text-primary md:text-page">
            Olá!
          </Text>
          <Text className="font-montserrat text-helper text-text-secondary">
            O que você deseja fazer hoje?
          </Text>
        </View>

        <View className="-mx-[8px] flex-row flex-wrap md:-mx-[12px]">
          {HOME_ACCESS_ITEMS.map((item) => (
            <View key={item.id} className="w-full p-[8px] md:w-1/2 md:p-[12px]">
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