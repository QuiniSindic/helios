'use client';

import { useAuth } from '@/hooks/useAuth';
import { useGetMatchQuery } from '@/hooks/useUpcomingEvents';
import {
  useGetEventPredictions,
  useMyPrediction,
} from '@/hooks/useUserPrediction';
import {
  saveEventPrediction,
  updateEventPrediction,
} from '@/services/predictions.service';
import { useMatchesStore } from '@/store/matchesStore';
import { Prediction } from '@/types/database/table.types';
import { MatchData } from '@/types/events/events.types';
import {
  PredictionPayload,
  PredictionUpdatePayload,
} from '@/types/prediction.types';
import { Divider, Spinner } from '@heroui/react';
import toast, { Toaster } from 'react-hot-toast';
import EventNavigation from './EventNavigation';
import { MatchInfoTabs } from './MatchInfoTabs';
import { NoPredictionWarn } from './NoPredictionWarn';
import PredictionForm from './form/PredictionForm';

interface MatchInfoProps {
  event: MatchData;
  predictions?: Prediction[];
}

const MatchInfo: React.FC<MatchInfoProps> = ({
  event,
  predictions: initialPreds,
}) => {
  const { data: user, isLoading: authLoading } = useAuth();
  const userId = user?.id ?? '';
  const { events } = useMatchesStore();

  const { data: matchData } = useGetMatchQuery(event.id);

  const liveEvent = matchData ?? event;

  const notStarted = liveEvent.status === 'NS';
  const isFinished = liveEvent.status === 'FT';
  const isInProgress =
    liveEvent.status.includes("'") || liveEvent.status === 'HT';

  const {
    data: userPred,
    refetch: refetchUserPred,
    error: userPredError,
  } = useMyPrediction(userId, event.id);

  const {
    data: allPredictions,
    refetch: refetchAllPreds,
    isLoading: loadingAllPreds,
  } = useGetEventPredictions(event.id, initialPreds);

  const handleSave = async (values: { home: string; away: string }) => {
    const payload: PredictionPayload = {
      event_id: event.id,
      competition_id: event.competitionid,
      home_score: parseInt(values.home, 10),
      away_score: parseInt(values.away, 10),
    };

    const res = await saveEventPrediction(payload);
    if (!res.ok) throw new Error(res.error || 'Error al guardar la predicción');

    toast.success('¡Predicción guardada con éxito!');
    await refetchUserPred();
    await refetchAllPreds();
  };

  const handleUpdate = async (values: { home: string; away: string }) => {
    const payload: PredictionUpdatePayload = {
      home_score: parseInt(values.home, 10),
      away_score: parseInt(values.away, 10),
    };

    const res = await updateEventPrediction(event.id, payload);
    if (!res.ok)
      throw new Error(res.error || 'Error al actualizar la predicción');

    toast.success('¡Predicción actualizada con éxito!');
    await refetchUserPred();
    await refetchAllPreds();
  };

  if (authLoading) {
    return (
      <>
        <EventNavigation currentId={event.id} events={events} />
        <div className="flex justify-center text-center items-center min-h-screen">
          <Spinner
            label="Cargando partido..."
            variant="wave"
            color="secondary"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster />
      {events?.length > 0 && (
        <EventNavigation currentId={event.id} events={events} />
      )}

      <div className="match-info-container flex flex-col min-h-screen">
        <NoPredictionWarn status={event.status} prediction={userPred} />

        {userPredError && (
          <div className="text-center text-red-500 mb-4">
            <p>Error: {(userPredError as Error).message}</p>
          </div>
        )}

        <PredictionForm
          key={liveEvent.id}
          event={liveEvent}
          initialPrediction={{
            home: userPred?.homeScore ?? '',
            away: userPred?.awayScore ?? '',
          }}
          disabled={!notStarted}
          isLoggedIn={!!user}
          onSubmit={userPred ? handleUpdate : handleSave}
        />

        {/* mensajes de estado */}
        {isInProgress && (
          <p className="text-center text-secondary mt-4">
            El partido está en juego.
          </p>
        )}
        {/* {isFinished && (
          <p className="text-red-500 text-center mt-2">
            El partido ha finalizado
          </p>
        )} */}

        {loadingAllPreds && (
          <div className="text-center mb-4">
            <p>Cargando predicciones...</p>
          </div>
        )}

        <Divider className="my-4" />

        <MatchInfoTabs
          event={liveEvent}
          predictions={allPredictions ?? []}
          isFinished={isFinished}
          isInProgress={isInProgress}
          notStarted={notStarted}
          refetchAllPreds={refetchAllPreds}
          loadingAllPreds={loadingAllPreds}
        />
      </div>
    </>
  );
};

export default MatchInfo;
