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

export interface MatchEvent {
  type: MatchEventType;
  minute?: number | string;
  extraMinute?: number;
  team?: number;
  playerName?: string;
  score?: string;
  extra?: string;
}

export interface MatchData {
  id: number;
  // home: TeamInfo;
  // away: TeamInfo;
  status: MatchStatus;
  result: string;
  kickoff: string; // 21:00 01/06/2025
  events?: MatchEvent[];
  homeId: number;
  awayId: number;
  competitionid: number;
  homeTeam: {
    id: number;
    name: string;
    abbr: string;
    img: string;
    country: string;
  };
  awayTeam: {
    id: number;
    name: string;
    abbr: string;
    img: string;
    country: string;
  };
  Odds: Odds;
}

export interface Odds {
  id: string;
  matchId: number;
  homeOdd: number;
  awayOdd: number;
  drawOdd: number;
}

export const MATCH_STATUSES = [
  'NS', // Not Started
  'HT', // Half Time
  'FT', // Full Time
  'OT', // Overtime no se si existe
  'AET', // After Extra Time
  'AP', // After Penalties
  'Canc.', // Cancelled
] as const;

export type MatchStatus = (typeof MATCH_STATUSES)[number];

export interface CompetitionData {
  id: string;
  name: string;
  fullName: string;
  badge: string;
  matches: MatchData[];
}

export interface TeamInfo {
  id: string;
  name: string;
  abbr: string;
  img: string | null;
  country: string;
}
