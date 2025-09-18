'use client';

import TeamLogo from '@/components/ui/TeamLogo';
import { API_LOGO_COMPETITION_URL } from '@/core/config';
import { MatchData } from '@/types/events/events.types';
import { getTeamLogoSrc } from '@/utils/images.utils';
import Link from 'next/link';

export default function ResultRowCompact({ event }: { event: MatchData }) {
  const { id, homeTeam, awayTeam, result } = event;

  const [homeScore, awayScore] = result.split(' - ');

  const homeTeamLogo = getTeamLogoSrc(API_LOGO_COMPETITION_URL, homeTeam.img);
  const awayTeamLogo = getTeamLogoSrc(API_LOGO_COMPETITION_URL, awayTeam.img);

  return (
    <Link
      href={`/event/${id}`}
      className="block px-2 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm">
        {/* Local */}
        <div className="flex items-center gap-1.5 min-w-0">
          {homeTeam.img && (
            <TeamLogo
              src={homeTeamLogo}
              alt={homeTeam.name}
              size={18}
              className="shrink-0 rounded-sm"
            />
          )}
          <span className="truncate">{homeTeam.name}</span>
        </div>

        {/* Marcador */}
        <div className="flex items-center justify-center gap-1 font-semibold tabular-nums">
          <span>{homeScore}</span>
          <span>-</span>
          <span>{awayScore}</span>
        </div>

        {/* Visitante */}
        <div className="flex items-center gap-1.5 min-w-0 justify-end">
          <span className="truncate text-right">{awayTeam.name}</span>
          {awayTeam.img && (
            <TeamLogo
              src={awayTeamLogo}
              alt={awayTeam.name}
              size={18}
              className="shrink-0 rounded-sm"
            />
          )}
        </div>
      </div>
    </Link>
  );
}
