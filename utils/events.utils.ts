import { leaguesIdMap, sportsList } from '@/constants/mappers';
import { MatchData, MatchStatus } from '@/types/custom.types';
import dayjs from 'dayjs';

const NOT_LIVE: MatchStatus[] = ['NS', 'FT', 'Canc.'];
const IS_LIVE: MatchStatus[] = ['HT', 'OT'];

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
