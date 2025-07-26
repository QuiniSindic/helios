import { API_LOGO_COMPETITION_URL } from '@/core/config';
import { MatchData } from '@/types/custom.types';
import Image from 'next/image';

interface EventTeamsProps {
  event: MatchData;
  showScore?: boolean;
}

export default function EventTeamsData({
  event,
  showScore = false,
}: EventTeamsProps) {
  const resultParts = event.result.split(' - ');
  const hasResult = resultParts.length === 2;

  const homeScore = hasResult ? parseInt(resultParts[0], 10) : null;
  const awayScore = hasResult ? parseInt(resultParts[1], 10) : null;

  return (
    <>
      {/* Vista para PC (pantallas grandes) */}
      <div className="hidden sm:grid grid-cols-[1fr_40px_80px_40px_1fr] items-center mt-4">
        <span className="text-base font-medium text-right mt-2">
          {/* TODO: fix el name */}
          {event.homeTeam.name}
        </span>
        <Image
          src={
            `${API_LOGO_COMPETITION_URL}${event.homeTeam.img as string}` ||
            '/globe.svg'
          }
          alt={event.homeTeam.abbr}
          width={28}
          height={28}
          className="justify-self-end"
        />
        <div className="text-center">
          {/* TODO: fix la manera en que el back deveuelve el resultado */}
          {/* {showScore ? `${event.home_score} - ${event.away_score}` : 'vs'} */}
          {showScore ? `${event.result}` : 'vs'}
        </div>
        <Image
          src={
            `${API_LOGO_COMPETITION_URL}${event.awayTeam.img as string}` ||
            '/globe.svg'
          }
          alt={event.awayTeam.abbr}
          width={28}
          height={28}
          className=" justify-self-start"
        />
        <span className="text-base font-medium text-left mt-2">
          {event.awayTeam.name}
        </span>
      </div>

      {/* Vista para móvil */}
      <div className="sm:hidden w-2/3 grid grid-cols-[auto_1fr_auto] gap-x-2 gap-y-4 items-center mr-1 mt-4">
        {/* Fila del equipo local */}
        <Image
          src={
            `${API_LOGO_COMPETITION_URL}${event.homeTeam.img as string}` ||
            '/globe.svg'
          }
          alt={event.homeTeam.abbr}
          width={20}
          height={20}
          // className="w-6 h-6"
        />
        <span className="text-sm font-medium">{event.homeTeam.name}</span>
        <span className="text-sm font-medium text-right">
          {/* TODO: fix la manera en que el back deveuelve el resultado */}
          {showScore ? homeScore : ''}
        </span>

        {/* Fila del equipo visitante */}
        <Image
          src={
            `${API_LOGO_COMPETITION_URL}${event.awayTeam.img as string}` ||
            '/globe.svg'
          }
          alt={event.awayTeam.name}
          width={20}
          height={20}
          // className="w-6 h-6"
        />
        <span className="text-sm font-medium">{event.awayTeam.name}</span>
        <span className="text-sm font-medium text-right">
          {/* TODO: fix la manera en que el back deveuelve el resultado */}
          {showScore ? awayScore : ''}
        </span>
      </div>
    </>
  );
}
