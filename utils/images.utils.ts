export const getTeamLogoSrc = (baseUrl: string, img?: string | null) =>
  img ? `${baseUrl}${img}` : '/globe.svg';
