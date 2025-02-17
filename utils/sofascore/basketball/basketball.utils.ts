import {
  BasketballEvents,
  Periods,
  Score,
  Status,
  Team,
  Tournament,
} from "./types/basketball.types";

export const parsedBasketballEventsByLeague = (
  eventsList: BasketballEvents
) => {
  return eventsList.events
    .filter((event) =>
      [132, 138, 264, 276, 285, 396, 441, 875].includes(
        event.tournament?.uniqueTournament?.id
      )
    )
    .map((event) => ({
      id: event.id,
      homeTeam: {
        ...event.homeTeam,
        shield: `https://api.sofascore.app/api/v1/team/${event.homeTeam.id}/image`,
      },
      awayTeam: {
        ...event.awayTeam,
        shield: `https://api.sofascore.app/api/v1/team/${event.awayTeam.id}/image`,
      },
      homeScore: event.homeScore,
      awayScore: event.awayScore,
      startTimestamp: event.startTimestamp,
      status: event.status,
      periods: event.periods,
      tournament: event.tournament,
    }));
};

export const parseBasketballEventsByDate = (
  basketballEvents: {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    homeScore: Score;
    awayScore: Score;
    startTimestamp: number;
    periods: Periods;
    status: Status;
    tournament: Tournament;
  }[]
) => {
  const now = Math.floor(Date.now() / 1000);

  return basketballEvents.filter((event) => event.startTimestamp > now);
};
