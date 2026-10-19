import { useRouter } from 'expo-router';
import { ArrowRight, Check, Plus } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';

type Props = { onCreateAnother: () => void };

export function OccurrenceSuccessScreen({ onCreateAnother }: Props) {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-page" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="w-full max-w-[1440px] flex-1 gap-[24px] self-center px-[40px] pb-[24px] pt-[32px]">
        <View accessibilityRole="alert" accessibilityLiveRegion="polite"
          className="items-center gap-[20px] rounded-card bg-surface px-[32px] pb-[32px] pt-[36px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <View className="size-[80px] items-center justify-center rounded-full border-2 border-success-text">
            <Icon icon={Check} size={36} className="text-success-text" />
          </View>
          <View className="w-full items-center gap-[8px]">
            <Text accessibilityRole="header" className="w-full text-center font-montserrat-semibold text-page-heading text-success-text">Ocorrência enviada!</Text>
            <Text className="w-full text-center font-montserrat text-body text-success-text">A ocorrência foi encaminhada com sucesso</Text>
          </View>
        </View>
        <View className="gap-[8px]">
          <Button icon={ArrowRight} iconPosition="end" iconSize={32} onPress={() => router.replace('/home')}>Voltar ao menu principal</Button>
          <Button variant="secondary" icon={Plus} iconPosition="end" iconSize={32} onPress={onCreateAnother}>Criar outra ocorrência</Button>
        </View>
      </View>
    </ScrollView>
  );
}
