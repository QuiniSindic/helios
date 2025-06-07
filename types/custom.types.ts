export enum MatchEventType {
  Goal = 36,
  PenaltyGoal = 41,
  FailedPenalty = 40,
  YellowCard = 43,
  RedCard = 45,
  HalfTime,
  FinalTime,
  Overtime,
  None,
}

export interface MatchEvent  {
  type: MatchEventType;
  minute?: number | string;
  extraMinute?: number;
  team?: number;
  playerName?: string;
  score?: string;
  extra?: string;
};

export interface MatchData {
  id: string;
  home: TeamInfo;
  away: TeamInfo;
  status: MatchStatus;
  result: string;
  kickoff: string; // 21:00 01/06/2025
  events: MatchEvent[];
};

export const MATCH_STATUSES = [
  'NS',         // Not Started
  // editar los siguientes en funcón de livescore, porque estos son de la liga
  'PreMatch',
  'FirstHalf',
  'HalfTime',
  'SecondHalf',
  'FullTime',
  "Canceled",

] as const;

export type MatchStatus = typeof MATCH_STATUSES[number];


export interface CompetitionData {
  id: string;
  name: string;
  fullName: string;
  badge: string;
  matches: MatchData[];
};

export interface TeamInfo  {
  id: string;
  name: string;
  abbr: string;
  img: string | null;
  country: string;
};
