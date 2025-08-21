'use client';

import MatchWidget from '@/components/ui/matchWidget/MatchWidget';
import { leaguesIdMap } from '@/constants/mappers';
import { useMatchesStore } from '@/store/matchesStore';
import { useSportsFilter } from '@/store/sportsLeagueFilterStore';
import { competitionIdsForSport } from '@/utils/events.utils';
import Link from 'next/link';

interface EventsListProps {
  full?: boolean;
  isLoading?: boolean;
}

export default function EventsList({
  full = false,
  isLoading = false,
}: EventsListProps) {
  const { events } = useMatchesStore();
  const { selectedSport, selectedLeague } = useSportsFilter();

  const base = Array.isArray(events)
    ? events.filter((e) => e && !['FT', 'Canc.'].includes(e.status))
    : [];

  const leagueId = selectedLeague ? leaguesIdMap[selectedLeague] : undefined;

  let filtered = base;

  if (leagueId) {
    filtered = base.filter((event) => event.competitionid === leagueId);
  } else if (selectedSport) {
    const sportIds = competitionIdsForSport(selectedSport);
    filtered = base.filter((event) => sportIds.has(event.competitionid));
  }

  const displayedEvents = full ? filtered : filtered.slice(0, 6);

  return (
    <div className=" rounded-lg mb-4 cursor-pointer">
      {isLoading ? (
        <p className="text-center text-gray-500">Cargando eventos...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No hay eventos para hoy.</p>
      ) : (
        <>
          {displayedEvents.map((event) => {
            const status = event.status;
            const isLive =
              status !== 'NS' && status !== 'FT' && status !== 'Canc.';
            return (
              <Link prefetch={true} href={`/event/${event.id}`} key={event.id}>
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
