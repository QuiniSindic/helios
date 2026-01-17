import { BACKEND_URL } from '@/core/config';

export const getStandingLeagues = async (competitionSlug: string) => {
  const competition = competitionSlug.toLowerCase();
  const response = await fetch(
    `${BACKEND_URL}/competitions/standing/${competition}`,
  );

  const data = await response.json();

  if (!data.ok) {
    throw new Error(data.error || `Error fetching standing for ${competition}`);
  }

  const teams = data.data.teams;

  return teams;
};
