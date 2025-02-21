export const SOFASCORE_URL =
  process.env.NEXT_PUBLIC_SOFASCORE_DATA_URL ||
  'https://www.sofascore.com/api/v1';
export const SOFASCORE_IMG_URL =
  process.env.NEXT_PUBLIC_SOFASCORE_IMAGE_DATA_URL ||
  'https://img.sofascore.com/api/v1';

export const QUINIELA_DATA_URL =
  process.env.NEXT_PUBLIC_QUINIELA_DATA_URL ||
  'https://www.loteriasyapuestas.es/servicios/fechav3?game_id=LAQU&fecha_sorteo=';

export const PROJECT_ID = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID || '';
export const LOGOS_BUCKET_NAME =
  process.env.NEXT_PUBLIC_SUPBASE_LOGOS_BUCKET_NAME || '';
