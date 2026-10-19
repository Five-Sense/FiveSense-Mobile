import type { LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Alert, type AlertVariant } from '@/shared/components/feedback/alert';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';

type EmptyProps = { icon: LucideIcon; title: string; description: string };

/** Estado vazio: ícone 48, título 18/26 e descrição 16/24 (design-guidelines). */
export function MaterialListEmpty({ icon, title, description }: EmptyProps) {
  return (
    <View accessible accessibilityLabel={`${title}. ${description}`} className="items-center gap-[8px] px-[16px] py-[48px]">
      <Icon icon={icon} size={48} className="text-text-muted" />
      <Text className="text-center font-montserrat-semibold text-card text-text-primary">{title}</Text>
      <Text className="text-center font-montserrat text-body text-text-secondary">{description}</Text>
    </View>
  );
}

type ErrorProps = {
  title: string;
  description: string;
  variant?: AlertVariant;
  retrying?: boolean;
  onRetry: () => void;
};

/** Erro de carregamento com "Tentar novamente"; substitui só a região da lista. */
export function MaterialListError({ title, description, variant = 'error', retrying = false, onRetry }: ErrorProps) {
  return (
    <View className="gap-[16px]">
      <Alert variant={variant} title={title} description={description} />
      <Button variant="secondary" loading={retrying} loadingLabel="Carregando..." onPress={onRetry}>
        Tentar novamente
      </Button>
    </View>
  );
}
