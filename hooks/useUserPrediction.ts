import {
  getEventPredictions,
  getUserMatchPrediction,
} from '@/services/predictions.service';
import { Prediction } from '@/types/database/table.types';
import { useQuery } from '@tanstack/react-query';

export const useMyPrediction = (userId: string, eventId: number) => {
  return useQuery({
    queryKey: ['userPrediction', userId, eventId],
    queryFn: () => getUserMatchPrediction(eventId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
};

export const useGetEventPredictions = (
  eventId: number,
  initial?: Prediction[],
) => {
  return useQuery({
    queryKey: ['eventPredictions', eventId],
    queryFn: () => getEventPredictions(eventId),
    initialData: initial,
    refetchOnWindowFocus: false,
  });
};
