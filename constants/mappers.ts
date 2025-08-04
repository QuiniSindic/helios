export const sportsList = [
  {
    name: 'Fútbol',
    leagues: [
      'La Liga',
      'Premier League',
      'Bundesliga',
      'Serie A',
      'Ligue 1',
      'La Liga Hypermotion',
      'Champions League',
      'Europa League',
      'Copa del Rey',
      'Mundial de Clubes',
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
  // {
  //   name: 'Ciclismo',
  //   leagues: ['Giro de Italia', 'Tour de Francia', 'Vuelta a España'],
  // },
];

export const sportsMap: { [key: string]: string } = {
  Fútbol: 'football',
  Baloncesto: 'basketball',
  Tenis: 'tennis',
  Motor: 'motor',
  Ciclismo: 'cycling',
};

export const leaguesMap: { [key: string]: string } = {
  'Mundial de Clubes': 'club-worldcup',
  'La Liga Hypermotion': 'la-liga-hypermotion',
  'La Liga': 'la-liga',
  'Premier League': 'premier-league',
  Bundesliga: 'bundesliga',
  'Serie A': 'serie-a',
  'Ligue 1': 'ligue-1',
  'UEFA Champions League': 'uefa-champions-league',
  // FIX SLUGS
  'Europa League': 'UEFA Europa League',
  NBA: 'NBA',
  Euroliga: 'Euroleague',
  'Abierto de Australia': 'Australian Open',
  'Roland Garros': 'Roland Garros',
  Wimbledon: 'Wimbledon',
  'Abierto de Estados Unidos': 'US Open',
  // 'Fórmula 1': 'formula-1',
  // MotoGP: 'motogp',
  // 'Giro de Italia': 'giro-de-italia',
  // 'Tour de Francia': 'tour-de-francia',
  // 'Vuelta a España': 'vuelta-a-espana',
};
