import { API_LOGO_COMPETITION_URL } from '@/core/config';
import Image from 'next/image';

export default function TeamHeader({
  event,
}: {
  event: {
    homeTeam: { name: string; img: string };
    awayTeam: { name: string; img: string };
    id: number;
  };
}) {
  return (
    <div className="flex justify-around items-center w-full">
      <div className="flex flex-col items-center space-y-2">
        <Image
          src={
            `${API_LOGO_COMPETITION_URL}${event.homeTeam.img}` || '/globe.svg'
          }
          alt={event.homeTeam.name}
          width={64}
          height={64}
        />
        <h2
          className="text-center max-w-[120px] break-words"
          title={event.homeTeam.name}
        >
          {event.homeTeam.name}
        </h2>
      </div>

      <div className="text-lg opacity-70">vs</div>

      <div className="flex flex-col items-center space-y-2">
        <Image
          src={
            `${API_LOGO_COMPETITION_URL}${event.awayTeam.img}` || '/globe.svg'
          }
          alt={event.awayTeam.name}
          width={64}
          height={64}
        />
        <h2
          className="text-center max-w-[120px] break-words"
          title={event.awayTeam.name}
        >
          {event.awayTeam.name}
        </h2>
      </div>
    </div>
  );
}
