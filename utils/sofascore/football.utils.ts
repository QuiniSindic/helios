import { LOGOS_BUCKET_NAME, PROJECT_ID } from '@/core/config';
import { Events, FootballEvent } from '@/types/sofascoreTypes/event.types';
import { ParsedFootballEvent } from '@/types/sofascoreTypes/parsedEvents.types';

// Filtrar solo eventos de las 5 grandes ligas
export const parseFootballEventsByLeague = (
  eventsList: Events<FootballEvent>,
): ParsedFootballEvent[] => {
  return (
    eventsList.events
      // [
      //   1, 7, 8, 16, 17, 19, 21, 23, 34, 35, 54, 133, 213, 290, 329, 357, 384,
      //   436, 437, 465, 477, 679, 17015, 10783,
      // ].includes(event.tournament?.uniqueTournament?.id),
      .filter((event) =>
        [7, 8, 17, 23, 34, 35, 679].includes(
          event.tournament?.uniqueTournament?.id,
        ),
      )
      .map((event) => ({
        id: event.id, // ID del partido
        homeTeam: {
          ...event.homeTeam,
          // shield: `https://img.sofascore.com/api/v1/team/${event.homeTeam.id}/image`,
          shield: `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/${LOGOS_BUCKET_NAME}/teams/${event.homeTeam.id}.png`,
        },
        awayTeam: {
          ...event.awayTeam,
          // shield: `https://img.sofascore.com/api/v1/team/${event.awayTeam.id}/image`,
          shield: `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/${LOGOS_BUCKET_NAME}/teams/${event.awayTeam.id}.png`,
        },
        homeScore: event.homeScore,
        awayScore: event.awayScore,
        status: event.status,
        startTimestamp: event.startTimestamp,
        round: event.roundInfo?.round,
        tournament: event.tournament,
      }))
  );
};

// Filtrar solo eventos futuros (con timestamps correctos)
export const parseFootballEventsByDate = (
  eventsList: ParsedFootballEvent[],
) => {
  const now = Math.floor(Date.now() / 1000); // Convertir milisegundos a segundos

  return eventsList.filter((event) => event.startTimestamp > now);
};
