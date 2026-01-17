'use client';

import { useSportsFilter } from '@/src/store/sportsLeagueFilterStore';
import StandingsTable from './Standing';

export default function StandingsContainer() {
  const { selectedLeague } = useSportsFilter();

  if (!selectedLeague) return null;

  return (
    <aside className="hidden lg:block lg:w-2/5 bg-white dark:bg-[#272727] rounded-lg h-fit">
      <h1 className="text-2xl font-bold text-center bg-secondary text-white rounded-lg p-2 mb-4">
        Clasificación
      </h1>
      <StandingsTable competition={selectedLeague} />
    </aside>
  );
}
