import { Periods, Score, Status, Team, Tournament } from "./event.types";

export interface ParsedFootballEvent {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: Score;
  awayScore: Score;
  status: Status;
  startTimestamp: number;
  tournament: Tournament;
}

export interface ParsedBasketballEvent {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: Score;
  awayScore: Score;
  status: Status;
  startTimestamp: number;
  tournament: Tournament;
  periods: Periods;
}

export type ParsedEvent = ParsedFootballEvent | ParsedBasketballEvent;
