import {
  getEventPredictions,
  getUserMatchPrediction,
} from '@/services/database.service';
import { PredictionObject } from '@/types/database/table.types';
import { useQuery } from '@tanstack/react-query';

export const useUserPrediction = (userId: string, eventId: number) => {
  return useQuery({
    queryKey: ['userPrediction', userId, eventId],
    queryFn: () => getUserMatchPrediction(userId, eventId),
    enabled: Boolean(userId),
    refetchOnWindowFocus: false,
  });
};

export const usePredictions = (
  eventId: number,
  initial: PredictionObject[],
) => {
  return useQuery({
    queryKey: ['predictions', eventId],
    queryFn: () => getEventPredictions(eventId),
    initialData: initial,
    refetchOnWindowFocus: false,
  });
};
