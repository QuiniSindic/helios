import {
  ParsedBasketballEvent,
  ParsedEvent,
  ParsedFootballEvent,
} from '@/utils/sofascore/types/parsedEvents.types';
import { leaguesMap, sportsMap } from '@/utils/types/sports.types';

export const sortEvents = (
  footballEvents: ParsedFootballEvent[],
  basketballEvents: ParsedBasketballEvent[],
): ParsedEvent[] => {
  if (footballEvents.length === 0 && basketballEvents.length === 0) {
    return [];
  }

  const todayEvents = [...footballEvents, ...basketballEvents];

  const sortedEvents = todayEvents.sort(
    (a, b) => a.startTimestamp - b.startTimestamp,
  );

  return sortedEvents;
};

export const filterEvents = (
  results: ParsedEvent[],
  selectedLeague: string | null,
  selectedSport: string | null,
) => {
  const filteredResults = results.filter((result) => {
    const translatedSport = selectedSport ? sportsMap[selectedSport] : null;
    const translatedLeague = selectedLeague ? leaguesMap[selectedLeague] : null;

    if (!selectedSport && !selectedLeague) return true; // si no hay deporte ni liga seleccionados, mostramos todos los eventos

    if (!selectedSport && selectedLeague) {
      // si no hay deporte seleccionado pero sí liga, mostramos todos los eventos de esa liga
      return result.tournament.name === translatedLeague;
    }

    if (selectedSport && !selectedLeague) {
      // si hay deporte seleccionado pero no liga, mostramos todos los eventos de ese deporte
      return result.tournament.category.sport.slug === translatedSport;
    }

    return (
      result.tournament.category.sport.slug === translatedSport &&
      result.tournament.uniqueTournament.name === translatedLeague
    );
  });

  return filteredResults;
};
