/* eslint-disable @typescript-eslint/no-unused-vars */
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
    error,
  } = await supabase.auth.getUser();

  // usar el servicio getLaLigaMatch
  const matchData = await getLaLigaMatch(slug);
  const match = Array.isArray(matchData) ? matchData[0] : matchData;

  // console.log('vercel url', process.env.VERCEL_URL);

  // const res = await fetch(
  //   `https://apim.laliga.com/webview/api/web/matches/${slug}?contentLanguage=es&countryCode=GB&subscription-key=ee7fcd5c543f4485ba2a48856fc7ece9`,
  // );

  // console.log('res =>', res);
  // const data = await res.json();
  // const { match } = data;

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
