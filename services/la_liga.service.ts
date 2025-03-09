import { laLigaCrests } from '@/constants/normalizeLaLiga';
import { Gameweek, Match } from '@/types/la_liga/la_liga.types';

export const getCurrentGameweek = async () => {
  const response = await fetch(
    'https://apim.laliga.com/public-service/api/v1/subscriptions/laliga-easports-2024/current-gameweek?&contentLanguage=es&subscription-key=c13c3a8e2f6b46da9c5c425cf61fab3e',
  );

  if (!response.ok) {
    throw new Error('Error en el fetch');
  }

  const data: { gameweek: Gameweek } = await response.json();
  const { gameweek } = data;

  return gameweek;
};

export const normalizeTeamCrests = (matches: Match[]): Match[] => {
  return matches.map((match) => {
    return {
      ...match,
      home_team: {
        ...match.home_team,
        shield: {
          ...match.home_team.shield,
          url: laLigaCrests[match.home_team.nickname],
        },
      },
      away_team: {
        ...match.away_team,
        shield: {
          ...match.away_team.shield,
          url: laLigaCrests[match.away_team.nickname],
        },
      },
    };
  });
};
