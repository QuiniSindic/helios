'use client';

import { savePrediction } from '@/actions/actions';
import { useAuth } from '@/hooks/useAuth';
import {
  getEventPredictions,
  getUserMatchPrediction,
} from '@/services/database.service';
import { useMatchesStore } from '@/store/matchesStore';
import { PredictionObject } from '@/types/database/table.types';
import { Match } from '@/types/la_liga/la_liga.types';
import { LaLigaPredictionPayload } from '@/types/prediction.types';
import { Button, Divider, Spinner } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SaveButton from '../ui/SaveButton';
import EventNavigation from './EventNavigation';
import ScoreInput from './ScoreInput';
import UsersPredictions from './UserPredictions';

interface MatchInfoProps {
  event: Match;
  predictions: PredictionObject[];
}

const MatchInfo: React.FC<MatchInfoProps> = ({ event, predictions }) => {
  const { user } = useAuth();
  const { events } = useMatchesStore();

  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Validamos que los inputs no estén vacíos
  const isValidPrediction = homeScore.trim() !== '' && awayScore.trim() !== '';

  // El partido se considera en juego si su status es alguno de estos (PreMatch = no iniciado)
  const isInProgress = ['FirstHalf', 'HalfTime', 'SecondHalf'].includes(
    event.status,
  );

  const notStarted = event.status === 'PreMatch';
  const isFinished = event.status === 'FullTime';

  const {
    data: prediction,
    error,
    refetch: refetchUserPrediction,
  } = useQuery({
    queryKey: ['prediction', user?.id, event.id],
    queryFn: () => getUserMatchPrediction(user?.id as string, event.id),
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  const {
    data: predictionsData,
    refetch: refetchPredictions,
    isLoading: predictionsLoading,
  } = useQuery<PredictionObject[]>({
    queryKey: ['predictions', event.id],
    queryFn: () => getEventPredictions(event.id),
    refetchOnWindowFocus: false,
    initialData: predictions,
  });

  // Si ya existe una predicción, precargamos los inputs
  useEffect(() => {
    if (prediction) {
      setHomeScore(prediction.home_score.toString());
      setAwayScore(prediction.away_score.toString());
    }
  }, [prediction]);

  const payload: LaLigaPredictionPayload = {
    home_team: event.home_team.nickname,
    away_team: event.away_team.nickname,
    home_score: parseInt(homeScore, 10),
    away_score: parseInt(awayScore, 10),
    event_id: event.id,
    competition_id: event?.competition?.id as number,
    competition_name: event?.competition?.name as string,
    user_id: user ? user.id : '',
    event_name: `${event.home_team.nickname} vs ${event.away_team.nickname}`,
  };

  const handleSavePrediction = async () => {
    if (user && isValidPrediction) {
      setIsSaving(true);
      try {
        await savePrediction(user, payload);

        if (prediction) {
          toast.success('¡Predicción actualizada con éxito!');
        } else {
          toast.success('¡Predicción guardada con éxito!');
        }
        await refetchUserPrediction();
        await refetchPredictions();
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
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <>
        <EventNavigation currentSlug={event.slug} events={events} />
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
      <EventNavigation currentSlug={event.slug} events={events} />
      <div className="match-info-container flex flex-col min-h-screen">
        {notStarted && !prediction && (
          <div className="text-center mb-4">
            <h1>Realiza la predicción para el siguiente partido</h1>
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="text-center text-red-500 mb-4">
            <p>Error: {(error as Error).message}</p>
          </div>
        )}

        {/* Logos y nombres de los equipos */}
        <div className="flex justify-around mb-2">
          <div className="flex flex-col items-center">
            <Image
              src={event.home_team.shield.url}
              alt={event.home_team.nickname}
              width={64}
              height={64}
            />
            <h2
              className="text-center max-w-[100px] break-words mt-4"
              title={event.home_team.name}
            >
              {event.home_team.name}
            </h2>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={event.away_team.shield.url}
              alt={event.away_team.nickname}
              width={64}
              height={64}
            />
            <h2
              className="text-center max-w-[100px] break-words mt-4"
              title={event.away_team.name}
            >
              {event.away_team.name}
            </h2>
          </div>
        </div>

        {/* Indicador de carga */}
        {isLoading && (
          <div className="text-center mb-4">
            <p>Cargando predicción...</p>
          </div>
        )}

        {/* Sección de inputs */}
        {!isInProgress && !isFinished ? (
          <>
            {prediction && (
              <p className="text-center mb-2">
                {`Tu predicción actual (editable): ${homeScore} - ${awayScore}`}
              </p>
            )}
            <div className="flex justify-around mb-2">
              <ScoreInput
                value={homeScore}
                onChange={(val) => setHomeScore(val)}
              />
              <ScoreInput
                value={awayScore}
                onChange={(val) => setAwayScore(val)}
              />
            </div>
          </>
        ) : !isInProgress && isFinished ? (
          <div className="text-center mb-2">
            <p className="text-red-500">El partido ha finalizado</p>
          </div>
        ) : (
          <>
            {prediction ? (
              <>
                <p className="text-center mb-2">Esta es tu predicción</p>
                <div className="flex justify-around mb-2">
                  <ScoreInput value={homeScore} onChange={() => {}} disabled />
                  <ScoreInput value={awayScore} onChange={() => {}} disabled />
                </div>
              </>
            ) : (
              <div className="text-center mb-2">
                <p className="text-red-500">El partido está en juego</p>
              </div>
            )}
          </>
        )}

        {/* Botón para guardar o actualizar la predicción */}
        {notStarted && (
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
                {prediction ? 'Actualizar predicción' : 'Guardar predicción'}
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
        )}
        <Divider className="my-4" />

        {predictionsLoading && (
          <div className="flex justify-center text-center items-center min-h-screen">
            <Spinner
              classNames={{ label: 'text-foreground mt-4' }}
              label="Cargando predicciones de usuarios..."
              variant="wave"
              color="secondary"
            />
          </div>
        )}

        {!predictionsLoading && predictionsData.length === 0 && (
          <div className="text-center mb-2">
            <p className="text-red-500">No hay predicciones de usuarios</p>
          </div>
        )}

        {!predictionsLoading && predictionsData.length > 0 && (
          <UsersPredictions predictions={predictionsData} />
        )}
      </div>
    </>
  );
};

export default MatchInfo;
