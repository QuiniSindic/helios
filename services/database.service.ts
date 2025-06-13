import { PredictionObject, UserProfile } from '@/types/database/table.types';
import { createClient } from '@/utils/supabase/client';

export async function getUserMatchPrediction(
  profileId: string,
  eventId: number | string,
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('predictions')
    .select()
    .eq('event_id', eventId)
    .eq('profile_id', profileId);

  if (error) {
    throw new Error(error.message);
  }

  if (data && data.length > 0) {
    return data[0].prediction;
  }

  return null;
}

export async function getAllPredictionsByEventId(eventId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('predictions')
    .select()
    .eq('event_id', eventId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllPredictions() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('predictions')
    .select('*, profiles (username)');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getEventPredictions(
  eventId: number | string,
): Promise<PredictionObject[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('predictions')
    .select()
    .eq('event_id', eventId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUserByProfileId(
  profileId: string,
): Promise<UserProfile[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('user_id', profileId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateUserPoints(
  profileId: string,
  competitionId: number,
  eventId: number,
  points: number,
) {
  const supabase = createClient();
  const { data: predictionData, error: predictionError } = await supabase
    .from('predictions')
    .update({ points })
    .eq('profile_id', profileId)
    .eq('event_id', eventId)
    .eq('competition_id', competitionId);

  if (predictionError) {
    throw new Error(predictionError.message);
  }

  const { data: totalPointsData, error: totalPointsError } = await supabase
  .from('user_competition_points')
  .update({ total_points: points })
  .eq('user_id', profileId)
  .eq('competition_id', competitionId);

  if (totalPointsError) {
    throw new Error(totalPointsError.message);
  }

  return { predictionData, totalPointsData };
}

export async function getLeaderboard(
  competitionId: number,
): Promise<UserProfile[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_competition_points')
    .select('*, profiles (username)')
    .eq('competition_id', competitionId)
    .order('total_points', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}