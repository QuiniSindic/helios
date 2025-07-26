import { leaguesMap, sportsMap } from '@/constants/mappers';
import { BACKEND_URL } from '@/core/config';
import { CompetitionData, MatchData } from '@/types/custom.types';
import { parseKickoff } from '@/utils/date.utils';

export const getMatches = async ({
  selectedSport,
  selectedLeague,
}: {
  selectedSport: string;
  selectedLeague: string;
}): Promise<MatchData[]> => {
  // FIX Porque hace 4 requests

  const sportSlug = sportsMap[selectedSport as keyof typeof sportsMap];
  const leagueSlug = leaguesMap[selectedLeague as keyof typeof leaguesMap];

  const url =
    !sportSlug && !leagueSlug
      ? `${BACKEND_URL}/events/upcoming`
      : // aqui se debe filtar por deporte y liga para escoger bien la url de la request
        // por el momento se hace request a football
        `${BACKEND_URL}/football/matches`;
  // : `${BACKEND_URL}/football/matches?sport=${sportSlug}&league=${leagueSlug}`;

  const response = await fetch(url);
  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  console.log('data', data);
  const competitions: CompetitionData[] = data; //data?.data;
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

  return events;
};

export const getMatchData = async (id: number): Promise<MatchData> => {
  const response = await fetch(`${BACKEND_URL}/football/match/${id}`);
  const data = await response.json();

  console.log('getMatchData response', data);

  if (!data.ok) {
    throw new Error(data.error || 'Error fetching match data');
  }

  const matchData: MatchData = data.data;

  return matchData;
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

export const getUpcoming = async () => {
  const url = `${BACKEND_URL}/football/upcoming`;

  const response = await fetch(url);
  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  return data;
};
