import { useRouter } from 'expo-router';

import { TeamsScreen } from '@/features/teams/screens/teams-screen';

export default function EquipesRoute() {
  const router = useRouter();
  // Sem sessão/login ainda: sair e Home levam ao placeholder inicial.
  return (
    <TeamsScreen
      onLogout={() => router.replace('/')}
      onNavigateHome={() => router.replace('/')}
      onOpenCalendar={() => router.replace('/equipes/calendario')}
    />
  );
}
