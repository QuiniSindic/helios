'use client';

import { sportsList } from '@/constants/mappers';
import { useSportsFilter } from '@/store/sportsLeagueFilterStore';

export default function FilterBar() {
  const { selectedSport, setSelectedSport, selectedLeague, setSelectedLeague } =
    useSportsFilter();

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(e.target.value);
    // Reiniciar liga si se cambia el deporte
    setSelectedLeague('');
  };

  const handleLeagueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLeague(e.target.value);
  };

  // Obtener las ligas del deporte seleccionado (si existe)
  const leagues =
    sportsList.find((sport) => sport.name === selectedSport)?.leagues || [];

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-secondary text-white rounded-lg mb-4">
      <select
        value={selectedSport || ''}
        onChange={handleSportChange}
        className="bg-secondary text-white border border-white rounded p-2"
      >
        <option value="">Todos los deportes</option>
        {sportsList.map((sport) => (
          <option key={sport.name} value={sport.name}>
            {sport.name}
          </option>
        ))}
      </select>

      <select
        value={selectedLeague || ''}
        onChange={handleLeagueChange}
        className="bg-secondary text-white border border-white rounded p-2"
        disabled={!selectedSport}
      >
        <option value="">Todas las ligas</option>
        {leagues.map((league) => (
          <option key={league} value={league}>
            {league}
          </option>
        ))}
      </select>
    </div>
  );
}
