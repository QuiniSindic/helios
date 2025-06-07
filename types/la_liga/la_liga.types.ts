/* eslint-disable @typescript-eslint/no-explicit-any */
// INTERFACES JORNADA ACTUAL

export interface GameweekResponse {
  gameweek: Gameweek;
}

export interface Gameweek {
  id: number;
  week: number;
  name: string;
  shortname: string;
  date: string;
}

// INTERFACES PARTIDOS

export interface Matches {
  matches: Match[];
}

export type MatchStatus =
  | 'PreMatch'
  | 'Canceled'
  | 'FullTime'
  | 'FirstHalf'
  | 'HalfTime'
  | 'SecondHalf';

export interface Match {
  id: number;
  name: string;
  slug: string;
  date: string;
  time: string;
  hashtag: string;
  home_score?: number;
  away_score?: number;
  status: MatchStatus;
  home_team: Team;
  away_team: Team;
  venue: Venue;
  persons_role: Personsrole[];
  subscription: Subscription;
  is_brand_day: boolean;
  temperature: Temperature;
  ball: Ball;

  attempt_official?: boolean;
  opta_id?: string;
  season?: Season;
  gameweek?: Gameweek;
  competition?: Competition;
  points_calculated?: boolean;
}

export interface Competition {
  id: number;
  name: string;
  slug: string;
  opta_id: string;
}

export interface Gameweek {
  week: number;
  name: string;
  shortname: string;
}

export interface Season {
  id: number;
  name: string;
  opta_id: string;
}

export interface Ball {
  id: number;
  name: string;
  image: string;
}

export interface Temperature {
  enabled_historical: boolean;
  enabled_forecast: boolean;
}

export interface Subscription {
  id: number;
  name?: string; // optional?
  slug: string;
  teams: any[];
  rounds: any[];
}

export interface Personsrole {
  person: Person;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
}

export interface Person {
  name: string;
  nickname: string;
  firstname: string;
  lastname: string;
}

export interface Venue {
  name: string;
}

export interface Team {
  id: number;
  slug: string;
  name: string;
  nickname: string;
  boundname: string;
  shortname: string;
  sprite_status: string;
  shield: Shield;
  competitions: any[];
  opta_id?: string; // optional
  color?: string; // optional
  color_secondary?: string; // optional
}

export interface Shield {
  id: number;
  url: string;
}
