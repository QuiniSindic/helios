import { Match } from '@/types/sofascoreTypes/match.types';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

async function getEventById(id: string) {
  const res = await axios.get<Match>(
    `https://api.sofascore.app/api/v1/event/${id}`,
    // https://www.sofascore.com/api/v1/event/{id}
  );
  const data = res.data;

  return data;
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    const res = await getEventById(id as string);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log('error =>', error);
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response('Unknown error', { status: 500 });
    }
  }
}
