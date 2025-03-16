import MatchInfo from '@/components/event/MatchInfo';
import { getLaLigaMatch } from '@/services/la_liga.service';
import { createClient } from '@/utils/supabase/server';

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const supabase = await createClient();
  const { slug } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // usar el servicio getLaLigaMatch
  const matchData = await getLaLigaMatch(slug);
  const match = Array.isArray(matchData) ? matchData[0] : matchData;

  return (
    <>
      {user === null && (
        <div className="text-center bg-yellow-200 py-1">
          <h1>Debes iniciar sesión para poder guardar tus predicciones</h1>
        </div>
      )}
      <div className="p-4">
        <MatchInfo event={match} />
      </div>
    </>
  );
}
