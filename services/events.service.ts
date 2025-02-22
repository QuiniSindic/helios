import {
  ParsedBasketballEvent,
  ParsedEvent,
  ParsedFootballEvent,
} from '@/types/sofascoreTypes/parsedEvents.types';
import { leaguesMap, sportsMap } from '@/types/sports.types';
import {
  getTodayBasketballEvents,
  getYesterdaysBasketballEvents,
} from './basketball/basketballEvents';
import {
  getTodayFootballEvents,
  getYesterdaysFootballEvents,
} from './football/footballEvents';

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

export const getTodayEvents = async () => {
  const footballEvents = await getTodayFootballEvents();
  const basketballEvents = await getTodayBasketballEvents();

  const sortedEvents = sortEvents(footballEvents, basketballEvents);

  if (sortedEvents.length === 0) {
    return { sortedEvents: [] };
  }

  return { sortedEvents };
};

export const getYesterdayEvents = async () => {
  const yesterdayFootballEvents = await getYesterdaysFootballEvents();
  const yesterdaysBasketballEvents = await getYesterdaysBasketballEvents();

  const sortedResults = sortEvents(
    yesterdayFootballEvents,
    yesterdaysBasketballEvents,
  );

  if (
    yesterdayFootballEvents.length === 0 &&
    yesterdaysBasketballEvents.length === 0
  ) {
    return { sortedResults: [] };
  }

  return { sortedResults };
};

export const parseEventDataToSave = (sortedEvents: ParsedEvent[]) => {
  return sortedEvents.map((event) => {
    return {
      competition_id: event.tournament.uniqueTournament.id,
      event_date: new Date(event.startTimestamp * 1000).toISOString(),
      status: event.status.type,
      extra_info: {
        homeTeam: event.homeTeam.name,
        awayTeam: event.awayTeam.name,
        competition_name: event.tournament.uniqueTournament.name,
      },
      sofascore_event_id: event.id,
    };
  });
};
