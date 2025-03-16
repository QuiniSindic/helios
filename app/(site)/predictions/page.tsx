export default async function PredictionsPage() {
  const data = await fetch(
    'https://www.sofascore.com/api/v1/sport/basketball/scheduled-events/2025-03-16',
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
  //   const games = await data.json();
  //   console.log('games =>', games);
  return (
    <div>
      <h1>Predictions Page</h1>
      {data.events[0].tournament.name} {''}
      {data.events[0].homeTeam.name} vs {data.events[0].awayTeam.name} {''}
      {data.events[0].homeScore.current} vs {data.events[0].awayScore.current}
    </div>
  );
}
