export const SOFASCORE_URL =
  process.env.SOFASCORE_DATA_URL || 'https://www.sofascore.com/api/v1';
export const SOFASCORE_IMG_URL =
  process.env.SOFASCORE_IMAGE_DATA_URL || 'https://img.sofascore.com/api/v1';

export const QUINIELA_DATA_URL =
  process.env.QUINIELA_DATA_URL ||
  'https://www.loteriasyapuestas.es/servicios/fechav3?game_id=LAQU&fecha_sorteo=';

export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const PROJECT_ID = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID || '';
export const LOGOS_BUCKET_NAME =
  process.env.NEXT_PUBLIC_SUPABASE_LOGOS_BUCKET_NAME || '';
