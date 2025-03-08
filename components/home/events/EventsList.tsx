'use client';

import MatchWidget from '@/components/ui/matchWidget/MatchWidget';
import { fetchAndStore, filterEvents } from '@/services/events.service';
import { useFilterStore } from '@/store/filterStore';
import { ParsedEvent } from '@/types/sofascoreTypes/parsedEvents.types';
import Link from 'next/link';
import React from 'react';

interface EventsListProps {
  full?: boolean;
}

export default function EventsList({ full = false }: EventsListProps) {
  const { selectedSport, selectedLeague } = useFilterStore();
  const [events, setEvents] = React.useState<ParsedEvent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      // const response = await fetch('/api/events');
      const response = await fetchAndStore();

      const sortedEvents = response.sortedEvents;

      if (sortedEvents.length === 0) {
        setLoading(false);
        setMessage('No hay eventos para hoy.');
        setError('No hay eventos para hoy.');
      }

      const eventsToPlay = sortedEvents.filter(
        (event) =>
          event.status.type === 'notstarted' ||
          event.status.type === 'inprogress',
      );

      const filteredEvents = filterEvents(
        eventsToPlay,
        selectedLeague,
        selectedSport,
      );

      if (filteredEvents.length === 0) {
        setMessage(
          `No hay eventos próximos para ${
            selectedLeague ? selectedLeague : 'esta liga'
          }`,
        );
      }

      setEvents(filteredEvents);

      // // insertar los eventos en la base de datos (de momento a mano)
      // const inserted_events_response = await fetch('/api/events', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ sortedEvents }),
      // });

      // const inserted_events_data = await inserted_events_response.json();
      // console.log('inserted_events_data ==>', inserted_events_data);

      setLoading(false);
    };

    fetchEvents();
  }, [selectedSport, selectedLeague]);

  const displayedEvents = full ? events : events.slice(0, 6);

  return (
    <div className="bg-white dark:bg-[#272727] rounded-lg mb-4 cursor-pointer">
      {loading && !error ? (
        <p className="text-center text-gray-500">Cargando eventos...</p>
      ) : events.length === 0 && !error ? (
        <p className="text-center text-gray-500">{message}</p>
      ) : error ? (
        <p className="text-center text-gray-500">{error}</p>
      ) : (
        <>
          {displayedEvents.map((event) => {
            switch (event.status.type) {
              case 'notstarted':
                return (
                  <Link href={`/event/${event.id}`} key={event.id}>
                    <MatchWidget key={event.id} event={event} isLive={false} />
                  </Link>
                );

              case 'inprogress':
                return (
                  <Link href={`/event/${event.id}`} key={event.id}>
                    <MatchWidget event={event} isLive={true} />
                  </Link>
                );
            }
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
