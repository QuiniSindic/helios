export interface FootballEvents {
  events: Event[];
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
  hasEventPlayerHeatMap?: boolean;
  detailId?: number;
  crowdsourcingDataDisplayEnabled: boolean;
  id: number;
  startTimestamp: number;
  slug: string;
  finalResultOnly: boolean;
  feedLocked: boolean;
  isEditor: boolean;
  awayRedCards?: number;
  homeRedCards?: number;
  statusTime?: StatusTime;
  lastPeriod?: string;
  streamContentId?: number;
  streamContentGeoRestrictions?: string[];
}

export interface StatusTime {
  prefix: string;
  initial: number;
  max: number;
  timestamp?: number;
  extra: number;
}

export interface Changes {
  changes?: string[];
  changeTimestamp: number;
}

export interface Time {
  injuryTime1?: number;
  injuryTime2?: number;
  currentPeriodStartTimestamp?: number;
  initial?: number;
  max?: number;
  extra?: number;
}

export interface Score {
  current?: number;
  display?: number;
  period1?: number;
  period2?: number;
  normaltime?: number;
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
  country: Country2;
  entityType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export interface Country2 {
  alpha2: string;
  alpha3: string;
  name: string;
  slug: string;
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
}

export interface UniqueTournament {
  name: string;
  slug: string;
  category: Category;
  userCount: number;
  id: number;
  hasEventPlayerStatistics: boolean;
  displayInverseHomeAwayTeams: boolean;
  hasPerformanceGraphFeature?: boolean;
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
  alpha2?: string;
  alpha3?: string;
  name?: string;
  slug?: string;
}

export interface Sport {
  name: string;
  slug: string;
  id: number;
}
