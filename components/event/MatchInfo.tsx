'use client';

import { useAuth } from '@/hooks/useAuth';
import {
  useGetEventPredictions,
  useMyPrediction,
} from '@/hooks/useUserPrediction';

import { saveEventPrediction } from '@/services/predictions.service';
import { useMatchesStore } from '@/store/matchesStore';
import { MatchData } from '@/types/custom.types';
import { Prediction } from '@/types/database/table.types';
import { PredictionPayload } from '@/types/prediction.types';
import { Button, Spinner } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SaveButton from '../ui/buttons/SaveButton';
import EventNavigation from './EventNavigation';
import { MatchInfoTabs } from './MatchInfoTabs';
import { NoPredictionWarn } from './NoPredictionWarn';
import StatusBanner from './StatusBanner';
import { TeamPredictionContainer } from './TeamPredictionContainer';

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

  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const isValidPrediction = homeScore.trim() !== '' && awayScore.trim() !== '';

  const isInProgress = ['FirstHalf', 'HT', 'SecondHalf'].includes(event.status);
  const notStarted = event.status === 'NS';
  const isFinished = event.status === 'FT';

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

  // Si ya existe una predicción, precargamos los inputs
  useEffect(() => {
    if (!userPred) return;
    setHomeScore(String(userPred.home_score ?? ''));
    setAwayScore(String(userPred.away_score ?? ''));
  }, [userPred]);

  const payload: PredictionPayload = {
    event_id: event.id,
    home_score: parseInt(homeScore, 10),
    away_score: parseInt(awayScore, 10),
    competition_id: event.competitionid,
  };

  const handleSavePrediction = async () => {
    if (user && isValidPrediction) {
      setIsSaving(true);
      try {
        const res = await saveEventPrediction(payload);

        if (!res.ok) {
          throw new Error(res.error || 'Error al guardar la predicción');
        }

        toast.success(
          userPred
            ? '¡Predicción actualizada con éxito!'
            : '¡Predicción guardada con éxito!',
        );

        await refetchUserPred();
        await refetchAllPreds();
      } catch (err) {
        console.error(err);
        toast.error('Ocurrió un error al guardar la predicción.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (authLoading) {
    return (
      <>
        <EventNavigation currentId={event.id} events={events} />
        <div className="flex justify-center text-center items-center min-h-screen">
          <Spinner
            classNames={{ label: 'text-foreground mt-4' }}
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

        {/* Mensaje de error */}
        {userPredError && (
          <div className="text-center text-red-500 mb-4">
            <p>Error: {(userPredError as Error).message}</p>
          </div>
        )}

        <TeamPredictionContainer
          event={event}
          homeScore={homeScore}
          awayScore={awayScore}
          setHomeScore={setHomeScore}
          setAwayScore={setAwayScore}
        />

        {/* Mensajes de estado del partido */}
        {notStarted && (
          <div className="text-center">
            <StatusBanner status={event.status} myPrediction={userPred} />
            <div className="flex justify-center mt-6 w-full">
              {user ? (
                <Button
                  type="button"
                  isLoading={isSaving}
                  disabled={!isValidPrediction}
                  onPress={handleSavePrediction}
                  className={`group relative text-white flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 ${
                    !isValidPrediction
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'
                  }`}
                >
                  {userPred ? 'Actualizar predicción' : 'Guardar predicción'}
                </Button>
              ) : (
                <SaveButton
                  label="Compartir predicción"
                  onClick={() => {
                    console.log('Compartir predicción');
                  }}
                />
              )}
            </div>
          </div>
        )}

        {isInProgress && (
          <p className="text-center text-primary">
            El partido está en juego. Tu predicción final: {homeScore} -{' '}
            {awayScore}
          </p>
        )}

        {isFinished && (
          <p className="text-red-500 text-center">El partido ha finalizado</p>
        )}

        {/* Indicador de carga de predicción*/}
        {loadingAllPreds && (
          <div className="text-center mb-4">
            <p>Cargando predicción...</p>
          </div>
        )}

        <MatchInfoTabs
          event={event}
          predictions={allPredictions ?? []} // FIX this
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
