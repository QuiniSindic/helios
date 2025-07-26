'use client';

import { savePrediction } from '@/actions/actions';
import { API_LOGO_COMPETITION_URL } from '@/core/config';
import { useAuth } from '@/hooks/useAuth';
import { usePredictions, useUserPrediction } from '@/hooks/useUserPrediction';
import { useMatchesStore } from '@/store/matchesStore';
import { MatchData } from '@/types/custom.types';
import { PredictionObject } from '@/types/database/table.types';
import { PredictionPayload } from '@/types/prediction.types';
import { Button, Divider, Spinner } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SaveButton from '../ui/SaveButton';
import EventNavigation from './EventNavigation';
import { MatchInfoTabs } from './MatchInfoTabs';
import { NoPredictionWarn } from './NoPredictionWarn';
import { TeamPrediction } from './TeamPrediction';

interface MatchInfoProps {
  event: MatchData;
  predictions: PredictionObject[];
}

const MatchInfo: React.FC<MatchInfoProps> = ({
  event,
  predictions: initialPreds,
}) => {
  const { user } = useAuth();
  const userId = user?.id ?? '';
  const { events } = useMatchesStore();

  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Validamos que los inputs no estén vacíos
  const isValidPrediction = homeScore.trim() !== '' && awayScore.trim() !== '';

  // El partido se considera en juego si su status es alguno de estos (PreMatch = no iniciado)
  const isInProgress = ['FirstHalf', 'HT', 'SecondHalf'].includes(event.status);

  const notStarted = event.status === 'NS';
  const isFinished = event.status === 'FT';

  const {
    data: userPred,
    refetch: refetchUserPred,
    // isLoading: loadingUserPred,
    error: userPredError,
  } = useUserPrediction(userId, Number(event.id));

  const {
    data: allPreds = [],
    refetch: refetchAllPreds,
    isLoading: loadingAllPreds,
  } = usePredictions(Number(event.id), initialPreds);

  // Si ya existe una predicción, precargamos los inputs
  useEffect(() => {
    if (userPred) {
      setHomeScore(userPred.home_score.toString());
      setAwayScore(userPred.away_score.toString());
    }
  }, [userPred]);

  const payload: PredictionPayload = {
    event_id: event.id,
    event_name: `${event.homeTeam.name} vs ${event.awayTeam.name}`,
    home_team: event.homeTeam.name,
    away_team: event.awayTeam.name,
    home_score: parseInt(homeScore, 10),
    away_score: parseInt(awayScore, 10),
    competition_id: Number(event.competitionid),
    // competition_name: event.competition_full_name,
    user_id: user ? user.id : '',
  };

  const handleSavePrediction = async () => {
    if (user && isValidPrediction) {
      setIsSaving(true);
      try {
        console.log('payload', payload);
        await savePrediction(user, payload);

        if (userPred) {
          toast.success('¡Predicción actualizada con éxito!');
        } else {
          toast.success('¡Predicción guardada con éxito!');
        }
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

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
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
      <EventNavigation currentId={event.id} events={events} />
      <div className="match-info-container flex flex-col min-h-screen">
        <NoPredictionWarn status={event.status} prediction={userPred} />

        {/* Mensaje de error */}
        {userPredError && (
          <div className="text-center text-red-500 mb-4">
            <p>Error: {(userPredError as Error).message}</p>
          </div>
        )}

        {/* Logos y nombres de los equipos */}
        <div className="flex justify-around mb-4">
          <TeamPrediction
            name={event.homeTeam.name}
            imgSrc={
              `${API_LOGO_COMPETITION_URL}${event.homeTeam.img as string}` ||
              '/globe.svg'
            } //src={event.home.img as string}
            score={homeScore}
            onChange={setHomeScore}
          />
          <TeamPrediction
            name={event.awayTeam.name}
            imgSrc={
              `${API_LOGO_COMPETITION_URL}${event.awayTeam.img as string}` ||
              '/globe.svg'
            } //src={event.away.img as string}
            score={awayScore}
            onChange={setAwayScore}
          />
        </div>

        {/* Mensajes de estado del partido */}
        {notStarted && (
          <div className="text-center">
            {userPred && (
              <p className="mb-2">
                Tu predicción (editable): {homeScore} - {awayScore}
              </p>
            )}
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
        {isLoading && (
          <div className="text-center mb-4">
            <p>Cargando predicción...</p>
          </div>
        )}

        <Divider className="my-4" />

        <MatchInfoTabs
          event={event}
          predictions={allPreds}
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
