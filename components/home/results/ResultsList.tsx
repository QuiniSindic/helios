'use client';

import { useFilterStore } from '@/store/filterStore';
import { ParsedEvent } from '@/utils/sofascore/types/parsedEvents.types';
import { leaguesMap, sportsMap } from '@/utils/types/sports.types';
import Link from 'next/link';
import React from 'react';
import { MatchSchedule } from '../MatchSchedule';
import MatchWidget from '../MatchWidget';

interface ResultsListProps {
  full?: boolean;
}

export default function ResultsList({ full = false }: ResultsListProps) {
  const { selectedSport, selectedLeague } = useFilterStore();
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
        setError(error);
      }

      const data: { sortedResults: ParsedEvent[] } = await response.json();
      const { sortedResults } = data;

      if (sortedResults.length === 0) {
        setLoading(false);
        setMessage('No hay resultados disponibles.');
      }
      const filteredEvents = sortedResults.filter((result) => {
        // Traducir selectedSport al inglés usando el mapa
        const translatedSport = selectedSport ? sportsMap[selectedSport] : null;
        const translatedLeague = selectedLeague
          ? leaguesMap[selectedLeague]
          : null;

        if (!selectedSport && !selectedLeague) return true; // si no hay deporte ni liga seleccionados, mostramos todos los eventos

        if (!selectedSport && selectedLeague) {
          // si no hay deporte seleccionado pero sí liga, mostramos todos los eventos de esa liga
          return result.tournament.name === translatedLeague;
        }

        if (selectedSport && !selectedLeague) {
          // si hay deporte seleccionado pero no liga, mostramos todos los eventos de ese deporte
          return result.tournament.category.sport.slug === translatedSport;
        }

        return (
          result.tournament.category.sport.slug === translatedSport &&
          result.tournament.name === translatedLeague
        );
      });

      if (filteredEvents.length === 0) {
        setMessage(
          'No hay resultados disponibles para los filtros seleccionados.',
        );
      }

      setResults(filteredEvents);
      setLoading(false);
    };

    fetchEvents();
  }, [selectedSport, selectedLeague]);

  const displayedResults = full ? results : results.slice(0, 6);

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
          {displayedResults.map((result) => (
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
          {!full && results.length > 6 && (
            <div className="text-center text-gray-500 p-4">
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
