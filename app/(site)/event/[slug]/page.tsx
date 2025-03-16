/* eslint-disable @typescript-eslint/no-unused-vars */
import MatchInfo from '@/components/event/MatchInfo';
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
    error,
  } = await supabase.auth.getUser();

  console.log('vercel url', process.env.VERCEL_URL);

  const res = await fetch(
    `https://${process.env.VERCEL_URL}/api/event/${slug}`,
  );

  console.log('res =>', res);
  const data = await res.json();
  const { match } = data;

  return (
    <>
      {user === null && (
        <div className="text-center bg-yellow-200 py-1">
          <h1>Debes iniciar sesión para poder guardar tus predicciones</h1>
        </div>
      )}
      <div className="p-4">
        {/* User: {user?.email || 'No user'} borrar */}
        <MatchInfo event={match} />
      </div>
    </>
  );
}
