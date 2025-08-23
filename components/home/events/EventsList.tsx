'use client';

import MatchWidget from '@/components/ui/matchWidget/MatchWidget';
import { leaguesIdMap } from '@/constants/mappers';
import { useMatchesStore } from '@/store/matchesStore';
import { useResultsStore } from '@/store/resultsStore';
import { useSportsFilter } from '@/store/sportsLeagueFilterStore';
import { parseKickoff } from '@/utils/date.utils';
import {
  competitionIdsForSport,
  IS_FINISHED,
  IS_LIVE,
} from '@/utils/events.utils';
import Link from 'next/link';

interface EventsListProps {
  full?: boolean;
  isLoading?: boolean;
  mode?: 'events' | 'results';
}

export default function EventsList({
  full = false,
  isLoading = false,
  mode = 'events',
}: EventsListProps) {
  const { events } = useMatchesStore();
  const { results } = useResultsStore();
  const { selectedSport, selectedLeague, selectedFrom, selectedTo } =
    useSportsFilter();

  const base =
    mode === 'results'
      ? results
      : Array.isArray(events)
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

  if (mode === 'results' && (selectedFrom || selectedTo)) {
    filtered = filtered.filter((event) => {
      const d = parseKickoff(event.kickoff); // Date

      if (!d) return null;

      if (Number.isNaN(d.getTime())) return false;

      const y = d.getFullYear();
      const m = d.getMonth();
      const day = d.getDate();
      const start = new Date(y, m, day, 0, 0, 0);
      const end = new Date(y, m, day, 23, 59, 59);

      const fromOk = selectedFrom
        ? end >= new Date(`${selectedFrom}T00:00:00`)
        : true;
      const toOk = selectedTo
        ? start <= new Date(`${selectedTo}T23:59:59`)
        : true;

      return fromOk && toOk;
    });
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
            const isLive = IS_LIVE.includes(status);
            const isFinished = IS_FINISHED.includes(status);
            return (
              <Link prefetch={true} href={`/event/${event.id}`} key={event.id}>
                <MatchWidget
                  event={event}
                  isLive={isLive}
                  isFinished={isFinished}
                />
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
