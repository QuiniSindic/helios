import MatchInfo from '@/components/event/MatchInfo';
import { BACKEND_URL } from '@/core/config';
import { getMatchData } from '@/services/matches.service';
import { getEventPredictions } from '@/services/predictions.service';
import { cookies } from 'next/headers';

async function getServerUser() {
  const jar = await cookies();

  const parts: string[] = [];
  const access = jar.get('access_token')?.value;
  if (access) parts.push(`access_token=${access}`);
  const refresh = jar.get('refresh_token')?.value;
  if (refresh) parts.push(`refresh_token=${refresh}`);

  const cookieHeader = parts.join('; ');

  if (!cookieHeader) return null;

  const res = await fetch(`${BACKEND_URL}/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: 'no-store',
  });

  if (res.status === 204) return null;
  const json = await res.json().catch(() => null);

  return json?.ok ? json.data : null;
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  const user = await getServerUser();

  const matchData = await getMatchData(slug);
  const match = Array.isArray(matchData) ? matchData[0] : matchData; // TODO: Check si se puede quitar
  const predictions = await getEventPredictions(match.id);

  return (
    <div className="flex flex-col flex-grow">
      {user === null && (
        <div className="text-center bg-yellow-200 py-1 dark:text-black">
          <h1>Debes iniciar sesión para poder guardar tus predicciones</h1>
        </div>
      )}
      <div className="p-2 flex-grow">
        <MatchInfo event={match} predictions={predictions} />
      </div>
    </div>
  );
}
