'use client';
import { MatchData, MatchEvent } from '@/types/events/events.types';
import { parseMinute } from '@/utils/events.utils';
import React from 'react';
import { TypeIcon } from '../../EventIcons';
import { ActionData } from './ActionData';
import { MinuteBadge } from './MinuteBadge';
import { ScoreBadge } from './ScoreBadge';

interface ActionRowProps {
  matchEvent: MatchEvent;
  event: MatchData;
}

export const ActionRow: React.FC<ActionRowProps> = ({ matchEvent, event }) => {
  const minute = parseMinute(matchEvent.minute, matchEvent.extraMinute);
  const isHome = matchEvent.team === 1;
  const teamName = isHome ? event.homeTeam.name : event.awayTeam.name;
  const hasAssist = !!matchEvent.extra && matchEvent.extra !== '-';

  return (
    <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-3 rounded-xl border border-secondary bg-white/60 dark:bg-gray-900/40 px-4 py-3 shadow-sm">
      <MinuteBadge label={minute.label} />

      <div className="shrink-0 inline-flex items-center justify-center">
        <TypeIcon type={matchEvent.type} />
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
