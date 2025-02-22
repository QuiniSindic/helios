import { getTodayBasketballEvents } from '@/services/basketball/basketballEvents';
import { parseEventDataToSave, sortEvents } from '@/services/events.service';
import { getTodayFootballEvents } from '@/services/football/footballEvents';
import { ParsedEvent } from '@/types/sofascoreTypes/parsedEvents.types';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
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

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const data = await req.json();
  const { sortedEvents } = data as { sortedEvents: ParsedEvent[] };

  const events = parseEventDataToSave(sortedEvents);

  // Inserta los eventos en la base de datos
  const { data: eventsData, error } = await supabase
    .from('events')
    .insert(events);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ eventsData }, { status: 200 });
}
