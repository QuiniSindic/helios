import {
  getCurrentGameweek,
  normalizeTeamCrests,
} from '@/services/la_liga.service';
import { Matches } from '@/types/la_liga/la_liga.types';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { week } = await getCurrentGameweek();

    const response = await fetch(
      `https://apim.laliga.com/webview/api/web/subscriptions/laliga-easports-2024/week/${week}/matches?contentLanguage=es&subscription-key=ee7fcd5c543f4485ba2a48856fc7ece9`,
    );

    if (!response.ok) {
      throw new Error('Error en el fetch');
    }

    const data = await response.json();
    const { matches }: Matches = data;

    const normalizedMatches = normalizeTeamCrests(matches);

    return NextResponse.json({ matches: normalizedMatches }, { status: 200 });
  } catch (error) {
    console.log('error =>', error);
    console.log({ error });
    return NextResponse.json(
      { error: 'Error fetching events' },
      { status: 500 },
    );
  }
}
