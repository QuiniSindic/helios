'use client';

import { ParsedEvent } from '@/utils/sofascore/types/parsedEvents.types';
import Link from 'next/link';
import React from 'react';
import { MatchSchedule } from '../MatchSchedule';
import MatchWidget from '../MatchWidget';

export default function ResultsList() {
  const [results, setResults] = React.useState<ParsedEvent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const response = await fetch('/api/results');

      if (!response.ok) {
        setLoading(false);
        const { error } = await response.json();
        // console.error("Error obteniendo los eventos de hoy:", response);
        setError(error);
      }

      const { sortedResults } = await response.json();

      if (sortedResults.length === 0) {
        setLoading(false);
        setMessage('No hay resultados disponibles.');
      }

      setResults(sortedResults);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-white dark:bg-[#272727] rounded-lg mb-4 cursor-pointer">
      {loading && !error ? (
        <p className="text-center text-gray-500">Cargando eventos...</p>
      ) : results.length === 0 && !error ? (
        <p className="text-center text-gray-500">{message}</p>
      ) : error ? (
        <p className="text-center text-gray-500">{error}</p>
      ) : (
        <>
          {results.slice(0, 6).map((result) => (
            <div
              key={result.id}
              className="bg-white dark:bg-[#272727] mb-4 p-3 md:p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200 sm:hover:shadow-lg sm:hover:scale-[1.02] active:scale-[0.98] sm:active:scale-100 flex flex-row sm:flex-col items-center"
            >
              <MatchWidget event={result} showScore />
              <div className="ml-auto sm:ml-0 sm:mt-4">
                <MatchSchedule
                  date={new Date(result.startTimestamp * 1000).toISOString()}
                />
              </div>
            </div>
          ))}
          {results.length > 6 && (
            <div className="text-center text-gray-500 p-4">
              <Link href="/results">
                <p>Ver todos los resultados</p>
              </Link>
            </div>
          )}
        </>
        // results.map((result) => (
        //   <div
        //     key={result.id}
        //     className="bg-white dark:bg-[#272727] mb-4 p-3 md:p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200 sm:hover:shadow-lg sm:hover:scale-[1.02] active:scale-[0.98] sm:active:scale-100 flex flex-row sm:flex-col items-center"
        //   >
        //     <MatchWidget event={result} showScore />
        //     <div className="ml-auto sm:ml-0 sm:mt-4">
        //       <MatchSchedule
        //         date={new Date(result.startTimestamp * 1000).toISOString()}
        //       />
        //     </div>
        //   </div>
        // ))
      )}
    </div>
  );
}
