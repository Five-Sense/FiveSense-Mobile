import { useRouter } from 'expo-router';

import { TeamsScreen } from '@/features/teams';

export default function EquipesRoute() {
  const router = useRouter();
  return <TeamsScreen onOpenCalendar={() => router.navigate('/equipes/calendario')} />;
}
