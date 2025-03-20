'use client';

import EventsContainer from '@/components/home/events/EventsContainer';
import ResultsContainer from '@/components/home/results/ResultsContainer';
import SportsList from '@/components/home/SportsList';
import Welcome from '@/components/home/Welcome';
import { useFilterStore } from '@/store/filterStore';
import { useLaLigaMatchesStore } from '@/store/laLigaMatchesStore';
import { Match } from '@/types/la_liga/la_liga.types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function Home() {
  const { selectedSport, selectedLeague } = useFilterStore();
  const { setEvents } = useLaLigaMatchesStore();

  // React.useEffect(() => {
  //   setSelectedLeague(null);
  //   setSelectedSport(null);
  // }, [setSelectedLeague, setSelectedSport]);

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
      const matches = data.matches;

      // const events = matches.filter(
      //   (event: Match) => event.status === 'FullTime',
      // );

      // console.log('eventsPlayed =>', eventsPlayed);
      // TODO: filterEvents (en funcion del deporte etc)

      return matches;
    },
    // TODO: ajustar staleTime o refetchInterval
  });

  React.useEffect(() => {
    if (events.length > 0) setEvents(events);
  }, [events, setEvents]);

  return (
    <div className="mb-4 mx-4 sm:mx-8 md:mx-8 lg:mx-12 xl:mx-12 min-h-screen">
      <Welcome />
      <>
        <div className="flex flex-col lg:flex-row lg:gap-4">
          <SportsList />
          <div className="flex flex-col lg:flex-row lg:gap-4 flex-1">
            <EventsContainer
            // events={events}
            // loading={isLoading}
            // error={error}
            />
            <ResultsContainer
              results={events}
              loading={isLoading}
              error={error}
            />
          </div>
        </div>
      </>
    </div>
  );
}
