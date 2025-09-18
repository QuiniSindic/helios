'use client';

import { sportsList } from '@/constants/mappers';
import { useSportsFilter } from '@/store/sportsLeagueFilterStore';
import { Button, Divider, Select, SelectItem } from '@heroui/react';

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

  const leagues =
    sportsList.find((s) => s.name === selectedSport)?.leagues || [];

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

  const selectClass = {
    base: 'flex-1',
    trigger:
      'h-9 rounded-lg bg-content2 text-foreground data-[hover=true]:bg-content3',
    value: 'text-foreground',
  } as const;

  const TopRow = (
    <div className="flex items-center gap-2 min-w-max overflow-x-auto">
      <Select
        selectedKeys={new Set([selectedSport || ''])}
        onChange={(e) => {
          const v = e.target.value || '';
          setSelectedSport(v);
          setSelectedLeague('');
        }}
        labelPlacement="outside-left"
        aria-label="Deporte"
        placeholder="Todos los deportes"
        classNames={selectClass}
      >
        {sportsList.map((s) => (
          <SelectItem key={s.name}>{s.name}</SelectItem>
        ))}
      </Select>

      <Select
        isDisabled={!selectedSport}
        selectedKeys={new Set([selectedLeague || ''])}
        onChange={(e) => setSelectedLeague(e.target.value || '')}
        labelPlacement="outside-left"
        aria-label="Liga"
        placeholder="Todas las ligas"
        classNames={selectClass}
      >
        {leagues.map((league) => (
          <SelectItem key={league}>{league}</SelectItem>
        ))}
      </Select>
    </div>
  );

  return (
    <div className="w-full bg-secondary/90 text-white shadow-sm backdrop-blur mb-4 rounded-lg px-3 py-3">
      {mode === 'events' ? (
        // === EVENTS: 1 sola fila con los dos selects (igual que ahora) ===
        TopRow
      ) : (
        // === RESULTS: misma fila de selects + segunda fila con filtros ===
        <div className="flex flex-col gap-3">
          {TopRow}

          <div className="flex flex-wrap items-center gap-3 justify-between">
            {/* Fechas a la izquierda */}
            <div className="flex items-center gap-2">
              <label className="text-xs opacity-80">Desde</label>
              <input
                type="date"
                value={selectedFrom || ''}
                onChange={(e) => setSelectedFrom(e.target.value || undefined)}
                className="h-9 rounded-lg px-3 bg-content2 text-foreground border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <label className="text-xs opacity-80">Hasta</label>
              <input
                type="date"
                value={selectedTo || ''}
                onChange={(e) => setSelectedTo(e.target.value || undefined)}
                className="h-9 rounded-lg px-3 bg-content2 text-foreground border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            {/* Botones rápidos a la derecha */}
            <div className="flex items-center">
              <div className="inline-flex overflow-hidden rounded-lg border border-white/15">
                <Button
                  size="sm"
                  variant="light"
                  className="h-9"
                  onPress={setHoy}
                >
                  Hoy
                </Button>
                <Divider orientation="vertical" className="bg-white/15" />
                <Button
                  size="sm"
                  variant="light"
                  className="h-9"
                  onPress={setAyer}
                >
                  Ayer
                </Button>
                <Divider orientation="vertical" className="bg-white/15" />
                <Button
                  size="sm"
                  variant="light"
                  className="h-9"
                  onPress={setUltimos7}
                >
                  Últ. 7 días
                </Button>
              </div>

              <Button
                size="sm"
                variant="bordered"
                className="h-9 ml-2"
                onPress={clearDates}
              >
                Limpiar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
