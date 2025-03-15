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
