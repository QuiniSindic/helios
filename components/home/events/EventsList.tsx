'use client';

import MatchWidget from '@/components/ui/matchWidget/MatchWidget';
import { useLaLigaMatchesStore } from '@/store/laLigaMatchesStore';
import { Match } from '@/types/la_liga/la_liga.types';
import Link from 'next/link';

interface EventsListProps {
  full?: boolean;
}

export default function EventsList({ full = false }: EventsListProps) {
  const { events } = useLaLigaMatchesStore();
  const eventsToPlay = events.filter(
    (event: Match) =>
      event.status === 'PreMatch' ||
      event.status === 'FirstHalf' ||
      event.status === 'HalfTime' ||
      event.status === 'SecondHalf',
  );

  const displayedEvents = full ? eventsToPlay : eventsToPlay.slice(0, 6);

  return (
    <div className="bg-white dark:bg-[#272727] rounded-lg mb-4 cursor-pointer">
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No hay eventos para hoy.</p>
      ) : (
        <>
          {displayedEvents.map((event) => {
            const status = event.status;
            const isLive =
              status !== 'PreMatch' &&
              status !== 'FullTime' &&
              status !== 'Canceled';
            return (
              <Link href={`/event/${event.slug}`} key={event.id}>
                <MatchWidget event={event} isLive={isLive} />
              </Link>
            );
          })}
          {!full && events.length > 6 && (
            <div className="text-center text-gray-500">
              <Link href="/events">
                <p>Ver todos los eventos</p>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
