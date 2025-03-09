'use client';

import MatchWidget from '@/components/ui/matchWidget/MatchWidget';
import { useFilterStore } from '@/store/filterStore';
import { Match } from '@/types/la_liga/la_liga.types';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface EventsListProps {
  full?: boolean;
}

export default function EventsList({ full = false }: EventsListProps) {
  const { selectedSport, selectedLeague } = useFilterStore();

  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery<Match[]>({
    queryKey: ['events', selectedSport, selectedLeague],
    queryFn: async () => {
      const response = await fetch('/api/events');
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }
      const data: { matches: Match[] } = await response.json();
      return data.matches;
    },
    // TODO: ajustar staleTime o refetchInterval
  });

  const displayedEvents = full ? events : events.slice(0, 6);

  console.log('events =>', events);
  console.log('displayedEvents =>', displayedEvents);

  return (
    <div className="bg-white dark:bg-[#272727] rounded-lg mb-4 cursor-pointer">
      {isLoading ? (
        <p className="text-center text-gray-500">Cargando eventos...</p>
      ) : error ? (
        <p className="text-center text-gray-500">{(error as Error).message}</p>
      ) : events.length === 0 ? (
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
