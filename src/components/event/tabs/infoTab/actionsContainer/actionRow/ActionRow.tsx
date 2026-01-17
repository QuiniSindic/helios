'use client';
import { MatchData, MatchEvent } from '@/src/types/events/events.types';
import { parseMinute } from '@/src/utils/events.utils';
import React from 'react';
import { TypeIcon } from '../../EventIcons';
import { ActionData } from './ActionData';
import { MinuteBadge } from './MinuteBadge';
import { ScoreBadge } from './ScoreBadge';

interface ActionRowProps {
  matchEvent: MatchEvent;
  event: MatchData;
  isPenalties?: boolean;
}

export const ActionRow: React.FC<ActionRowProps> = ({
  matchEvent,
  event,
  isPenalties = false,
}) => {
  const minute = parseMinute(matchEvent.minute, matchEvent.extraMinute);
  const isHome = matchEvent.team === 1;
  const teamName = isHome ? event.homeTeam.name : event.awayTeam.name;
  const hasAssist = !!matchEvent.extra && matchEvent.extra !== '-';

  return (
    <div
      className={`
        grid ${isPenalties ? 'grid-cols-[auto_1fr_auto]' : 'grid-cols-[auto_auto_1fr_auto]'}
        items-center gap-3 rounded-xl
        border border-gray-200 dark:border-gray-700
        bg-white/70 dark:bg-black/30
        px-4 py-3 shadow-xs
        hover:bg-white hover:shadow-md dark:hover:bg-black/50
        transition
      `}
    >
      {!isPenalties && <MinuteBadge label={minute.label} />}

      <div className="shrink-0 flex items-center justify-center">
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <TypeIcon type={matchEvent.type} />
        </div>
      </div>

      <ActionData
        playerName={matchEvent.playerName}
        teamName={teamName}
        assist={hasAssist ? matchEvent.extra : undefined}
      />

      <ScoreBadge score={matchEvent.score} />
    </div>
  );
};
