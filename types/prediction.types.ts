export interface PredictionPayload {
  event_id: number;
  event_name: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  competition_id: number;
  competition_name?: string;
  user_id: string;
}
