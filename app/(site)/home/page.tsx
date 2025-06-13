'use client';

import EventsContainer from '@/components/home/events/EventsContainer';
import ResultsContainer from '@/components/home/results/ResultsContainer';
import SportsList from '@/components/home/SportsList';
import Welcome from '@/components/home/Welcome';
import { BACKEND_URL } from '@/core/config';
import { normalizeTeamCrestsV2 } from '@/services/la_liga.service';
import { useFilterStore } from '@/store/filterStore';
import { useMatchesStore } from '@/store/matchesStore';
import { CompetitionData, MatchData } from '@/types/custom.types';
import { parseKickoff } from '@/utils/date.utils';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function Home() {
  const { selectedSport, selectedLeague } = useFilterStore();
  const { setEvents } = useMatchesStore();

  const {
    data: events = [],
    // isLoading,
    // error,
  } = useQuery<MatchData[]>({
    queryKey: ['events', selectedSport, selectedLeague],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}/football/matches`);
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      const data = await response.json();
      const matchesResponse: CompetitionData[] = data?.data; // array de una competicion con su id, name y partidos
      const allMatches = matchesResponse.flatMap((group) => group.matches);
      let events = allMatches
        .sort(
          (a, b) =>
            parseKickoff(a.kickoff).getTime() -
            parseKickoff(b.kickoff).getTime(),
        )
        .filter((match: MatchData) => match.status === 'NS'); // filtrar partidos por status NS (Not Started)

      const normalizedMatches = normalizeTeamCrestsV2(events);
      events = normalizedMatches as MatchData[];
      // TODO: filterEvents (en funcion del deporte etc)

      console.log('events', events);
      return events;
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
            {/* FIX types - 07/06/2025 */}
            <ResultsContainer
              results={events}
              // loading={isLoading}
              // error={error}
            />
          </div>
        </div>
      </>
    </div>
  );
}
