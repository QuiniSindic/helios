import { leaguesMap } from '@/src/constants/mappers';
import { getStandingLeagues } from '@/src/services/standings.service';
import { useQuery } from '@tanstack/react-query';

export const useStandingsQuery = (competition?: string) => {
  const slug = competition
    ? leaguesMap[competition as keyof typeof leaguesMap]
    : undefined;
  return useQuery({
    queryKey: ['standings', competition],
    queryFn: () => getStandingLeagues(slug!),
    enabled: !!competition,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
