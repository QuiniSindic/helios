/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Standings {
  standings: Standing[];
}

export interface Standing {
  tournament: Tournament;
  name: string;
  type: string;
  descriptions: any[];
  tieBreakingRule: TieBreakingRule;
  rows: Row[];
  id: number;
  updatedAtTimestamp: number;
}

export interface Row {
  team: Team;
  descriptions: any[];
  promotion?: TieBreakingRule;
  position: number;
  matches: number;
  wins: number;
  scoresFor: number;
  scoresAgainst: number;
  id: number;
  losses: number;
  draws: number;
  points: number;
  scoreDiffFormatted: string;
}

export interface Team {
  name: string;
  slug: string;
  shortName: string;
  gender: string;
  sport: Sport;
  userCount: number;
  nameCode: string;
  disabled: boolean;
  national: boolean;
  type: number;
  id: number;
  country: Country;
  entityType: string;
  teamColors: TeamColors;
  fieldTranslations: FieldTranslations;
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
  ar: string;
  ru: string;
  hi: string;
  bn?: string;
}

export interface TeamColors {
  primary: string;
  secondary: string;
  text: string;
}

export interface TieBreakingRule {
  text: string;
  id: number;
}

export interface Tournament {
  name: string;
  slug: string;
  category: Category;
  uniqueTournament: UniqueTournament;
  priority: number;
  isGroup: boolean;
  isLive: boolean;
  id: number;
}

export interface UniqueTournament {
  name: string;
  slug: string;
  primaryColorHex: string;
  secondaryColorHex: string;
  category: Category;
  userCount: number;
  hasPerformanceGraphFeature: boolean;
  id: number;
  country: Country2;
  displayInverseHomeAwayTeams: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Country2 {}

export interface Category {
  id: number;
  country: Country;
  name: string;
  slug: string;
  sport: Sport;
  flag: string;
  alpha2: string;
}

export interface Sport {
  name: string;
  slug: string;
  id: number;
}

export interface Country {
  alpha2: string;
  alpha3: string;
  name: string;
  slug: string;
}
