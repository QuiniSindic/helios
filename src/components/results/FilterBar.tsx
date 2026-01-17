'use client';

import { sportsList } from '@/src/constants/mappers';
import { useSportsFilter } from '@/src/store/sportsLeagueFilterStore';

interface FilterBarProps {
  mode: 'events' | 'results';
}

export default function FilterBar({ mode }: FilterBarProps) {
  const {
    selectedSport,
    setSelectedSport,
    selectedLeague,
    setSelectedLeague,
    selectedFrom,
    setSelectedFrom,
    selectedTo,
    setSelectedTo,
    clearDates,
  } = useSportsFilter();

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

  const setHoy = () => {
    const d = new Date();
    const ymd = d.toISOString().slice(0, 10);
    setSelectedFrom(ymd);
    setSelectedTo(ymd);
  };

  const setAyer = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const ymd = d.toISOString().slice(0, 10);
    setSelectedFrom(ymd);
    setSelectedTo(ymd);
  };

  const setUltimos7 = () => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 6);
    setSelectedFrom(from.toISOString().slice(0, 10));
    setSelectedTo(to.toISOString().slice(0, 10));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-secondary text-white rounded-lg mb-4">
      <select
        value={selectedSport || ''}
        onChange={handleSportChange}
        className="bg-secondary text-white border border-white rounded-sm p-2 cursor-pointer"
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
        className="bg-secondary text-white border border-white rounded-sm p-2 cursor-pointer"
        disabled={!selectedSport}
      >
        <option value="">Todas las ligas</option>
        {leagues.map((league) => (
          <option key={league} value={league}>
            {league}
          </option>
        ))}
      </select>

      {mode === 'results' && (
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm opacity-80">Desde</label>
            <input
              type="date"
              value={selectedFrom || ''}
              onChange={(e) => setSelectedFrom(e.target.value || undefined)}
              className="bg-secondary text-white border border-white rounded-sm p-2 cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm opacity-80">Hasta</label>
            <input
              type="date"
              value={selectedTo || ''}
              onChange={(e) => setSelectedTo(e.target.value || undefined)}
              className="bg-secondary text-white border border-white rounded-sm p-2 cursor-pointer"
            />
          </div>

          {/* TODO hacer mas bonito xd */}
          <div className="flex items-center gap-2">
            <button
              onClick={setHoy}
              className="px-3 py-2 rounded-sm border border-white hover:bg-white/10 transition"
            >
              Hoy
            </button>
            <button
              onClick={setAyer}
              className="px-3 py-2 rounded-sm border border-white hover:bg-white/10 transition"
            >
              Ayer
            </button>
            <button
              onClick={setUltimos7}
              className="px-3 py-2 rounded-sm border border-white hover:bg-white/10 transition"
            >
              Últimos 7 días
            </button>
            <button
              onClick={clearDates}
              className="px-3 py-2 rounded-sm border border-white hover:bg-white/10 transition"
            >
              Limpiar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
