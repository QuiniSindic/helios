export interface LaLigaPredictionPayload {
  event_id: number | string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  user_id: string;
  event_name: string;
  competition_id: number;
  competition_name: string;
}
