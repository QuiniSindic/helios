export const QUINIELA_DATA_URL =
  process.env.QUINIELA_DATA_URL ||
  'https://www.loteriasyapuestas.es/servicios/fechav3?game_id=LAQU&fecha_sorteo=';

export const PROJECT_ID = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID || '';

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export const API_LOGO_COMPETITION_URL =
  'https://lsm-static-prod.livescore.com/high/';

export const API_LOGO_COMPETITION_URL_V2 =
  'https://storage.livescore.com/images/team/high/teambadge/';

export const API_LOGO_COMPETITION_URL_LOW =
  'https://lsm-static-prod.livescore.com/medium/';

// para los escudos de las competiciones creo que solo funciona esta
export const API_COMPETITION_LOGO_URL =
  'https://storage.livescore.com/images/competition/high/';
