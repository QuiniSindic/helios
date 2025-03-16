export default async function PredictionsPage() {
  const data = await fetch(
    'https://www.sofascore.com/api/v1/sport/basketball/scheduled-events/2025-03-16',
  );
  const games = await data.json();
  console.log('games =>', games);
  return (
    <div>
      <h1>Predictions Page</h1>
      {games.events[0].tournament.name} {''}
      {games.events[0].homeTeam.name} vs {games.events[0].awayTeam.name} {''}
      {games.events[0].homeScore.current} vs {games.events[0].awayScore.current}
    </div>
  );
}
