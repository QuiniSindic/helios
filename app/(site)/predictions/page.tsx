export default async function PredictionsPage() {
  const data = await fetch(
    'https://www.sofascore.com/api/v1/sport/basketball/scheduled-events/2025-03-16',
    {
      headers: {
        accept: '*/*',
        'accept-language': 'es-ES,es;q=0.9',
        baggage:
          'sentry-environment=production,sentry-release=DNMBppMnuv4x_cnXcv9cL,sentry-public_key=d693747a6bb242d9bb9cf7069fb57988,sentry-trace_id=6c5c953c49cc474587e03d6879bae74d',
        'cache-control': 'max-age=0',
        priority: 'u=1, i',
        'sec-ch-ua':
          '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sentry-trace': '6c5c953c49cc474587e03d6879bae74d-965a3ed5904af649',
        'x-requested-with': '859655',
      },
      referrer: 'https://www.sofascore.com/es-la/baloncesto',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
    },
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
  //   const games = await data.json();
  return (
    <div>
      <h1>Predictions Page</h1>
      {/* {data.events[0].tournament.name} {''}*/}
      {data.events[0].homeTeam.name} vs {data.events[0].awayTeam.name} {''}
      {/* {data.events[0].homeScore.current} vs {data.events[0].awayScore.current}  */}
    </div>
  );
}
