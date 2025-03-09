import { Event } from '@/types/the_odds/the_odds.types';
import Image from 'next/image';

interface EventTeamsProps {
  event: Event;
  showScore?: boolean;
}

export default function EventTeamsData({
  event,
  showScore = false,
}: EventTeamsProps) {
  return (
    <>
      {/* Vista para PC (pantallas grandes) */}
      <div className="hidden sm:grid grid-cols-[1fr_40px_80px_40px_1fr] items-center mt-4">
        <span className="text-base font-medium text-right mt-2">
          {event.home_team.name}
        </span>
        <Image
          src={event.home_team.logo}
          alt={event.home_team.name}
          width={25}
          height={25}
          className="w-8 h-8 justify-self-end"
        />
        <div className="text-center">
          {showScore
            ? `${event.homeScore?.current} - ${event.awayScore?.current}`
            : 'vs'}
        </div>
        <Image
          src={event.away_team.logo}
          alt={event.away_team.name}
          width={25}
          height={25}
          className="w-8 h-8 justify-self-start"
        />
        <span className="text-base font-medium text-left mt-2">
          {event.away_team.name}
        </span>
      </div>

      {/* Vista para móvil */}
      <div className="sm:hidden w-2/3 grid grid-cols-[auto_1fr_auto] gap-x-2 gap-y-4 items-center mr-1 mt-4">
        {/* Fila del equipo local */}
        <Image
          src={event.home_team.logo}
          alt={event.home_team.name}
          width={25}
          height={25}
          className="w-6 h-6"
        />
        <span className="text-sm font-medium">{event.home_team.name}</span>
        <span className="text-sm font-medium text-right">
          {showScore ? event.homeScore?.current : ''}
        </span>

        {/* Fila del equipo visitante */}
        <Image
          src={event.away_team.logo}
          alt={event.away_team.name}
          width={25}
          height={25}
          className="w-6 h-6"
        />
        <span className="text-sm font-medium">{event.away_team.name}</span>
        <span className="text-sm font-medium text-right">
          {showScore ? event.awayScore?.current : ''}
        </span>
      </div>
    </>
  );
}
