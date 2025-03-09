import { parseEventDataToSave } from '@/services/events.service';
import { ParsedEvent } from '@/types/sofascoreTypes/parsedEvents.types';
import { parseFootballEventsByLeague } from '@/utils/sofascore/football.utils';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const todayDate = new Date().toISOString().split('T')[0];

    const response = await fetch(
      `https://www.sofascore.com/api/v1/sport/football/scheduled-events/${todayDate}`,
    );

    if (!response.ok) {
      throw new Error('Error al obtener los eventos de hoy');
    }

    // Extraemos la data de la API correctamente
    const eventsData = await response.json();
    console.log('Eventos de hoy:', eventsData);
    const parsedEventsByLeague = parseFootballEventsByLeague(eventsData);
    const sortedEvents = parsedEventsByLeague.sort(
      (a, b) => a.startTimestamp - b.startTimestamp,
    );

    // const footballEvents = await getTodayFootballEvents();
    // const basketballEvents = await getTodayBasketballEvents();
    // console.log('footballEvents ==>', footballEvents);
    // console.log('basketballEvents ==>', basketballEvents);

    // const sortedEvents = sortEvents(footballEvents, basketballEvents);

    // if (sortedEvents.length === 0) {
    //   return NextResponse.json({ sortedEvents: [] }, { status: 200 });
    // }

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
