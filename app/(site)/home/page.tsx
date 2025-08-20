'use client';

import EventsContainer from '@/components/home/events/EventsContainer';
import SportsList from '@/components/home/SportsList';
import StandingsContainer from '@/components/home/standings/StandingsContainer';
import Welcome from '@/components/home/Welcome';
import { leaguesIdMap, leaguesMap, sportsMap } from '@/constants/mappers';
import {
  useLiveEventsQuery,
  useUpcomingEventsQuery,
} from '@/hooks/useUpcomingEvents';
import { useMatchesStore } from '@/store/matchesStore';
import { useSportsFilter } from '@/store/sportsLeagueFilterStore';
import { concatenateAndSortEvents } from '@/utils/events.utils';
import React from 'react';

export default function Home() {
  const { selectedSport, selectedLeague } = useSportsFilter();
  const { setEvents } = useMatchesStore();

  const sportSlug = sportsMap[selectedSport as keyof typeof sportsMap];
  const competitionId = leaguesIdMap[selectedLeague as keyof typeof leaguesMap];

  const { data: upcoming_events, isLoading } = useUpcomingEventsQuery(
    sportSlug,
    competitionId,
  );
  console.log({ upcoming_events });

  const { data: live_matches } = useLiveEventsQuery();
  console.log({ live_matches });

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
  }, [mergedEvents, setEvents]);

  return (
    <div className="mb-4 mx-4 sm:mx-8 md:mx-8 lg:mx-12 xl:mx-12 min-h-screen">
      <Welcome />
      <>
        <div className="flex flex-col lg:flex-row lg:gap-4">
          <SportsList />
          <div className="flex flex-col lg:flex-row lg:gap-4 flex-1">
            <EventsContainer isLoading={isLoading} />
            <StandingsContainer />
          </div>
        </div>
      </>
    </div>
  );
}
