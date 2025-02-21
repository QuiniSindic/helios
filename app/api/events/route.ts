import { SOFASCORE_URL } from '@/core/config';
import { getTodayBasketballEvents } from '@/services/basketball/basketballEvents';
import { sortEvents } from '@/services/events.service';
import { getTodayFootballEvents } from '@/services/football/footballEvents';
import { Events, FootballEvent } from '@/utils/sofascore/types/event.types';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const todayDate = new Date().toISOString().split('T')[0];

    const response = await axios.get<Events<FootballEvent>>(
      `${SOFASCORE_URL}/sport/football/scheduled-events/${todayDate}`,
    );

    console.log('response =>', response);

    const footballEvents = await getTodayFootballEvents();
    const basketballEvents = await getTodayBasketballEvents();

    const sortedEvents = sortEvents(footballEvents, basketballEvents);

    if (sortedEvents.length === 0) {
      return NextResponse.json({ sortedEvents: [] }, { status: 200 });
    }

    return NextResponse.json({ sortedEvents }, { status: 200 });
  } catch (error) {
    console.log('error =>', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}
