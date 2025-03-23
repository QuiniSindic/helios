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