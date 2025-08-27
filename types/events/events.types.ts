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

export const eventTypeLabels: Record<MatchEventType, string> = {
  [MatchEventType.Goal]: 'Gol',
  [MatchEventType.PenaltyGoal]: 'Gol de penalti',
  [MatchEventType.FailedPenalty]: 'Penalti fallado',
  [MatchEventType.YellowCard]: 'Tarjeta amarilla',
  [MatchEventType.RedCard]: 'Tarjeta roja',
  [MatchEventType.HalfTime]: 'Descanso',
  [MatchEventType.FinalTime]: 'Final',
  [MatchEventType.Overtime]: 'Prórroga',
  [MatchEventType.None]: '',
};

export type ParsedMinute = {
  min: number;
  extra: number;
  total: number;
  label: string;
};

export type MatchEvent = {
  type: MatchEventType;
  minute?: number | string;
  extraMinute?: number;
  team?: number;
  playerName?: string;
  score?: string;
  extra?: string;
};

export interface MatchData {
  id: number;
  status: string; // TODO:  NS FT Canc. y mas
  result: string;
  kickoff: Date;
  events?: MatchEvent[];
  homeId: number;
  awayId: number;
  competitionid: number;
}

export type TeamInfo = {
  id: number;
  name: string;
  abbr: string;
  img: string | null;
  country: string;
};

export interface MatchFullData extends MatchData {
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
}

export interface EventsSportsResponse {
  football: {
    matches: MatchFullData[] | [];
  };
  basketball: {
    matches: MatchFullData[];
  };
  tennis: {
    matches: MatchFullData[];
  };
  motor: {
    matches: MatchFullData[];
  };
}

export interface ActionGroups {
  firstHalf: MatchEvent[];
  secondHalf: MatchEvent[];
  breaks?: MatchEvent[];
  finals?: MatchEvent[];
  overtime?: MatchEvent[]; // pal futuro igual lo necesito
}

export type FormValues = { home: string; away: string };
