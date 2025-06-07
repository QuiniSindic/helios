// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@std/dotenv/load";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { calculatePoints, getEventPredictions, getLaLigaMatches, updateUserPoints } from '../services/la_liga.service.ts';

console.log("Hello from Functions!")

Deno.serve(async (req) => {


  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
  );

  const allMatches = await getLaLigaMatches();
  const matches = allMatches.filter(match => match.status === "FullTime" && !match.points_calculated);
  console.log('Matches:', matches);

  const competitionId = matches[0].subscription.id === 351 ? 1 : null;

  for (const match of matches) {
    const predictions = await getEventPredictions(supabaseClient, match.id);

    console.log('Predictions:', predictions.length);

    for (const prediction of predictions) {
      const points = calculatePoints(match, prediction);
      console.log('User:', prediction.profile_id, 'Prediction:', prediction.event_name, 'Points:', points);
      await updateUserPoints(supabaseClient, prediction.profile_id, competitionId, match.id, points);
    
    }
    match.points_calculated = true;
  }

  let ranking = null;
  if (competitionId) {
    const { data: rankingData, error: rankingError } = await supabaseClient
      .from('user_competition_points')
      .select('*, profiles (username)',)
      .eq('competition_id', competitionId)
      .order('total_points', { ascending: false });

    if (rankingError) {
      console.error('Error al obtener el ranking:', rankingError);
    }
    ranking = rankingData;
  }


  return new Response(
    JSON.stringify({ 
      message: "Puntos actualizados correctamente", 
      ranking 
    }),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/hello-world' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
