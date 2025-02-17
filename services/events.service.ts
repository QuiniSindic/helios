import {
  Score as BasketballScore,
  Periods,
} from "@/utils/sofascore/basketball/types/basketball.types";
import {
  Score as FootballScore,
  Status,
  Team,
} from "@/utils/sofascore/football/types/football.types";

export const sortEvents = async (
  footballEvents: {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    homeScore: FootballScore;
    awayScore: FootballScore;
    status: Status;
    startTimestamp: number;
    round: number | undefined;
  }[],
  basketballEvents: {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    homeScore: BasketballScore;
    awayScore: BasketballScore;
    startTimestamp: number;
    periods: Periods;
  }[]
) => {
  if (footballEvents.length === 0 && basketballEvents.length === 0) {
    return [];
  }

  const todayEvents = [...footballEvents, ...basketballEvents];

  const sortedEvents = todayEvents.sort(
    (a, b) => a.startTimestamp - b.startTimestamp
  );

  return sortedEvents;
};
