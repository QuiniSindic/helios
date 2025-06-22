import {
  laLigaCrests,
  livescoreLaLigaTeamsNormalized,
} from '@/constants/normalizeLaLiga';
import { BACKEND_URL } from '@/core/config';
import { CompetitionData, MatchData } from '@/types/custom.types';
import { parseKickoff } from '@/utils/date.utils';

export const getMatches = async (): Promise<MatchData[]> => {
  // FIX Porque hace 4 requests
  // FIX filtrado de eventos por comeptición
  // if (!selectedSport || !selectedLeague) {
  //   return [];
  // }

  // const sportSlug = sportsMap[selectedSport as keyof typeof sportsMap];
  // const leagueSlug = leaguesMap[selectedLeague as keyof typeof leaguesMap];

  // const matchesResponse: CompetitionData[] = await filterMatches(
  //   sportSlug,
  //   leagueSlug,
  // );

  // console.log('matchesResponse', matchesResponse);

  const response = await fetch(`${BACKEND_URL}/football/matches`);
  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  const competitions: CompetitionData[] = data?.data;
  const allMatches = competitions.flatMap((competition) =>
    competition.matches.map((match) => ({
      ...match,
      competition_id: competition.id,
      competition_full_name: competition.fullName ?? competition.name,
    })),
  );
  const events = allMatches
    .sort(
      (a, b) =>
        parseKickoff(a.kickoff).getTime() - parseKickoff(b.kickoff).getTime(),
    )

    .filter((match: MatchData) => {
      return match.status === 'NS' || match.status !== 'FT';
    });

  // escudos OK
  const normalizedMatches = normalizeTeamCrestsV2(events);

  return normalizedMatches as MatchData[];
};

export const getMatchData = async (id: string): Promise<MatchData> => {
  const response = await fetch(`${BACKEND_URL}/football/match/${id}`);
  const data = await response.json();

  if (!data.ok) {
    throw new Error(data.error || 'Error fetching match data');
  }

  const matchData: MatchData = data.data;

  return matchData;
};

export const normalizeTeamCrestsV2 = (
  matches: MatchData[] | MatchData,
): MatchData[] | MatchData => {
  if (Array.isArray(matches)) {
    return matches.map((match) => {
      return {
        ...match,
        away: {
          ...match.away,
          img: laLigaCrests[livescoreLaLigaTeamsNormalized[match.away.name]],
        },
        home: {
          ...match.home,
          img: laLigaCrests[livescoreLaLigaTeamsNormalized[match.home.name]],
        },
      };
    });
  }

  return {
    ...matches,
    away: {
      ...matches.away,
      img: laLigaCrests[livescoreLaLigaTeamsNormalized[matches.away.name]],
    },
    home: {
      ...matches.home,
      img: laLigaCrests[livescoreLaLigaTeamsNormalized[matches.home.name]],
    },
  };
};

export const filterMatches = async (sportSlug: string, leagueSlug: string) => {
  switch (sportSlug) {
    case 'football':
      switch (leagueSlug) {
        case 'club-worldcup':
          const response = await fetch(
            `${BACKEND_URL}/${sportSlug}/matches/${leagueSlug}`,
          );
          return response.json();
        case 'la-liga-hypermotion':
          const laLigaHypermotionResponse = await fetch(
            `${BACKEND_URL}/${sportSlug}/matches/${leagueSlug}`,
          );
          return laLigaHypermotionResponse.json();
        default:
          return [];
      }

    case 'basketball':
      return []; // TODO: Implementar la lógica para baloncesto
    case 'tennis':
      return []; // TODO: Implementar la lógica para tenis
    case 'motor':
      return []; // TODO: Implementar la lógica para motor
    default:
      return [];
  }
};

// export const filterEvents = (
//   results: ParsedEvent[],
//   selectedLeague: string | null,
//   selectedSport: string | null,
// ) => {
//   const filteredResults = results.filter((result) => {
//     const translatedSport = selectedSport ? sportsMap[selectedSport] : null;
//     const translatedLeague = selectedLeague ? leaguesMap[selectedLeague] : null;

//     if (!selectedSport && !selectedLeague) return true; // si no hay deporte ni liga seleccionados, mostramos todos los eventos

//     if (!selectedSport && selectedLeague) {
//       // si no hay deporte seleccionado pero sí liga, mostramos todos los eventos de esa liga
//       return result.tournament.name === translatedLeague;
//     }

//     if (selectedSport && !selectedLeague) {
//       // si hay deporte seleccionado pero no liga, mostramos todos los eventos de ese deporte
//       return result.tournament.category.sport.slug === translatedSport;
//     }

//     return (
//       result.tournament.category.sport.slug === translatedSport &&
//       result.tournament.uniqueTournament.name === translatedLeague
//     );
//   });

//   return filteredResults;
// };
