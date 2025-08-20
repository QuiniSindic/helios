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

export const getUpcoming = async (sport?: string, competitionId?: number) => {
  const params = new URLSearchParams();
  if (sport) params.append('sport', sport);
  if (competitionId) params.append('competition', String(competitionId));

  const url = `${BACKEND_URL}/events/upcoming?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  //FIX tipado
  const sportsData = data.data;

  let matches: MatchData[] = [];

  if (sport && sportsData[sport]) {
    // si se seleccionó un deporte, solo devolvemos ese
    matches = sportsData[sport].matches;
  } else {
    // si no se seleccionó deporte, combinamos todos
    matches = Object.values(sportsData).flatMap(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (sportEntry: any) => sportEntry.matches || [],
    );
  }

  return matches;
};

export const getLive = async (sport?: string, competitionId?: number) => {
  const params = new URLSearchParams();
  if (sport) params.append('sport', sport);
  if (competitionId) params.append('competition', String(competitionId));

  const url = `${BACKEND_URL}/events/live?${params.toString()}`;

  const response = await fetch(url);
  console.log(response);

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  console.log('dat =>', data);

  //FIX tipado
  const sportsData = data.data;

  let matches: MatchData[] = [];

  if (sport && sportsData[sport]) {
    // si se seleccionó un deporte, solo devolvemos ese
    matches = sportsData[sport].matches;
  } else {
    // si no se seleccionó deporte, combinamos todos
    matches = Object.values(sportsData).flatMap(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (sportEntry: any) => sportEntry.matches || [],
    );
  }

  return matches;
};
