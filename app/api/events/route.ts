import { parseEventDataToSave } from '@/services/events.service';
import { ParsedEvent } from '@/types/sofascoreTypes/parsedEvents.types';
import { parseFootballEventsByLeague } from '@/utils/sofascore/football.utils';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // const todayDate = new Date().toISOString().split('T')[0];

    const response = await fetch(
      'https://www.sofascore.com/api/v1/sport/football/scheduled-events/2025-03-09',
      {
        headers: {
          accept: '*/*',
          'accept-language': 'es-ES,es;q=0.9',
          baggage:
            'sentry-environment=production,sentry-release=7h7ehBAnU9zFgSM1qx8rU,sentry-public_key=d693747a6bb242d9bb9cf7069fb57988,sentry-trace_id=bf3bb03897a3442690d6a5708098b90f',
          'cache-control': 'max-age=0',
          priority: 'u=1, i',
          'sec-ch-ua':
            '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sentry-trace': 'bf3bb03897a3442690d6a5708098b90f-aa8674b56a545df0',
          'x-requested-with': '71c460',
          Referer: 'https://www.sofascore.com/es-la/',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
        },
        body: null,
        method: 'GET',
      },
    );
    console.log('response ==>', response);

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
