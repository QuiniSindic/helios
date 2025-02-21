'use client';

import EventsContainer from '@/components/home/events/EventsContainer';
import ResultsContainer from '@/components/home/results/ResultsContainer';
import SportsList from '@/components/home/SportsList';
import Welcome from '@/components/home/Welcome';
import { useFilterStore } from '@/store/filterStore';
import React from 'react';

export default function Home() {
  const { setSelectedLeague, setSelectedSport } = useFilterStore();

  React.useEffect(() => {
    setSelectedLeague(null);
    setSelectedSport(null);
  }, [setSelectedLeague, setSelectedSport]);

  return (
    <div className="mb-4 mx-4 sm:mx-8 md:mx-8 lg:mx-12 xl:mx-12">
      <Welcome />
      <>
        <div className="flex flex-col lg:flex-row lg:gap-4">
          <SportsList />
          <div className="flex flex-col lg:flex-row lg:gap-4 flex-1">
            <EventsContainer />
            <ResultsContainer />
          </div>
        </div>
      </>
    </div>
  );
}
