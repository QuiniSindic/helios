export interface PredictionObject {
  competition_id: number | null;
  created_at: string | null;
  event_id: number | null;
  event_name: string | null;
  id: string;
  prediction: Prediction;
  profile_id: string | null;
  updated_at: string | null;
}

export interface Prediction {
  away_score: string;
  away_team: string;
  home_score: string;
  home_team: string;
}

export interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}
