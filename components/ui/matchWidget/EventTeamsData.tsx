import { API_LOGO_COMPETITION_URL } from '@/core/config';
import { MatchData } from '@/types/events/events.types';
import { getTeamLogoSrc } from '@/utils/images.utils';
import TeamLogo from '../TeamLogo';

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
  const homeLogo = getTeamLogoSrc(API_LOGO_COMPETITION_URL, event.homeTeam.img);
  const awayScore = hasResult ? parseInt(resultParts[1], 10) : null;
  const awayLogo = getTeamLogoSrc(API_LOGO_COMPETITION_URL, event.awayTeam.img);

  return (
    <>
      {/* Vista para PC (pantallas grandes) */}
      <div className="hidden sm:grid grid-cols-[1fr_40px_80px_40px_1fr] items-center">
        <span className="text-base font-medium text-right mt-2">
          {event.homeTeam.name}
        </span>
        <TeamLogo
          src={homeLogo}
          alt={event.homeTeam.abbr}
          size={28}
          className="justify-self-end"
        />

        <div className="text-center">
          {showScore ? `${event.result}` : 'vs'}
        </div>

        <TeamLogo
          src={awayLogo}
          alt={event.awayTeam.abbr}
          size={28}
          className="justify-self-start"
        />
        <span className="text-base font-medium text-left mt-2">
          {event.awayTeam.name}
        </span>
      </div>

      {/* Vista para móvil */}
      <div className="sm:hidden w-2/3 grid grid-cols-[auto_1fr_auto] gap-x-2 gap-y-3 items-center mr-1">
        {/* Fila del equipo local */}
        <TeamLogo src={homeLogo} alt={event.homeTeam.abbr} size={20} />
        <span className="text-sm font-medium">{event.homeTeam.name}</span>
        <span className="text-sm font-medium text-right">
          {showScore ? homeScore : ''}
        </span>

        {/* Fila del equipo visitante */}
        <TeamLogo src={awayLogo} alt={event.awayTeam.abbr} size={20} />
        <span className="text-sm font-medium">{event.awayTeam.name}</span>
        <span className="text-sm font-medium text-right">
          {showScore ? awayScore : ''}
        </span>
      </div>
    </>
  );
}
