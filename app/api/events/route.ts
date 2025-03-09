import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://apim.laliga.com/public-service/api/v1/teams?subscriptionSlug=laliga-easports-2024&limit=99&offset=0&orderField=nickname&orderType=ASC&contentLanguage=es&countryCode=GB&subscription-key=c13c3a8e2f6b46da9c5c425cf61fab3e',
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Error en el fetch' }, { status: 500 });
    }
    const data = await response.json();
    // console.log('data =>', data);
    const { total } = data;
    console.log('total de equipos en la liga =>', total);

    // const events: TheOddsEvent[] = data.data;

    // const normalizedEvents = normalizeTeams(events);
    // const eventsWithCrests = addCrests(normalizedEvents);

    return NextResponse.json({ team_number: total }, { status: 200 });

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
