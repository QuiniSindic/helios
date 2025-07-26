'use client';

import MatchWidget from '@/components/ui/matchWidget/MatchWidget';
import { useMatchesStore } from '@/store/matchesStore';
import { MatchData } from '@/types/custom.types';
import Link from 'next/link';

interface EventsListProps {
  full?: boolean;
}

export default function EventsList({ full = false }: EventsListProps) {
  const { events } = useMatchesStore();
  const eventsToPlay = events.filter(
    (e: MatchData) => !['FT', 'Canc.'].includes(e.status),
  );

  const displayedEvents = full ? eventsToPlay : eventsToPlay.slice(0, 6);
  // console.log('displayedEvents', displayedEvents);

  return (
    <div className="bg-white dark:bg-[#272727] rounded-lg mb-4 cursor-pointer">
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No hay eventos para hoy.</p>
      ) : (
        <>
          {displayedEvents.map((event) => {
            const status = event.status;
            const isLive =
              status !== 'NS' && status !== 'FT' && status !== 'Canc.';
            return (
              <Link href={`/event/${event.id}`} key={event.id}>
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
