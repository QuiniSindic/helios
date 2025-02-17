import {
  Score as BasketballScore,
  Tournament as BasketballTournament,
  Periods,
} from "@/utils/sofascore/basketball/types/basketball.types";
import {
  Score as FootballScore,
  Tournament as FootballTournament,
  Status,
  Team,
} from "@/utils/sofascore/football/types/football.types";
import Image from "next/image";

interface EventResultWidgetProps {
  event: {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    homeScore?: FootballScore | BasketballScore;
    awayScore?: FootballScore | BasketballScore;
    status?: Status;
    startTimestamp: number;
    round?: number;
    periods?: Periods;
    tournament?: FootballTournament | BasketballTournament;
  };
  showScore?: boolean;
}

export default function EventResultWidget({
  event,
  showScore = false,
}: EventResultWidgetProps) {
  return (
    <>
      {/* Vista para PC (pantallas grandes) */}
      <div className="hidden sm:grid grid-cols-[1fr_40px_80px_40px_1fr] items-center">
        <span className="text-base font-medium text-right mt-2">
          {event.homeTeam.name}
        </span>
        <Image
          src={event.homeTeam.shield}
          alt={event.homeTeam.shortName}
          width={25}
          height={25}
          className="w-8 h-8 justify-self-end"
        />
        <div className="text-center">
          {showScore
            ? `${event.homeScore?.current} - ${event.awayScore?.current}`
            : "vs"}
        </div>
        <Image
          src={event.awayTeam.shield}
          alt={event.awayTeam.shortName}
          width={25}
          height={25}
          className="w-8 h-8 justify-self-start"
        />
        <span className="text-base font-medium text-left mt-2">
          {event.awayTeam.name}
        </span>
      </div>

      {/* Vista para móvil */}
      <div className="sm:hidden w-2/3 grid grid-cols-[auto_1fr_auto] gap-x-2 gap-y-4 items-center mr-1">
        {/* Fila del equipo local */}
        <Image
          src={event.homeTeam.shield}
          alt={event.homeTeam.shortName}
          width={25}
          height={25}
          className="w-6 h-6"
        />
        <span className="text-sm font-medium">{event.homeTeam.name}</span>
        <span className="text-sm font-medium text-right">
          {showScore ? event.homeScore?.current : ""}
        </span>

        {/* Fila del equipo visitante */}
        <Image
          src={event.awayTeam.shield}
          alt={event.awayTeam.shortName}
          width={25}
          height={25}
          className="w-6 h-6"
        />
        <span className="text-sm font-medium">{event.awayTeam.name}</span>
        <span className="text-sm font-medium text-right">
          {showScore ? event.awayScore?.current : ""}
        </span>
      </div>
    </>
  );
}
