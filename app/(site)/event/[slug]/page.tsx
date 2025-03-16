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
    `https://apim.laliga.com/webview/api/web/matches/${slug}?contentLanguage=es&countryCode=GB&subscription-key=ee7fcd5c543f4485ba2a48856fc7ece9`,
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'es-ES,es;q=0.9',
        'ocp-apim-subscription-key': 'ee7fcd5c543f4485ba2a48856fc7ece9',
        priority: 'u=1, i',
        'sec-ch-ua':
          '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        Referer: 'https://www.laliga.com/',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body: null,
      method: 'GET',
    },
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
