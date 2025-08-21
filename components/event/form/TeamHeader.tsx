import { API_LOGO_COMPETITION_URL } from '@/core/config';
import { MatchData } from '@/types/custom.types';
import Image from 'next/image';

interface TeamHeaderProps {
  event: MatchData;
}

export default function TeamHeader({ event }: TeamHeaderProps) {
  return (
    <div className="flex justify-around items-center w-full">
      <div className="flex flex-col items-center space-y-2">
        <Image
          src={
            `${API_LOGO_COMPETITION_URL}${event.homeTeam.img}` || '/globe.svg'
          }
          alt={event.homeTeam.name}
          width={64}
          height={64}
        />
        <h2
          className="text-center max-w-[120px] break-words"
          title={event.homeTeam.name}
        >
          {event.homeTeam.name}
        </h2>
      </div>

      {/* CHECK Fer un pensament sobre esto */}
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-400">Marcador</span>
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold opacity-90">
          {event.result ? event.result : 'vs'}
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <Image
          src={
            `${API_LOGO_COMPETITION_URL}${event.awayTeam.img}` || '/globe.svg'
          }
          alt={event.awayTeam.name}
          width={64}
          height={64}
        />
        <h2
          className="text-center max-w-[120px] break-words"
          title={event.awayTeam.name}
        >
          {event.awayTeam.name}
        </h2>
      </div>
    </div>
  );
}
