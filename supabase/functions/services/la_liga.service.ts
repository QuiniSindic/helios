import { laLigaCrests } from '../types/constants.ts';
import { PredictionObject } from '../types/database.types.ts';
import { Gameweek, Match } from '../types/la_liga.types.ts';

import { SupabaseClient } from "jsr:@supabase/supabase-js@2";

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
        points_calculated: false,
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

export const getLaLigaMatches = async () => {
  const { week } = await getCurrentGameweek();

  const response = await fetch(
    `https://apim.laliga.com/webview/api/web/subscriptions/laliga-easports-2024/week/${week}/matches?contentLanguage=es&subscription-key=ee7fcd5c543f4485ba2a48856fc7ece9`,
  );

  if (!response.ok) {
    throw new Error('Error en el fetch');
  }

  const data = await response.json();
  const { matches } = data;

  const normalizedMatches = normalizeTeamCrests(matches);

  return normalizedMatches;
};

export const getLaLigaMatch = async (slug: string) => {
  const response = await fetch(
    `https://apim.laliga.com/webview/api/web/matches/${slug}?contentLanguage=es&countryCode=GB&subscription-key=ee7fcd5c543f4485ba2a48856fc7ece9`,
  );

  if (!response.ok) {
    throw new Error('Error en el fetch');
  }

  const data = await response.json();
  const match: Match = data.match;

  const normalizedMatch = normalizeTeamCrests(match);

  return normalizedMatch;
};

export async function getEventPredictions(
  supabase: SupabaseClient,
  eventId: number,
): Promise<PredictionObject[]> {
  
  const { data, error } = await supabase
    .from('predictions')
    .select()
    .eq('event_id', eventId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export function calculatePoints(match: Match, prediction: PredictionObject) {
  if (
    match.home_score === prediction.prediction.home_score &&
    match.away_score === prediction.prediction.away_score
  ) {
    return 5;
  }

  const matchWinner = (match.home_score! > match.away_score!)
    ? 'home'
    : (match.home_score! < match.away_score!)
      ? 'away'
      : 'draw';

  // console.log('matchWinner', matchWinner);

  const predictionWinner = (prediction.prediction.home_score > prediction.prediction.away_score)
    ? 'home'
    : (prediction.prediction.home_score < prediction.prediction.away_score)
      ? 'away'
      : 'draw';

  // console.log('predictionWinner', predictionWinner);

  if (matchWinner === predictionWinner) {
    return 2;
  }

  return 0;
}

export async function updateUserPoints(
  supabase: SupabaseClient,
  profileId: string,
  competitionId: number,
  eventId: number,
  points: number,
) {
  const { error: predictionError } = await supabase
    .from('predictions')
    .update({ points })
    .eq('profile_id', profileId)
    .eq('event_id', eventId)
    .eq('competition_id', competitionId)
    .select('*, profiles (username)')

  if (predictionError) {
    throw new Error(predictionError.message);
  }

  // Recupera los puntos actuales totales
  const { data: existingTotalPointsData, error: existingTotalPointsError } = await supabase
    .from('user_competition_points')
    .select('total_points')
    .eq('user_id', profileId)
    .eq('competition_id', competitionId)
    .maybeSingle();

  let totalPoints = points;

    if (existingTotalPointsData) {
      console.log('dentro');
      totalPoints += existingTotalPointsData.total_points;
    }

   // Inserta o actualiza puntos totales en user_competition_points
   const { data: totalPointsData, error: totalPointsError } = await supabase
   .from('user_competition_points')
   .upsert({
     user_id: profileId,
     competition_id: competitionId,
     total_points: totalPoints,
   },{
      ignoreDuplicates: false,
      onConflict: 'user_id, competition_id',
   })
    .select()

    console.log('totalPointsData', totalPointsData);
    
}