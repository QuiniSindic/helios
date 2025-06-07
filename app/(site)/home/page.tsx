'use client';

import EventsContainer from '@/components/home/events/EventsContainer';
import SportsList from '@/components/home/SportsList';
import Welcome from '@/components/home/Welcome';
import { BACKEND_URL } from '@/core/config';
import { useFilterStore } from '@/store/filterStore';
import { useLaLigaMatchesStore } from '@/store/laLigaMatchesStore';
import { Match } from '@/types/la_liga/la_liga.types';
import { CompetitionData } from '@/types/livescore.types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function Home() {
  const { selectedSport, selectedLeague } = useFilterStore();
  const { setEvents } = useLaLigaMatchesStore();

  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery<Match[]>({
    queryKey: ['events', selectedSport, selectedLeague],
    queryFn: async () => {
      // let endpoint = '';

      // switch (selectedLeague) {
      //   case 'La Liga':
      //     endpoint = '/api/la-liga/events';
      // }

      const response = await fetch(`${BACKEND_URL}/football/matches`);
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }
      const data = await response.json();
      const matchesResponse: CompetitionData[] = data?.data;
      const matches = matchesResponse.map((item) => {
        return item.matches;
      });
      console.log('matches =>', matches);

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
            {/* FIX types */}
            {/* <ResultsContainer
              results={events}
              loading={isLoading}
              error={error}
            /> */}
          </div>
        </div>
      </>
    </div>
  );
}
