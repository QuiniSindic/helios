/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Events<T extends Event> {
  events: T[];
}

export interface Event {
  tournament: Tournament;
  season: Season;
  roundInfo?: RoundInfo;
  customId: string;
  status: Status;
  winnerCode?: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: Score;
  awayScore: Score;
  time: Time;
  changes: Changes;
  hasGlobalHighlights: boolean;
  hasEventPlayerStatistics?: boolean;
  crowdsourcingDataDisplayEnabled: boolean;
  id: number;
  startTimestamp: number;
  slug: string;
  finalResultOnly: boolean;
  feedLocked: boolean;
  isEditor: boolean;
}

export interface BasketballEvent extends Event {
  officials: any[];
  periods: Periods;
  coverage?: number;
  isAwarded?: boolean;
  previousLegEventId?: number;
  aggregatedWinnerCode?: number;
}

export interface FootballEvent extends Event {
  hasEventPlayerHeatMap?: boolean;
  detailId?: number;
  awayRedCards?: number;
  homeRedCards?: number;
  statusTime?: StatusTime;
  lastPeriod?: string;
  streamContentId?: number;
  streamContentGeoRestrictions?: string[];
}

export interface Periods {
  current: string;
  period1: string;
  period2: string;
  period3?: string;
  period4?: string;
  overtime: string;
}

export interface Changes {
  changes?: string[];
  changeTimestamp: number;
}

export interface Time {
  played?: number;
  periodLength?: number;
  overtimeLength?: number;
  totalPeriodCount?: number;
  currentPeriodStartTimestamp?: number;
  injuryTime1?: number;
  injuryTime2?: number;
  initial?: number;
  max?: number;
  extra?: number;
}

export interface Score {
  current?: number;
  display?: number;
  period1?: number;
  normaltime?: number;
  period2?: number;
  period3?: number;
  period4?: number;
  overtime?: number;
}

export interface Team {
  name: string;
  slug: string;
  shortName: string;
  gender: string;
  sport: Sport;
  userCount: number;
  nameCode: string;
  disabled?: boolean;
  national: boolean;
  type: number;
  id: number;
  country: Country;
  entityType: string;
  subTeams: any[];
  teamColors: TeamColors;
  fieldTranslations?: FieldTranslations;
  shield: string;
}

export interface FieldTranslations {
  nameTranslation: NameTranslation;
  shortNameTranslation: ShortNameTranslation;
}

export interface ShortNameTranslation {
  ar?: string;
  hi?: string;
  bn?: string;
}

export interface NameTranslation {
  ar?: string;
  ru?: string;
  hi?: string;
  bn?: string;
}

export interface TeamColors {
  primary: string;
  secondary: string;
  text: string;
}

export interface Status {
  code: number;
  description: string;
  type: string;
}

export interface RoundInfo {
  round: number;
  name?: string;
  cupRoundType?: number;
}

export interface Season {
  name: string;
  year: string;
  editor: boolean;
  id: number;
  seasonCoverageInfo?: SeasonCoverageInfo;
}

export interface SeasonCoverageInfo {
  editorCoverageLevel?: number;
}

export interface Tournament {
  name: string;
  slug: string;
  category: Category;
  uniqueTournament: UniqueTournament;
  priority: number;
  id: number;
  isGroup?: boolean;
  groupName?: string;
}

export interface UniqueTournament {
  name: string;
  slug: string;
  category: Category;
  userCount: number;
  hasPerformanceGraphFeature?: boolean;
  id: number;
  hasEventPlayerStatistics: boolean;
  displayInverseHomeAwayTeams: boolean;
  hasBoxScore?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  sport: Sport;
  id: number;
  country: Country;
  flag: string;
  alpha2?: string;
}

export interface Country {
  alpha2: string;
  alpha3: string;
  name: string;
  slug: string;
}

export interface Sport {
  name: string;
  slug: string;
  id: number;
}

export interface StatusTime {
  prefix: string;
  initial: number;
  max: number;
  timestamp?: number;
  extra: number;
}
