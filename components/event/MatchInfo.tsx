'use client';

import { LOGOS_BUCKET_NAME, PROJECT_ID } from '@/core/config';
import { useAuth } from '@/hooks/useAuth';
import { MatchEvent } from '@/types/sofascoreTypes/match.types';
import Image from 'next/image';
import React from 'react';
import SaveButton from '../ui/SaveButton';
import ScoreInput from './ScoreInput';

interface MatchInfoProps {
  event: MatchEvent;
}

export default function MatchInfo({ event }: MatchInfoProps) {
  const { user } = useAuth();
  const isInProgress = event.status.type === 'inprogress';

  const [homeScore, setHomeScore] = React.useState('');
  const [awayScore, setAwayScore] = React.useState('');

  const handleSavePrediction = async () => {
    if (!user) {
      alert('Debes iniciar sesión para guardar una predicción.');
      return;
    }

    const prediction = {
      home_score: parseInt(homeScore, 10),
      away_score: parseInt(awayScore, 10),
      // winner: 'home',
      // draw: false,
      // overtime: false,
      // penalties: false,

      // TODO: revisar que campos mas se pueden agregar
    };

    // Enviar la predicción a través de un endpoint de la API
    const response = await fetch('/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_id: event.id,
        user_id: user.id,
        prediction,
      }),
    });

    const data = await response.json();
    console.log('data ==>', data);

    // if (result.error) {
    //   console.error('Error al guardar la predicción:', result.error);
    // } else {
    //   console.log('Predicción guardada correctamente:', result.data);
    // }
  };

  return (
    <>
      <div className="text-center mb-4">
        <h1>Realiza la predicción para el siguiente partido</h1>
      </div>

      {/* Sección de logos y nombres */}
      <div className="flex justify-around mb-2">
        <div className="flex flex-col items-center">
          <Image
            src={`https://${PROJECT_ID}.supabase.co/storage/v1/object/public/${LOGOS_BUCKET_NAME}/teams/${event.homeTeam.id}.png`}
            alt={event.homeTeam.name}
            width={64}
            height={64}
          />
          <h2
            className="text-center max-w-[100px] break-words mt-4"
            title={event.homeTeam.name}
          >
            {event.homeTeam.name}
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={`https://${PROJECT_ID}.supabase.co/storage/v1/object/public/${LOGOS_BUCKET_NAME}/teams/${event.awayTeam.id}.png`}
            alt={event.awayTeam.name}
            width={64}
            height={64}
          />
          <h2
            className="text-center max-w-[100px] break-words mt-4"
            title={event.awayTeam.name}
          >
            {event.awayTeam.name}
          </h2>
        </div>
      </div>

      {/* Sección de inputs o mensaje centrado */}
      {!isInProgress ? (
        <div className="flex justify-around mb-2">
          <ScoreInput value={homeScore} onChange={(val) => setHomeScore(val)} />
          <ScoreInput value={awayScore} onChange={(val) => setAwayScore(val)} />
        </div>
      ) : (
        <p className="text-center text-red-500 mt-2 mb-2">
          El partido está en juego
        </p>
      )}

      {/* Botón de guardar o compartir predicción */}
      {!isInProgress && (
        <div className="flex justify-center mt-6">
          {user === null ? (
            <SaveButton label="Compartir predicción" />
          ) : (
            <SaveButton
              label="Guardar predicción"
              onClick={handleSavePrediction}
            />
          )}
        </div>
      )}
    </>
  );
}
