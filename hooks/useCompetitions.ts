import { getCompetitionsByIds } from '@/services/competitions.service';
import { Competition } from '@/types/database/table.types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useCompetitionsByIdsQuery = (ids: number[]) => {
  return useQuery({
    queryKey: ['competitionsByIds', ids.sort()],
    queryFn: () => getCompetitionsByIds(ids),
    enabled: ids.length > 0,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useCompetitionByIdQuery = (parsed_id?: number) => {
  const queryClient = useQueryClient();

  return useQuery<Competition | undefined>({
    queryKey: ['competition', parsed_id],
    initialData: () =>
      Number.isFinite(parsed_id)
        ? queryClient.getQueryData(['competition', parsed_id])
        : undefined,
    enabled: false,
  });
};
