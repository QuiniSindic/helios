import MatchInfo from '@/components/event/MatchInfo';
import { getEventPredictions } from '@/services/database.service';
import { getMatchData } from '@/services/la_liga.service';
import { createClient } from '@/utils/supabase/server';

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const supabase = await createClient();
  const { slug } = await params;

  console.log('slug', slug);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const matchData = await getLaLigaMatch(slug);
  const matchData = await getMatchData(slug);
  console.log('matchData', matchData);
  const match = Array.isArray(matchData) ? matchData[0] : matchData;
  const predictions = await getEventPredictions(match.id);

  return (
    <div className="flex flex-col flex-grow">
      {user === null && (
        <div className="text-center bg-yellow-200 py-1">
          <h1>Debes iniciar sesión para poder guardar tus predicciones</h1>
        </div>
      )}
      <div className="p-4 flex-grow">
        <MatchInfo event={match} predictions={predictions} />
      </div>
    </div>
  );
}
