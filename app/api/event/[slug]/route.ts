import { normalizeTeamCrests } from '@/services/la_liga.service';
import { Match } from '@/types/la_liga/la_liga.types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    console.log('estamos dentro ok');

    // const response = await fetch(
    //   `https://apim.laliga.com/webview/api/web/matches/${slug}?contentLanguage=es&countryCode=ES&subscription-key=ee7fcd5c543f4485ba2a48856fc7ece9`,
    // );

    const response = await fetch(
      `https://apim.laliga.com/webview/api/web/matches/${slug}?contentLanguage=es&countryCode=GB&subscription-key=ee7fcd5c543f4485ba2a48856fc7ece9`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-language': 'es-ES,es;q=0.9',
          'ocp-apim-subscription-key': 'ee7fcd5c543f4485ba2a48856fc7ece9',
          priority: 'u=1, i',
          'sec-ch-ua':
            '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          Referer: 'https://www.laliga.com/',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: null,
        method: 'GET',
      },
    );

    console.log('response =>', response);

    if (!response.ok) {
      throw new Error('Error en el fetch');
    }

    const data = await response.json();
    console.log('data =>', data);
    const match: Match = data.match;

    const normalizedMatch = normalizeTeamCrests(match);

    return NextResponse.json({ match: normalizedMatch }, { status: 200 });
  } catch (error) {
    console.log('error =>', error);
    console.log({ error });
    return NextResponse.json(
      { error: 'Error fetching events' },
      { status: 500 },
    );
  }
}
