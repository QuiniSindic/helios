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

export interface Competition {
  id: number;
  name: string;
  fullname: string;
  badge: string;
  type?: number;
  //   matches: Match[];
  //   predictions: Prediction[];
}
