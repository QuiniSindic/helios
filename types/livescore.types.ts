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

export type MatchEvent = {
  type: MatchEventType;
  minute?: number | string;
  extraMinute?: number;
  team?: number;
  playerName?: string;
  score?: string;
  extra?: string;
};

export type MatchData = {
  id: string;
  home: TeamInfo;
  away: TeamInfo;
  status: string;
  result: string;
  kickoff: string; // 21:00 01/06/2025
  events: MatchEvent[];
};

export type CompetitionData = {
  id: string;
  name: string;
  fullName: string;
  badge: string;
  matches: MatchData[];
};

export type TeamInfo = {
  id: string;
  name: string;
  abbr: string;
  img: string | null;
  country: string;
};
