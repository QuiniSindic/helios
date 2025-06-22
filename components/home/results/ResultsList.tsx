'use client';

import MatchWidget from '@/components/ui/matchWidget/MatchWidget';
import { MatchData } from '@/types/custom.types';
import Link from 'next/link';

interface ResultsListProps {
  full?: boolean;
  results: MatchData[];
  isLoading?: boolean;
  error?: Error | null;
}

export default function ResultsList({
  full = false,
  results,
  isLoading,
  error,
}: ResultsListProps) {
  const eventsPlayed = results.filter(
    (event: MatchData) => event.status === 'FT',
  );

  const displayedResults = full ? eventsPlayed : eventsPlayed.slice(0, 6);

  return (
    <div className="bg-white dark:bg-[#272727] rounded-lg mb-4 cursor-pointer">
      {isLoading ? (
        <p className="text-center text-gray-500">Cargando eventos...</p>
      ) : error ? (
        <p className="text-center text-gray-500">{(error as Error).message}</p>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-500">No hay eventos para hoy.</p>
      ) : (
        <>
          {displayedResults.map((result) => {
            switch (result.status) {
              case 'FT':
                const isFinished = true;
                return (
                  <Link
                    href={`/event/${result.match_id}`}
                    key={result.match_id}
                  >
                    <MatchWidget
                      key={result.match_id}
                      event={result}
                      isFinished={isFinished}
                    />
                  </Link>
                );

              default:
                return (
                  <Link
                    href={`/event/${result.match_id}`}
                    key={result.match_id}
                  >
                    <MatchWidget key={result.match_id} event={result} />
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
