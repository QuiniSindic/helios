import { THE_ODDS_API_KEY, THE_ODDS_API_URL } from '@/core/config';
import { TheOddsEvent } from '@/types/the_odds/the_odds.types';
import { addCrests, normalizeTeams } from '@/utils/the_odds.utils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      `${THE_ODDS_API_URL}/sports/soccer_spain_la_liga/events?apiKey=${THE_ODDS_API_KEY}`,
    );

    const data = await response.json();
    const events: TheOddsEvent[] = data.data;

    const normalizedEvents = normalizeTeams(events);
    const eventsWithCrests = addCrests(normalizedEvents);

    return NextResponse.json({ events: eventsWithCrests }, { status: 200 });

    return;
  } catch (error) {
    console.log('error =>', error);
    console.log({ error });
    return NextResponse.json(
      { error: 'Error fetching events' },
      { status: 500 },
    );
  }
}
