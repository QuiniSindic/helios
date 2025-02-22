import MatchInfo from '@/components/event/MatchInfo';
import { baseUrl } from '@/core/config';
import { Match, MatchEvent } from '@/types/sofascoreTypes/match.types';
import { createClient } from '@/utils/supabase/server';

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  const {
    data: { user },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
  } = await supabase.auth.getUser();
  //   console.log('user =>', user);
  //   console.log('error =>', error);

  console.log('url', `${baseUrl}/api/event/${id}`);

  const res = await fetch(`${baseUrl}/api/event/${id}`);
  console.log('res', res);
  const data = await res.json();
  console.log('data', data);
  const matchData: Match = data;
  console.log('matchData', matchData);
  const event: MatchEvent = matchData.event;

  return (
    <>
      {user === null && (
        <div className="text-center bg-yellow-200 py-1">
          <h1>Debes iniciar sesión para poder guardar tus predicciones</h1>
        </div>
      )}
      <div className="p-4">
        {/* User: {user?.email || 'No user'} borrar */}
        <MatchInfo event={event} />
      </div>
    </>
  );
}
