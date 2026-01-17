'use client';

import EventsContainer from '@/src/components/home/events/EventsContainer';
import { MobileOverlays } from '@/src/components/home/overlays/MobileOverlays';
import SportsList from '@/src/components/home/sportsList/SportsList';
import StandingsContainer from '@/src/components/home/standings/StandingsContainer';
import { leaguesIdMap, leaguesMap, sportsMap } from '@/src/constants/mappers';
import {
  useLiveEventsQuery,
  useResultsEventsQuery,
  useUpcomingEventsQuery,
} from '@/src/hooks/useUpcomingEvents';
import { useMatchesStore } from '@/src/store/matchesStore';
import { useResultsStore } from '@/src/store/resultsStore';
import { useSportsFilter } from '@/src/store/sportsLeagueFilterStore';
import { concatenateAndSortEvents } from '@/src/utils/events.utils';

import React from 'react';

export default function Home() {
  const { selectedSport, selectedLeague } = useSportsFilter();
  const { setEvents } = useMatchesStore();
  const { setResults } = useResultsStore();

  const sportSlug = sportsMap[selectedSport as keyof typeof sportsMap];
  const competitionId = leaguesIdMap[selectedLeague as keyof typeof leaguesMap];

  const { data: upcoming_events, isLoading } = useUpcomingEventsQuery(
    sportSlug,
    competitionId,
  );
  const { data: live_matches } = useLiveEventsQuery();

  // TODO fer un pensa si dejarlo o ponerlo cuando entremos en la page de results
  // (creo que mejor moverlo)
  const { data: results_matches } = useResultsEventsQuery();

  const mergedEvents = React.useMemo(
    () =>
      concatenateAndSortEvents({
        upcoming: upcoming_events ?? [],
        live: live_matches ?? [],
      }),
    [upcoming_events, live_matches],
  );

  React.useEffect(() => {
    setEvents(mergedEvents);
    setResults(results_matches ?? []);
  }, [mergedEvents, setEvents, results_matches, setResults]);

  return (
    <div className="mb-4 mx-4 sm:mx-8 md:mx-8 lg:mx-12 xl:mx-12 ">
      <>
        <div className="flex flex-col lg:flex-row lg:gap-4 mt-4">
          <SportsList />
          <div className="flex flex-col lg:flex-row lg:gap-4 flex-1">
            <EventsContainer isLoading={isLoading} />
            <StandingsContainer />
            <MobileOverlays />
          </div>
        </div>
      </>
    </div>
  );
}
