import MatchInfo from '@/components/event/MatchInfo';
import { getEventPredictions } from '@/services/database.service';
import { getMatchData } from '@/services/matches.service';
import { createClient } from '@/utils/supabase/server';

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const supabase = await createClient();
  const { slug } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const matchData = await getMatchData(slug);
  const match = Array.isArray(matchData) ? matchData[0] : matchData; // TODO: Check si se puede quitar
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
