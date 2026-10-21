import { useRouter } from 'expo-router';

import { TeamCalendarScreen } from '@/features/teams';

export default function CalendarioRoute() {
  const router = useRouter();
  return <TeamCalendarScreen onOpenTeams={() => router.navigate('/equipes')} />;
}
