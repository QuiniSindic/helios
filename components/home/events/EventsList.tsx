'use client';

import MatchWidget from '@/components/ui/matchWidget/MatchWidget';
import { useFilterStore } from '@/store/filterStore';
import { Event } from '@/types/the_odds/the_odds.types';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface EventsListProps {
  full?: boolean;
}

// Definimos la duración del partido en minutos (ajústalo según necesites)
const GAME_DURATION_MINUTES = 150;

// Helper para determinar el estado del evento basado en el commence_time
const getEventStatus = (
  commenceTime: string,
): 'notstarted' | 'inprogress' | 'completed' => {
  const now = new Date();
  const eventTime = new Date(commenceTime);
  const diffMinutes = (now.getTime() - eventTime.getTime()) / 60000;
  if (diffMinutes < 0) {
    return 'notstarted';
  } else if (diffMinutes < GAME_DURATION_MINUTES) {
    return 'inprogress';
  }
  return 'completed';
};

export default function EventsList({ full = false }: EventsListProps) {
  const { selectedSport, selectedLeague } = useFilterStore();

  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery<Event[]>({
    queryKey: ['events', selectedSport, selectedLeague],
    queryFn: async () => {
      const response = await fetch('/api/events');
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }
      const data: { events: Event[] } = await response.json();
      return data.events;
    },
    // Puedes ajustar staleTime o refetchInterval si lo necesitas
  });

  const displayedEvents = full ? events : events.slice(0, 6);

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
            const status = getEventStatus(event.commence_time);
            const isLive = status === 'inprogress';
            // Si es necesario, podrías manejar el caso "completed" de forma distinta
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
