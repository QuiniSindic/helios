import { BACKEND_URL } from '@/core/config';
import { Competition } from '@/types/database/table.types';
import { IResponse } from '@/types/response.types';

export async function getCompetition(
  id: number,
): Promise<IResponse<Competition>> {
  const res = await fetch(`${BACKEND_URL}/competitions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch competitions');
  }

  return res.json();
}

export async function getCompetitionsByIds(
  ids: number[],
): Promise<Competition[]> {
  if (!ids || ids.length === 0) return [];

  const res = await fetch(
    `${BACKEND_URL}/competitions/list?ids=${ids.join(',')}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch competitions');
  }

  const response = await res.json();

  if (!response.ok) {
    throw new Error('Failed to fetch competitions');
  }

  return response.data;
}
