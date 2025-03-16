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
  isValidPrediction: boolean,
  matchPayload: LaLigaPredictionPayload,
) {
  if (!userLogged) {
    alert('Debes iniciar sesión para guardar una predicción.');
    return;
  }

  if (!isValidPrediction) {
    alert('Debes ingresar un resultado válido.');
    return;
  }

  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  const { user } = userData;

  if (!user) {
    throw new Error('No autorizado');
  }

  const { home_score, away_score, event_id, user_id, event_name } =
    matchPayload;

  // TODO: considerar upsert para poder updatear si el partido au nno ha empezado
  // verificar predicción ya existente
  const { data: existingPrediction, error: existingPredictionError } =
    await supabase
      .from('predictions')
      .select()
      .eq('event_id', event_id)
      .eq('profile_id', user_id);

  console.log('existingPrediction', existingPrediction);
  console.log('existingPredictionError', existingPredictionError);

  if (existingPredictionError) {
    throw new Error(existingPredictionError.message);
  }

  if (existingPrediction.length > 0) {
    console.log('Ya existe una predicción para este evento');
    return existingPrediction;
  }

  // insert en tabla
  const { data, error } = await supabase.from('predictions').insert([
    {
      event_id,
      profile_id: user_id,
      prediction: {
        home_score,
        away_score,
      },
      event_name: event_name,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
