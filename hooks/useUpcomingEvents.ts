import {
  getLive,
  getMatchData,
  getResults,
  getResultsPaginated,
  getUpcoming,
} from '@/services/matches.service';
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

// TODO: improve para que
// cuando el getLive devuelva partidos que no esten live (ninguno con status NS), no se haga refetch
// y si devuelve live (status HT, minuto etc), si se haga refetch
export const useLiveEventsQuery = (sport?: string, competitionId?: number) => {
  return useQuery({
    queryKey: ['live_events', sport, competitionId],
    queryFn: () => getLive(sport, competitionId),
    retry: 2,
    refetchInterval: 1000 * 30, // 30 segundos
    refetchIntervalInBackground: true, // tab no active
    refetchOnReconnect: true, // al reconectar
    refetchOnMount: false, // al montar
    refetchOnWindowFocus: false, // al enfocar ventana
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

export const useResultsEventsQuery = (
  sport?: string,
  competitionId?: number,
  options?: { enabled: boolean },
) => {
  return useQuery({
    queryKey: ['results', sport, competitionId],
    queryFn: () => getResults(sport, competitionId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: options?.enabled ?? true,
  });
};

export const useGetMatchQuery = (matchId: number) => {
  return useQuery({
    queryKey: ['event', matchId],
    queryFn: () => getMatchData(matchId),
    enabled: Boolean(matchId),
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 30, // 30 segundos
    staleTime: 0,
  });
};

export const useResultsPaginated = (params: {
  sport?: string;
  competition?: number;
  from?: string;
  to?: string;
  matchweek?: number;
  page: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ['results-paged', params],
    queryFn: () => getResultsPaginated(params),
    placeholderData: (prev) => prev, // keepPreviousData
  });
};
