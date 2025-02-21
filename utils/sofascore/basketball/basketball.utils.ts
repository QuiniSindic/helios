import { BasketballEvent, Events } from '../types/event.types';
import { ParsedBasketballEvent } from '../types/parsedEvents.types';

export const parsedBasketballEventsByLeague = (
  eventsList: Events<BasketballEvent>,
): ParsedBasketballEvent[] => {
  return eventsList.events
    .filter((event) =>
      [132, 138, 264, 276, 285, 396, 441, 875].includes(
        event.tournament?.uniqueTournament?.id,
      ),
    )
    .map((event) => ({
      id: event.id,
      homeTeam: {
        ...event.homeTeam,
        shield: `/nba-escudos/${event.homeTeam.id}.png`,
      },
      awayTeam: {
        ...event.awayTeam,
        shield: `/nba-escudos/${event.awayTeam.id}.png`,
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
  basketballEvents: ParsedBasketballEvent[],
) => {
  const now = Math.floor(Date.now() / 1000);

  return basketballEvents.filter((event) => event.startTimestamp > now);
};
