import {
  Score as BasketballScore,
  Periods,
} from "@/utils/sofascore/basketball/types/basketball.types";
import {
  Score as FootballScore,
  Status,
  Team,
} from "@/utils/sofascore/football/types/football.types";
import Image from "next/image";

interface ResultWidgetProps {
  event: {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    homeScore: FootballScore | BasketballScore;
    awayScore: FootballScore | BasketballScore;
    status: Status;
    startTimestamp: number;
    round: number | undefined;
    periods?: Periods;
  };
}

export default function ResultWidget({ event }: ResultWidgetProps) {
  return (
    <>
      {/* Vista para pc (pantallas grandes) */}
      <div className="hidden sm:grid grid-cols-[1fr_40px_80px_40px_1fr] items-center">
        <span className="text-base font-medium text-right mt-2">
          {/* {match.home_team.nickname} */}
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
          {event.homeScore.current} - {event.awayScore.current}
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

      {/* Vista para móviles (pantallas pequeñas) */}
      <div className="sm:hidden w-2/3 grid grid-cols-[auto_1fr_auto] gap-x-2 gap-y-4 items-center mr-1">
        {/* Equipo local */}
        <Image
          src={event.homeTeam.shield}
          alt={event.homeTeam.shortName}
          width={25}
          height={25}
          className="w-6 h-6"
        />
        <span className="text-sm font-medium">{event.homeTeam.name}</span>
        <span className="text-sm font-medium ">{event.homeScore.current}</span>

        {/* Equipo visitante */}
        <Image
          src={event.awayTeam.shield}
          alt={event.awayTeam.shortName}
          width={25}
          height={25}
          className="w-6 h-6"
        />
        <span className="text-sm font-medium">{event.awayTeam.name}</span>
        <span className="text-sm font-medium ">{event.awayScore.current}</span>
      </div>
    </>
  );
}
