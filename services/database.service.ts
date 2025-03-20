import { PredictionObject, UserProfile } from '@/types/database/table.types';
import { createClient } from '@/utils/supabase/client';

export async function getUserMatchPrediction(
  profileId: string,
  eventId: number,
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
  eventId: number,
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
