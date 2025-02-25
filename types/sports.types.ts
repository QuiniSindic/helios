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
      'Copa del Rey',
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
  'La Liga': 'LaLiga',
  'Premier League': 'Premier League',
  Bundesliga: 'Bundesliga',
  'Serie A': 'Serie A',
  'Ligue 1': 'Ligue 1',
  'Champions League': 'UEFA Champions League',
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

export const competitionsSeasons = {
  'World Cup': {
    id: 16,
    seasons: {
      '1930': 40712,
      '1934': 17559,
      '1938': 17560,
      '1950': 40714,
      '1954': 17561,
      '1958': 17562,
      '1962': 17563,
      '1966': 17564,
      '1970': 17565,
      '1974': 17566,
      '1978': 17567,
      '1982': 17568,
      '1986': 17569,
      '1990': 17570,
      '1994': 17571,
      '1998': 1151,
      '2002': 2636,
      '2006': 16,
      '2010': 2531,
      '2014': 7528,
      '2018': 15586,
      '2022': 41087,
    },
  },
  Euros: {
    id: 1,
    seasons: {
      '1960': 27044,
      '1964': 27045,
      '1968': 27047,
      '1972': 27050,
      '1976': 27049,
      '1980': 27046,
      '1984': 27048,
      '1988': 27051,
      '1992': 27052,
      '1996': 27053,
      '2000': 358,
      '2004': 356,
      '2008': 1162,
      '2012': 4136,
      '2016': 11098,
      '2021': 26542,
      '2024': 56953,
    },
  },
  'Copa America': {
    id: 133,
    seasons: {
      '2016': 11115,
      '2019': 22352,
      '2021': 26681,
      '2024': 57114,
    },
  },
  'Premier League': {
    id: 17,
    seasons: {
      '15/16': 10356,
      '16/17': 11733,
      '17/18': 13380,
      '18/19': 17359,
      '19/20': 23776,
      '20/21': 29415,
      '21/22': 37036,
      '22/23': 41886,
      '23/24': 52186,
      '24/25': 61627,
    },
  },
  'La Liga': {
    id: 8,
    seasons: {
      '15/16': 10495,
      '16/17': 11906,
      '17/18': 13662,
      '18/19': 18020,
      '19/20': 24127,
      '20/21': 32501,
      '21/22': 37223,
      '22/23': 42409,
      '23/24': 52376,
      '24/25': 61643,
    },
  },
  Bundesliga: {
    id: 35,
    seasons: {
      '15/16': 10419,
      '16/17': 11818,
      '17/18': 13477,
      '18/19': 17597,
      '19/20': 23538,
      '20/21': 28210,
      '21/22': 37166,
      '22/23': 42268,
      '23/24': 52608,
      '24/25': 63516,
    },
  },
  'Serie A': {
    id: 23,
    seasons: {
      '15/16': 10596,
      '16/17': 11966,
      '17/18': 13768,
      '18/19': 17932,
      '19/20': 24644,
      '20/21': 32523,
      '21/22': 37475,
      '22/23': 42415,
      '23/24': 52760,
      '24/25': 63515,
    },
  },
  'Ligue 1': {
    id: 34,
    seasons: {
      '15/16': 10373,
      '16/17': 11648,
      '17/18': 13384,
      '18/19': 17279,
      '19/20': 23872,
      '20/21': 28222,
      '21/22': 37167,
      '22/23': 42273,
      '23/24': 52571,
      '24/25': 61736,
    },
  },
  'Copa Libertadores': {
    id: 384,
    seasons: {
      '2018': 15806,
      '2019': 19989,
      '2020': 26785,
      '2021': 35576,
      '2022': 40174,
      '2023': 47974,
      '2024': 57296,
    },
  },
  'La Liga 2': {
    id: 54,
    seasons: {
      '20/21': 32502,
      '21/22': 37225,
      '22/23': 42410,
      '23/24': 52563,
      '24/25': 62048,
    },
  },
  'Champions League': {
    id: 7,
    seasons: {
      '03/04': 12,
      '04/05': 13,
      '05/06': 14,
      '06/07': 15,
      '07/08': 603,
      '08/09': 1664,
      '09/10': 1825,
      '10/11': 2764,
      '11/12': 3402,
      '12/13': 4788,
      '13/14': 6359,
      '14/15': 8226,
      '15/16': 10390,
      '16/17': 11773,
      '17/18': 13415,
      '18/19': 17351,
      '19/20': 23766,
      '20/21': 29267,
      '21/22': 36886,
      '22/23': 41897,
      '23/24': 52162,
      '24/25': 61644,
    },
  },
};
