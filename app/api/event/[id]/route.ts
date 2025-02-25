import { Match } from '@/types/sofascoreTypes/match.types';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

async function getEventById(id: string) {
  const res = await axios.get<Match>(
    `https://api.sofascore.app/api/v1/event/${id}`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
        // cors: 'no-cors',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      },
    },
    // https://www.sofascore.com/api/v1/event/{id}
  );
  const data = res.data;
  console.log('data =>', data);

  return data;
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    console.log('id =>', id);

    const res = await getEventById(id as string);
    console.log('res =>', res);

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
