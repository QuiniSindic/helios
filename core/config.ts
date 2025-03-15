export const QUINIELA_DATA_URL =
  process.env.QUINIELA_DATA_URL ||
  'https://www.loteriasyapuestas.es/servicios/fechav3?game_id=LAQU&fecha_sorteo=';

export const BASE_URL =
  process.env.NEXT_PUBLIC_PROD_URL ||
  process.env.NEXT_PUBLIC_DEV_URL ||
  'http://localhost:3000';

export const PROJECT_ID = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID || '';
export const LOGOS_BUCKET_NAME =
  process.env.NEXT_PUBLIC_SUPABASE_LOGOS_BUCKET_NAME || '';

export const THE_ODDS_API_KEY = process.env.THE_ODDS_API_KEY;
export const THE_ODDS_API_URL =
  process.env.THE_ODDS_API_URL || 'https://api.the-odds-api.com/v4';
