'use client';

import TeamLogo from '@/components/ui/TeamLogo';
import { API_LOGO_COMPETITION_URL } from '@/core/config';
import { useStandingsQuery } from '@/hooks/useStandingLeague';
import { TeamStandingData } from '@/types/standings/standings.types';
import { getTeamLogoSrc } from '@/utils/images.utils';

interface StandingsTableProps {
  competition?: string;
}

export default function StandingsTable({ competition }: StandingsTableProps) {
  const {
    data: standing,
    isLoading,
    isError,
    error,
  } = useStandingsQuery(competition);

  if (!standing) {
    return (
      <p className="text-center text-gray-500">
        Clasificación no disponible para esta liga.
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">
        Cargando clasificación de <strong>{competition}</strong>...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error: {(error as Error).message}
      </p>
    );
  }

  if (!standing || standing.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Clasificación no disponible para esta liga.
      </p>
    );
  }

  return (
    <table className="w-full text-[13px] sm:text-sm text-left">
      <thead className="text-[11px] sm:text-xs uppercase bg-gray-100 dark:bg-[#1f1f1f] text-gray-600 dark:text-gray-400">
        <tr>
          <th className="px-2 py-2 text-center w-8">#</th>
          <th className="px-2 py-2">Equipo</th>
          <th className="px-2 py-2 text-center">PJ</th>
          <th className="px-2 py-2 text-center">G</th>
          <th className="px-2 py-2 text-center">E</th>
          <th className="px-2 py-2 text-center">P</th>
          <th className="px-2 py-2 text-center">Pts</th>
        </tr>
      </thead>
      <tbody>
        {standing.map((team: TeamStandingData) => {
          const teamLogo = getTeamLogoSrc(API_LOGO_COMPETITION_URL, team.badge);

          return (
            <tr
              key={team.position}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#333]"
            >
              <td className="px-2 py-1 text-center font-bold">
                {team.position}
              </td>
              <td className="px-2 py-1 flex items-center">
                <TeamLogo
                  alt={team.name}
                  src={teamLogo}
                  size={24}
                  className="size-6 mr-2"
                />
                <span className="truncate">{team.name}</span>
              </td>
              <td className="px-2 py-1 text-center">{team.played}</td>
              <td className="px-2 py-1 text-center">{team.wins}</td>
              <td className="px-2 py-1 text-center">{team.draws}</td>
              <td className="px-2 py-1 text-center">{team.losses}</td>
              <td className="px-2 py-1 text-center font-semibold">
                {team.points}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
