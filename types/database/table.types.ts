//FIX
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
  id: string;
  userId: string;
  matchId: number;
  competitionId: number;
  homeScore: number;
  awayScore: number;
  points: null;
  createdAt: string;
  updatedAt: string;
}

// FIX
export interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}
