import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { event_id, user_id, prediction } = await req.json();

  // Obtén el usuario autenticado (esto puede variar según tu implementación de autenticación)
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 });
  }

  const { user } = userData;

  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  // Inserta la predicción en la tabla "predictions"
  const { data, error } = await supabase.from('predictions').insert([
    {
      event_id,
      profile_id: user_id,
      prediction,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
