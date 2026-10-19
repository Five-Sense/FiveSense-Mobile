import { useRouter } from 'expo-router';

import { TeamCalendarScreen } from '@/features/teams/screens/team-calendar-screen';

export default function CalendarioRoute() {
  const router = useRouter();
  // Sem sessão/login ainda: sair e Home levam ao placeholder inicial.
  return (
    <TeamCalendarScreen
      onLogout={() => router.replace('/')}
      onNavigateHome={() => router.replace('/')}
      onOpenTeams={() => router.replace('/equipes')}
    />
  );
}
