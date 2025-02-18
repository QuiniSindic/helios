/**
leagues: [
      'La Liga',
      'Premier League',
      'Bundesliga',
      'Serie A',
      'Ligue 1',

      'Champions League',
      'Europa League',
      'Conference League',

      'Libertadores',

      'Liga Hypermotion',
      'Copa del Rey',
      'Supercopa de España',
      'Supercopa Europa',

      'Fa Cup',
      'EFL Cup',

      'Mundialito',

      'Nations League',

      'Eurocopa',
      'Eurocopa (femenino)',

      'Copa América',

      'Mundial',
      'Mundial (femenino)',

      'Olimpiadas',
      'Olimpiadas (femenino)',
    ],
  */

export const sports = [
  {
    name: 'Fútbol',
    leagues: ['La Liga', 'Premier League', 'Bundesliga', 'Serie A', 'Ligue 1'],
  },
  {
    name: 'Baloncesto',
    leagues: ['NBA', 'Euroliga'],
  },
  {
    name: 'Tenis',
    leagues: [
      'Abierto de Australia',
      'Roland Garros',
      'Wimbledon',
      'Abierto de Estados Unidos',
    ],
  },
  {
    name: 'Motor',
    leagues: ['Fórmula 1', 'MotoGP'],
  },
  {
    name: 'Ciclismo',
    leagues: ['Giro de Italia', 'Tour de Francia', 'Vuelta a España'],
  },
];

export const sportsMap: { [key: string]: string } = {
  Fútbol: 'football',
  Baloncesto: 'basketball',
  Tenis: 'tennis',
  Motor: 'motor',
  Ciclismo: 'cycling',
};

export const leaguesMap: { [key: string]: string } = {
  'La Liga': 'LaLiga',
  'Premier League': 'Premier League',
  Bundesliga: 'Bundesliga',
  'Serie A': 'Serie A',
  'Ligue 1': 'Ligue 1',
  // NBA: 'nba',
  // Euroliga: 'euroliga',
  // 'Abierto de Australia': 'australian-open',
  // 'Roland Garros': 'roland-garros',
  // Wimbledon: 'wimbledon',
  // 'Abierto de Estados Unidos': 'us-open',
  // 'Fórmula 1': 'formula-1',
  // MotoGP: 'motogp',
  // 'Giro de Italia': 'giro-de-italia',
  // 'Tour de Francia': 'tour-de-francia',
  // 'Vuelta a España': 'vuelta-a-espana',
};
