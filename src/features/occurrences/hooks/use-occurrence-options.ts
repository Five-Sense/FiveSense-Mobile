import { useQuery } from '@tanstack/react-query';

import { getOccurrenceOptions } from '../services/occurrences-service';

export function useOccurrenceOptions(userId: string | undefined) {
  const problems = useQuery({
    queryKey: ['occurrence-options', userId, 'problems'],
    queryFn: ({ signal }) => getOccurrenceOptions('problems', signal),
    enabled: Boolean(userId), retry: false, staleTime: 60_000,
  });
  const materials = useQuery({
    queryKey: ['occurrence-options', userId, 'materials'],
    queryFn: ({ signal }) => getOccurrenceOptions('materials', signal),
    enabled: Boolean(userId), retry: false, staleTime: 60_000,
  });
  return { problems, materials };
}
