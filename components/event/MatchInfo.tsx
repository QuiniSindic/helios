import { MatchEvent } from '@/types/sofascoreTypes/match.types';
import Image from 'next/image';
import SaveButton from '../ui/SaveButton';
import ScoreInput from './ScoreInput';

interface MatchInfoProps {
  event: MatchEvent;
}

export default function MatchInfo({ event }: MatchInfoProps) {
  return (
    <>
      <div className="text-center mb-4">
        <h1>Realiza la predicción para el siguiente partido</h1>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-around mb-6">
          {/* Columna del equipo local */}
          <div className="flex flex-col items-center min-h-[140px] justify-between">
            <div className="flex flex-col items-center gap-1">
              <Image
                src={`https://api.sofascore.app/api/v1/team/${event.homeTeam.id}/image`}
                alt={event.homeTeam.name}
                width={64}
                height={64}
              />
              <h2
                className="text-center max-w-[100px] break-words"
                title={event.homeTeam.name}
              >
                {event.homeTeam.name}
              </h2>
            </div>
            <ScoreInput />
          </div>

          {/* Columna del equipo visitante */}
          <div className="flex flex-col items-center min-h-[140px] justify-between">
            <div className="flex flex-col items-center gap-1">
              <Image
                src={`https://api.sofascore.app/api/v1/team/${event.awayTeam.id}/image`}
                alt={event.awayTeam.name}
                width={64}
                height={64}
              />
              <h2
                className="text-center max-w-[100px] break-words"
                title={event.awayTeam.name}
              >
                {event.awayTeam.name}
              </h2>
            </div>
            <ScoreInput />
          </div>
        </div>
        <div className="flex justify-center">
          <SaveButton label="Guardar predicción" />
        </div>
      </div>
    </>
  );
}
