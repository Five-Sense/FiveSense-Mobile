import { CircleAlert, Users, type LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';

type TeamListMessageProps = {
  kind: 'empty' | 'error';
  message: string;
  onRetry?: () => void;
};

const CONTENT: Record<TeamListMessageProps['kind'], { icon: LucideIcon; title: string }> = {
  empty: { icon: Users, title: 'Nenhuma equipe encontrada' },
  error: { icon: CircleAlert, title: 'Algo deu errado' },
};

/** Estado vazio e estado de erro (com "Tentar novamente") da lista de equipes. */
export function TeamListMessage({ kind, message, onRetry }: TeamListMessageProps) {
  const { icon, title } = CONTENT[kind];

  return (
    <View
      accessibilityRole={kind === 'error' ? 'alert' : undefined}
      className="items-center gap-3 py-10">
      <Icon icon={icon} size={48} className="text-text-muted" />
      <Text className="text-center font-montserrat-semibold text-card text-text-primary">
        {title}
      </Text>
      <Text className="text-center font-montserrat text-body text-text-secondary">{message}</Text>
      {kind === 'error' && onRetry ? (
        <View className="mt-2 w-[220px]">
          <Button variant="secondary" onPress={onRetry}>
            Tentar novamente
          </Button>
        </View>
      ) : null}
    </View>
  );
}
