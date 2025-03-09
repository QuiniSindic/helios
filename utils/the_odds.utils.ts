import {
  laLigaCrests,
  laLigaNormalized,
  laLigaTeamsNormalized,
} from '@/constants/normalizeLaLiga';
import { Event, TheOddsEvent } from '@/types/the_odds/the_odds.types';

export const normalizeTeams = (events: TheOddsEvent[]) => {
  return events.map((event: TheOddsEvent) => ({
    ...event,
    sport_key: laLigaNormalized[event.sport_key],
    home_team: laLigaTeamsNormalized[event.home_team],
    away_team: laLigaTeamsNormalized[event.away_team],
  }));
};

export const addCrests = (events: TheOddsEvent[]): Event[] => {
  return events.map((event: TheOddsEvent) => ({
    ...event,
    home_team: {
      name: event.home_team,
      logo: laLigaCrests[event.home_team] || '',
    },
    away_team: {
      name: event.away_team,
      logo: laLigaCrests[event.away_team] || '',
    },
  }));
};
