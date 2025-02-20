/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Match {
  event: MatchEvent;
}

export interface MatchEvent {
  tournament: Tournament;
  season: Season;
  roundInfo: RoundInfo;
  customId: string;
  status: Status;
  venue: Venue;
  referee: Referee;
  homeTeam: HomeTeam;
  awayTeam: AwayTeam;
  homeScore: Country;
  awayScore: Country;
  coverage: number;
  time: Country;
  changes: Changes;
  hasGlobalHighlights: boolean;
  hasXg: boolean;
  hasEventPlayerStatistics: boolean;
  hasEventPlayerHeatMap: boolean;
  detailId: number;
  crowdsourcingDataDisplayEnabled: boolean;
  id: number;
  defaultPeriodCount: number;
  defaultPeriodLength: number;
  defaultOvertimeLength: number;
  previousLegEventId: number;
  startTimestamp: number;
  slug: string;
  finalResultOnly: boolean;
  feedLocked: boolean;
  cupMatchesInRound: number;
  fanRatingEvent: boolean;
  seasonStatisticsType: string;
  showTotoPromo: boolean;
  isEditor: boolean;
}

export interface Changes {
  changes: string[];
  changeTimestamp: number;
}

export interface AwayTeam {
  name: string;
  slug: string;
  shortName: string;
  gender: string;
  sport: Sport;
  userCount: number;
  manager: Manager2;
  venue: Venue;
  nameCode: string;
  class: number;
  disabled: boolean;
  national: boolean;
  type: number;
  id: number;
  country: Country2;
  entityType: string;
  subTeams: any[];
  fullName: string;
  teamColors: TeamColors;
  foundationDateTimestamp: number;
  fieldTranslations: FieldTranslations4;
}

export interface FieldTranslations4 {
  nameTranslation: NameTranslation4;
  shortNameTranslation: Country;
}

export interface NameTranslation4 {
  ar: string;
  ru: string;
}

export interface Manager2 {
  id: number;
  country: Country2;
  name: string;
  slug: string;
  shortName: string;
  fieldTranslations: FieldTranslations3;
}

export interface FieldTranslations3 {
  nameTranslation: NameTranslation3;
  shortNameTranslation: NameTranslation3;
}

export interface NameTranslation3 {
  ar: string;
}

export interface HomeTeam {
  name: string;
  slug: string;
  shortName: string;
  gender: string;
  sport: Sport;
  userCount: number;
  manager: Manager;
  venue: Venue;
  nameCode: string;
  class: number;
  disabled: boolean;
  national: boolean;
  type: number;
  id: number;
  country: Country2;
  entityType: string;
  subTeams: any[];
  fullName: string;
  teamColors: TeamColors;
  foundationDateTimestamp: number;
  fieldTranslations: FieldTranslations2;
}

export interface FieldTranslations2 {
  nameTranslation: NameTranslation2;
  shortNameTranslation: NameTranslation;
}

export interface NameTranslation2 {
  ar: string;
  ru: string;
  hi: string;
  bn: string;
}

export interface TeamColors {
  primary: string;
  secondary: string;
  text: string;
}

export interface Manager {
  id: number;
  country: Country2;
  name: string;
  slug: string;
  shortName: string;
  fieldTranslations: FieldTranslations;
}

export interface FieldTranslations {
  nameTranslation: NameTranslation;
  shortNameTranslation: NameTranslation;
}

export interface NameTranslation {
  ar: string;
  hi: string;
  bn: string;
}

export interface Referee {
  name: string;
  slug: string;
  yellowCards: number;
  redCards: number;
  yellowRedCards: number;
  games: number;
  sport: Sport;
  id: number;
  country: Country2;
}

export interface Venue {
  city: City;
  venueCoordinates: VenueCoordinates;
  hidden: boolean;
  slug: string;
  name: string;
  capacity: number;
  id: number;
  country: Country2;
  stadium: Stadium;
}

export interface Stadium {
  name: string;
  capacity: number;
}

export interface Country2 {
  alpha2: string;
  alpha3: string;
  name: string;
  slug: string;
}

export interface VenueCoordinates {
  latitude: number;
  longitude: number;
}

export interface City {
  name: string;
}

export interface Status {
  code: number;
  description: string;
  type: string;
}

export interface RoundInfo {
  round: number;
  name: string;
  slug: string;
}

export interface Season {
  name: string;
  year: string;
  editor: boolean;
  seasonCoverageInfo: Country;
  id: number;
}

export interface Tournament {
  name: string;
  slug: string;
  category: Category;
  uniqueTournament: UniqueTournament;
  priority: number;
  isGroup: boolean;
  competitionType: number;
  id: number;
}

export interface UniqueTournament {
  name: string;
  slug: string;
  secondaryColorHex: string;
  category: Category;
  userCount: number;
  id: number;
  country: Country;
  hasPerformanceGraphFeature: boolean;
  hasEventPlayerStatistics: boolean;
  displayInverseHomeAwayTeams: boolean;
}

export interface Category {
  name: string;
  slug: string;
  sport: Sport;
  id: number;
  country: Country;
  flag: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Country {}

export interface Sport {
  name: string;
  slug: string;
  id: number;
}
