/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from '@/utils/supabase/server';

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  // const { id } = await params;

  const {
    data: { user },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
  } = await supabase.auth.getUser();
  //   console.log('user =>', user);
  //   console.log('error =>', error);

  // const res = await fetch(`${baseUrl}/api/event/${id}`);
  // const data = await res.json();
  // const matchData: Match = data;
  // const event: MatchEvent = matchData.event;

  return (
    // <>
    //   {user === null && (
    //     <div className="text-center bg-yellow-200 py-1">
    //       <h1>Debes iniciar sesión para poder guardar tus predicciones</h1>
    //     </div>
    //   )}
    //   <div className="p-4">
    //     {/* User: {user?.email || 'No user'} borrar */}
    //     <MatchInfo event={event} />
    //   </div>
    // </>
    <>{user}</>
  );
}
