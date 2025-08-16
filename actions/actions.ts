'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

//TODO redo and move to auth service
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
