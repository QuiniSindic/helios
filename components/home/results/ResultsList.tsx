'use client';

import MatchWidget from '@/components/ui/matchWidget/MatchWidget';
import { leaguesIdMap } from '@/constants/mappers';
import { MatchData } from '@/types/events/events.types';
import Link from 'next/link';
import ResultRowCompact from './ResultCompactView';

interface ResultsListProps {
  full?: boolean;
  compact?: boolean;
  results: MatchData[];
  isLoading?: boolean;
  error?: Error | null;
  selectedSport?: string | null;
  league?: string | null;
}

export default function ResultsList({
  full = false,
  compact = false,
  results,
  isLoading,
  error,
  league,
}: ResultsListProps) {
  const id = leaguesIdMap[league as string] || null;

  const eventsPlayed = results
    .filter((event: MatchData) => event.status === 'FT')
    .filter((event: MatchData) => (id ? event.competitionid === id : true));

  console.log({ eventsPlayed });

  const displayedResults = full ? eventsPlayed : eventsPlayed.slice(0, 6);

  return (
    <div className="bg-white dark:bg-[#272727] rounded-lg mb-4 cursor-pointer">
      {isLoading ? (
        <p className="text-center text-gray-500">Cargando resultados...</p>
      ) : error ? (
        <p className="text-center text-gray-500">{(error as Error).message}</p>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-500">No hay resultados.</p>
      ) : (
        <>
          {displayedResults.map((result) => {
            if (compact) {
              return <ResultRowCompact key={result.id} event={result} />;
            }

            switch (result.status) {
              case 'FT':
                const isFinished = true;
                return (
                  <Link href={`/event/${result.id}`} key={result.id}>
                    <MatchWidget
                      key={result.id}
                      event={result}
                      isFinished={isFinished}
                    />
                  </Link>
                );

              default:
                return (
                  <Link href={`/event/${result.id}`} key={result.id}>
                    <MatchWidget key={result.id} event={result} />
                  </Link>
                );
            }
          })}
          {!full && results.length > 6 && (
            <div className="text-center text-gray-500">
              <Link href="/results">
                <p>Ver todos los resultados</p>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
