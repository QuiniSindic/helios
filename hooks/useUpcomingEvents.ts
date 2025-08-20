import { getLive, getUpcoming } from '@/services/matches.service';
import { useQuery } from '@tanstack/react-query';

export const useUpcomingEventsQuery = (
  sport?: string,
  competitionId?: number,
) => {
  return useQuery({
    queryKey: ['events', sport, competitionId],
    queryFn: () => getUpcoming(sport, competitionId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

export const useLiveEventsQuery = (sport?: string, competitionId?: number) => {
  return useQuery({
    queryKey: ['live_events', sport, competitionId],
    queryFn: () => getLive(sport, competitionId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
