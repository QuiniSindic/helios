'use client';

import { BottomSheet } from '@/components/ui/BottomSheet';
import { leaguesIdMap, leaguesMap, sportsMap } from '@/constants/mappers';
import { useResultsEventsQuery } from '@/hooks/useUpcomingEvents';
import { useResultsStore } from '@/store/resultsStore';
import { useSportsFilter } from '@/store/sportsLeagueFilterStore';
import { useEffect, useState } from 'react';
import ResultsList from '../results/ResultsList';
import StandingsTable from '../standings/Standing';

type View = 'standings' | 'results' | null;

export function MobileOverlays() {
  const [view, setView] = useState<View>(null);
  const isResultsOpen = view === 'results';
  // const isStandingsOpen = view === 'standings';

  const { selectedLeague, selectedSport } = useSportsFilter();
  const sportSlug = sportsMap[selectedSport as keyof typeof sportsMap];
  const competitionId = leaguesIdMap[selectedLeague as keyof typeof leaguesMap];

  const { results, setResults } = useResultsStore();

  const { data: results_matches } = useResultsEventsQuery(
    sportSlug,
    competitionId,
    {
      enabled: isResultsOpen,
    },
  );
  console.log('results_matches', results_matches);

  useEffect(() => {
    if (results_matches) {
      setResults(results_matches);
    }
  }, [results_matches, setResults]);

  useEffect(() => {
    const onStandings = () => setView('standings');
    const onResults = () => setView('results');
    window.addEventListener('open-standings', onStandings as EventListener);
    window.addEventListener('open-results', onResults as EventListener);
    return () => {
      window.removeEventListener(
        'open-standings',
        onStandings as EventListener,
      );
      window.removeEventListener('open-results', onResults as EventListener);
    };
  }, []);

  const close = () => setView(null);

  return (
    <>
      <BottomSheet
        open={view === 'standings'}
        onClose={close}
        title={selectedLeague as string}
      >
        {selectedLeague ? (
          <StandingsTable competition={selectedLeague} />
        ) : (
          <p className="text-center text-gray-500">Selecciona una liga.</p>
        )}
      </BottomSheet>

      <BottomSheet open={view === 'results'} onClose={close} title="Resultados">
        {selectedLeague ? (
          <ResultsList results={results} league={selectedLeague} compact />
        ) : (
          <p className="text-center text-gray-500">Selecciona una liga.</p>
        )}
      </BottomSheet>
    </>
  );
}
