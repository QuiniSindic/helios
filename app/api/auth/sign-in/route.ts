import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { user, session } = data;

  console.log('user =>', user);
  console.log('session =>', session);

  return NextResponse.json(
    {
      user,
      session,
    },
    { status: 200 },
  );
}
