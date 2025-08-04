'use client';

import EventsContainer from '@/components/home/events/EventsContainer';
import SportsList from '@/components/home/SportsList';
import StandingsContainer from '@/components/home/standings/StandingsContainer';
import Welcome from '@/components/home/Welcome';
import { getUpcoming } from '@/services/matches.service';
import { useMatchesStore } from '@/store/matchesStore';
import { useSportsFilter } from '@/store/sportsLeagueFilterStore';
import { MatchData } from '@/types/custom.types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function Home() {
  const { selectedSport, selectedLeague } = useSportsFilter();
  const { setEvents } = useMatchesStore();

  const {
    data: events = [],
    // isLoading,
    // error,
  } = useQuery<MatchData[]>({
    queryKey: ['events', selectedSport, selectedLeague],
    queryFn: () => getUpcoming(),
    // FIX para que por defecto coja los matches de todas las comeptis
    // enabled: !!selectedSport && !!selectedLeague,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  React.useEffect(() => {
    if (events.length > 0) setEvents(events);
    console.log('events', events);
  }, [events, setEvents]);

  return (
    <div className="mb-4 mx-4 sm:mx-8 md:mx-8 lg:mx-12 xl:mx-12 min-h-screen">
      <Welcome />
      <>
        <div className="flex flex-col lg:flex-row lg:gap-4">
          <SportsList />
          <div className="flex flex-col lg:flex-row lg:gap-4 flex-1">
            <EventsContainer />
            <StandingsContainer />
          </div>
        </div>
      </>
    </div>
  );
}
