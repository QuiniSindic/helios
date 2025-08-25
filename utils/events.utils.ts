import { leaguesIdMap, sportsList } from '@/constants/mappers';
import { MatchData, MatchStatus } from '@/types/custom.types';
import {
  ActionGroups,
  MatchEvent,
  MatchEventType,
  ParsedMinute,
} from '@/types/events/events.types';
import dayjs from 'dayjs';

export const NOT_LIVE: MatchStatus[] = ['NS', 'FT', 'Canc.'];
export const IS_LIVE: MatchStatus[] = ['HT', 'OT'];
export const IS_FINISHED: MatchStatus[] = ['FT', 'AET', 'AP'];

export function isLive(status: MatchStatus) {
  if (IS_LIVE.includes(status)) return true;
  return !NOT_LIVE.includes(status);
}

export const concatenateAndSortEvents = ({
  upcoming,
  live,
}: {
  upcoming: MatchData[];
  live: MatchData[];
}): MatchData[] => {
  const events = [...upcoming, ...live];

  return events.sort((a, b) => {
    const aLive = isLive(a.status);
    const bLive = isLive(b.status);
    if (aLive !== bLive) return aLive ? -1 : 1;

    const ak = dayjs(a.kickoff, 'HH:mm DD/MM/YYYY').valueOf();
    const bk = dayjs(b.kickoff, 'HH:mm DD/MM/YYYY').valueOf();
    return ak - bk;
  });
};

export const competitionIdsForSport = (sportName?: string): Set<number> => {
  if (!sportName) return new Set<number>();

  const sport = sportsList.find((s) => s.name === sportName);
  if (!sport) return new Set<number>();

  const ids = sport.leagues
    .map((lg) => leaguesIdMap[lg])
    .filter((id): id is number => typeof id === 'number');

  return new Set(ids);
};

export function isEndOfHalf(t: MatchEventType) {
  return (
    t === MatchEventType.HalfTime ||
    t === MatchEventType.FinalTime ||
    t === MatchEventType.Overtime
  );
}

export function parseMinute(
  minute: number | string | null | undefined,
  extra?: number | null,
): ParsedMinute {
  if (minute == null) return { min: 0, extra: 0, total: 0, label: '' };

  if (typeof minute === 'number') {
    const ex = extra ?? 0;
    return {
      min: minute,
      extra: ex,
      total: minute + ex,
      label: ex > 0 ? `${minute}+${ex}'` : `${minute}'`,
    };
  }

  const s = String(minute).trim().replace("'", '');
  if (s.includes('+')) {
    const [mm, ee] = s.split('+');
    const min = Number(mm) || 0;
    const ex = Number(ee) || 0;
    return { min, extra: ex, total: min + ex, label: `${min}+${ex}'` };
  }

  const min = Number(s) || 0;
  return { min, extra: 0, total: min, label: `${min}'` };
}

export function makeActionGroupsForMatch(actions: MatchEvent[]) {
  const sorted = [...actions].sort((a, b) => {
    const pa = parseMinute(a.minute, a.extraMinute);
    const pb = parseMinute(b.minute, b.extraMinute);
    return pb.total - pa.total;
  });
  const groups: ActionGroups = {
    firstHalf: [],
    secondHalf: [],
  };

  for (const action of sorted) {
    const { total } = parseMinute(action.minute, action.extraMinute);

    if (total <= 45) groups.firstHalf.push(action);
    else groups.secondHalf.push(action);
  }

  return groups;
}
