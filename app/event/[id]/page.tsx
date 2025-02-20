import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const supabase = await createClient();
  const { id } = params;

  const {
    data: { user },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
  } = await supabase.auth.getUser();
  //   console.log('user =>', user);
  //   console.log('error =>', error);

  const res = await fetch(`https://www.sofascore.com/api/v1/event/${id}`);
  const data = await res.json();

  //   console.log('data =>', data);

  return (
    <>
      {user === null && (
        <div className="text-center bg-yellow-200 py-1">
          <h1>Debes iniciar sesión para poder realizar una predicción</h1>
        </div>
      )}
      <div className="p-4">
        User: {user?.email || 'No user'} {/* borrar */}
        <div className="text-center mb-4">
          <h1>Realiza la predicción para el siguiente partido</h1>
        </div>
        <div className="flex justify-around gap-12">
          <div className="flex flex-col gap-3 items-center">
            <Image
              src={`https://api.sofascore.app/api/v1/team/${data.event.homeTeam.id}/image`}
              alt={data.event.homeTeam.name}
              width={50}
              height={500}
            />
            <h2>{data.event.homeTeam.name}</h2>
          </div>

          <div className="flex flex-col gap-3 items-center">
            <Image
              src={`https://api.sofascore.app/api/v1/team/${data.event.awayTeam.id}/image`}
              alt={data.event.homeTeam.name}
              width={50}
              height={500}
            />
            <h2>{data.event.awayTeam.name}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
