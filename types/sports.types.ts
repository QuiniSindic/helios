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
    leagues: [
      'La Liga',
      'Premier League',
      'Bundesliga',
      'Serie A',
      'Ligue 1',
      'Champions League',
      'Europa League',
    ],
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
  'Champions League': 'UEFA Champions League',
  'Europa League': 'UEFA Europa League',
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

export const footballCompetitions = {
  // 5 grandes ligas
  'Premier League': 17,
  'La Liga': 8,
  Bundesliga: 35,
  'Serie A': 23,
  'Ligue 1': 34,

  // Futbol ingles
  'Fa Cup': 19,
  'EFL Cup': 21,
  'Community Shield': 346,

  // Futbol español
  'Copa del Rey': 329,
  'Supercopa de España': 213,
  'Liga Hypermotion': 54,

  // competiones europeas
  'Champions League': 7,
  'Europa League': 679,
  'Europa Conference League': 17015,
  'Supercopa Europa': 465,

  // competiciones de selecciones (masculinas)
  Eurocopa: 1,
  'Copa América': 133,
  Mundial: 16,
  'Nations League': 10783,
  Olimpiadas: 436,

  // competiciones de selecciones (femeninas)
  'Eurocopa (femenino)': 477,
  'Mundial (femenino)': 290,
  'Olimpiadas (femenino)': 437,

  // competiciones sudamericanas
  Libertadores: 384,

  'Mundial de clubes': 357,
};

export const basketballCompetitions = {
  // USA
  NBA: 132,
  'NBA All-Star': 875,

  // Europa
  EuroLiga: 138,

  // España
  'Liga ACB': 264,
  'Copa del Rey': 396,
  'Supercopa de España': 581,

  // competiciones de selecciones
  EuroBasket: 285,
  'Mundial FIBA': 441,
  Olimpiadas: 276,
  'Olimpiadas (femenino)': 440,
};

export const tennisCompetitions = {
  'Abierto de Australia': 2363,
  'Roland Garros': 2480,
  Wimbledon: 2361,
  'Abierto de Estados Unidos': 2449,
  'ATP Finals': 2517,
};

export const motorCompetitions = {
  'Fórmula 1': 40,
  MotoGP: 17,
};
