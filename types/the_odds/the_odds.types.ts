export interface TheOddsEvent {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
}

export interface Event {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: {
    name: string;
    logo: string;
  };
  away_team: {
    name: string;
    logo: string;
  };
}
