'use client';

import { savePrediction } from '@/actions/actions';
import { useAuth } from '@/hooks/useAuth';
import { getUserMatchPrediction } from '@/services/database.service';
import { Match } from '@/types/la_liga/la_liga.types';
import { LaLigaPredictionPayload } from '@/types/prediction.types';
import { Button } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import SaveButton from '../ui/SaveButton';
import ScoreInput from './ScoreInput';

interface MatchInfoProps {
  event: Match;
}

const MatchInfo: React.FC<MatchInfoProps> = ({ event }) => {
  const { user } = useAuth();

  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Validamos que los inputs no estén vacíos
  const isValidPrediction = homeScore.trim() !== '' && awayScore.trim() !== '';
  // El partido se considera en juego si su status NO es alguno de estos (PreMatch = no iniciado)
  const isInProgress = !['PreMatch', 'Canceled', 'FullTime'].includes(
    event.status,
  );

  const {
    data: prediction,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['prediction', user?.id, event.id],
    queryFn: () => getUserMatchPrediction(user?.id as string, event.id),
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  // Si ya existe una predicción, precargamos los inputs
  useEffect(() => {
    if (prediction) {
      setHomeScore(prediction.home_score.toString());
      setAwayScore(prediction.away_score.toString());
    }
  }, [prediction]);

  const payload: LaLigaPredictionPayload = {
    home_score: parseInt(homeScore, 10),
    away_score: parseInt(awayScore, 10),
    event_id: event.id,
    user_id: user ? user.id : '',
    event_name: event.hashtag,
  };

  const handleSavePrediction = async () => {
    if (user && isValidPrediction) {
      setIsSaving(true);
      try {
        await savePrediction(user, isValidPrediction, payload);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="match-info-container">
      <div className="text-center mb-4">
        <h1>Realiza la predicción para el siguiente partido</h1>
      </div>

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
      {!isInProgress ? (
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
      {!isInProgress && (
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
    </div>
  );
};

export default MatchInfo;
