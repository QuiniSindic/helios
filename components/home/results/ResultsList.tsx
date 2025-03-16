'use client';

import MatchWidget from '@/components/ui/matchWidget/MatchWidget';
import { Match } from '@/types/la_liga/la_liga.types';
import Link from 'next/link';

interface ResultsListProps {
  full?: boolean;
  results: Match[];
  isLoading: boolean;
  error: Error | null;
}

export default function ResultsList({
  full = false,
  results,
  isLoading,
  error,
}: ResultsListProps) {
  const eventsPlayed = results.filter(
    (event: Match) => event.status === 'FullTime',
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
              // TODO: marcar
              // case 'Canceled':
              //   return (
              //     <Link href={`/event/${result.id}`} key={result.id}>
              //       <MatchWidget key={result.id} event={result} isLive />
              //     </Link>
              //   );

              case 'FullTime':
                return (
                  <Link href={`/event/${result.id}`} key={result.id}>
                    <MatchWidget key={result.id} event={result} isFinished />
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
