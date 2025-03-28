'use server';

import { LaLigaPredictionPayload } from '@/types/prediction.types';
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export async function handleGoogleSubmit() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `https://${process.env.VERCEL_URL}/home`,
    },
  });

  if (error) {
    console.error('error', error);
    return;
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function savePrediction(
  userLogged: User,
  matchPayload: LaLigaPredictionPayload,
) {
  if (!userLogged) {
    throw new Error('Debes iniciar sesión para guardar una predicción.');
  }
  
  const supabase = await createClient();

  const {
    home_score,
    away_score,
    event_id,
    user_id,
    event_name,
    competition_id,
    home_team,
    away_team,
  } = matchPayload;

  const { data, error } = await supabase
    .from('predictions')
    .upsert(
      {
        event_id,
        profile_id: user_id,
        prediction: {
          home_score,
          away_score,
          home_team,
          away_team,
        },
        event_name,
        competition_id,
        updated_at: new Date(),
      },
      {
        ignoreDuplicates: false,
        onConflict: 'event_id, profile_id',
      },
    )
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}