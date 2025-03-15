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

export const normalizeTeamCrests = (
  matches: Match[] | Match,
): Match[] | Match => {
  // puede llegar un array de partidos o un solo partido

  // si llega array se devuele un array de partidos con los escudos actualizados
  if (Array.isArray(matches)) {
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
  }

  // si llega un solo partido se devuelve un solo partido con los escudos actualizados
  return {
    ...matches,
    home_team: {
      ...matches.home_team,
      shield: {
        ...matches.home_team.shield,
        url: laLigaCrests[matches.home_team.nickname],
      },
    },
    away_team: {
      ...matches.away_team,
      shield: {
        ...matches.away_team.shield,
        url: laLigaCrests[matches.away_team.nickname],
      },
    },
  };
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
