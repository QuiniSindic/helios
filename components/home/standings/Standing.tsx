'use client';

import { useStandingsQuery } from '@/hooks/useStandingLeague';

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

  const addTotalGames = (team: any) => {
    return team.wins + team.draws + team.losses
  }

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
    <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
      <thead className="text-xs text-gray-600 uppercase bg-gray-100 dark:bg-[#1f1f1f] dark:text-gray-400">
        <tr>
          <th className="px-2 py-2 text-center"></th>
          <th className="px-2 py-2">Equipo</th>
          <th className="px-2 py-2 text-center">PJ</th>
          <th className="px-2 py-2 text-center">G</th>
          <th className="px-2 py-2 text-center">E</th>
          <th className="px-2 py-2 text-center">P</th>
          <th className="px-2 py-2 text-center">Pts</th>
        </tr>
      </thead>
      <tbody>
        {/* TODO:tipar team */}
        {standing.map((team) => (
          <tr
            key={team.position}
            className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#333]"
          >
            <td className="px-2 py-2 text-center font-bold">{team.position}</td>
            <td className="px-2 py-2">{team.name}</td>
            <td className="px-2 py-2 text-center">{addTotalGames(team)}</td>
            <td className="px-2 py-2 text-center">{team.wins}</td>
            <td className="px-2 py-2 text-center">{team.draws}</td>
            <td className="px-2 py-2 text-center">{team.losses}</td>
            <td className="px-2 py-2 text-center font-semibold">
              {team.points}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
