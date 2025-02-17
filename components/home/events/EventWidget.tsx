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

interface EventWidgetProps {
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

export default function EventWidget({ event }: EventWidgetProps) {
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
        <div className="text-center">vs</div>
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
      <div className="flex flex-col sm:hidden gap-4">
        <div className="flex items-center gap-2">
          <Image
            src={event.homeTeam.shield}
            alt={event.homeTeam.shortName}
            width={25}
            height={25}
            className="w-6 h-6"
          />
          <span className="text-sm font-medium">{event.homeTeam.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={event.awayTeam.shield}
            alt={event.awayTeam.shortName}
            width={25}
            height={25}
            className="w-6 h-6"
          />
          <span className="text-sm font-medium">{event.awayTeam.name}</span>
        </div>
      </div>
    </>
  );
}
