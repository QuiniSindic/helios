import { Events, FootballEvent } from '../types/event.types';
import { ParsedFootballEvent } from '../types/parsedEvents.types';

// Filtrar solo eventos de las 5 grandes ligas
export const parseFootballEventsByLeague = (
  eventsList: Events<FootballEvent>,
): ParsedFootballEvent[] => {
  return eventsList.events
    .filter((event) =>
      [8, 17, 23, 34, 35].includes(event.tournament?.uniqueTournament?.id),
    )
    .map((event) => ({
      id: event.id, // ID del partido
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
      status: event.status,
      startTimestamp: event.startTimestamp,
      round: event.roundInfo?.round,
      tournament: event.tournament,
    }));
};

// Filtrar solo eventos futuros (con timestamps correctos)
export const parseFootballEventsByDate = (
  eventsList: ParsedFootballEvent[],
) => {
  const now = Math.floor(Date.now() / 1000); // Convertir milisegundos a segundos

  return eventsList.filter((event) => event.startTimestamp > now);
};
