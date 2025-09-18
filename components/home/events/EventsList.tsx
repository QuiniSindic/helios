'use client';

import MatchWidget from '@/components/ui/matchWidget/MatchWidget';
import { leaguesIdMap } from '@/constants/mappers';
import { useCompetitionsByIdsQuery } from '@/hooks/useCompetitions';
import { useMatchesStore } from '@/store/matchesStore';
import { useResultsStore } from '@/store/resultsStore';
import { useSportsFilter } from '@/store/sportsLeagueFilterStore';
import { parseKickoff } from '@/utils/date.utils';
import {
  competitionIdsForSport,
  isFinished,
  isLive,
} from '@/utils/events.utils';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';

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
  const queryClient = useQueryClient();
  const { events } = useMatchesStore();
  const { results } = useResultsStore();
  console.log('results from store', results);
  const { selectedSport, selectedLeague, selectedFrom, selectedTo } =
    useSportsFilter();

  const base =
    mode === 'results'
      ? results
      : Array.isArray(events)
        ? events.filter((e) => e && !isFinished(e.status))
        : [];

  const leagueId = selectedLeague ? leaguesIdMap[selectedLeague] : undefined;

  let filtered = base;

  const ids = useMemo(() => {
    const s = new Set<number>();
    for (const e of filtered)
      if (e?.competitionid) s.add(Number(e.competitionid));
    return Array.from(s);
  }, [filtered]);

  const { data: competitions } = useCompetitionsByIdsQuery(ids);

  useEffect(() => {
    if (!competitions || competitions.length === 0) return;

    // cargar store
    competitions.forEach((comp) => {
      queryClient.setQueryData(['competition', comp.id], comp);
    });
  }, [competitions, queryClient]);

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
    <div className="space-y-2">
      {isLoading ? (
        <p className="text-center text-gray-500 py-8">Cargando eventos...</p>
      ) : displayedEvents.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No hay eventos en este momento.
        </p>
      ) : (
        <>
          {displayedEvents.map((event) => {
            const status = event.status;
            const live = isLive(status);
            const finished = isFinished(status);

            return (
              <Link prefetch href={`/event/${event.id}`} key={event.id}>
                <MatchWidget
                  event={event}
                  isLive={live}
                  isFinished={finished}
                />
              </Link>
            );
          })}
          {!full && filtered.length > 6 && (
            <div className="text-center text-gray-500 py-2">
              <Link href="/events">Ver todos los eventos</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
