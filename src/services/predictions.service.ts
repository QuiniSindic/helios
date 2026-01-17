import { BACKEND_URL } from '@/core/config';
import { Prediction } from '@/src/types/database/table.types';
import {
  PredictionPayload,
  PredictionUpdatePayload,
} from '@/src/types/prediction.types';
import { IResponse } from '@/src/types/response.types';

export async function getEventPredictions(
  eventId: number,
): Promise<Prediction[]> {
  const response = await fetch(
    `${BACKEND_URL}/predictions?eventId=${eventId}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch event predictions');
  }
  const result = await response.json();

  if (!result.ok) {
    throw new Error(result.error || 'Failed to fetch event predictions');
  }

  return result.data;
}

export async function saveEventPrediction(matchPayload: PredictionPayload) {
  const response = await fetch(`${BACKEND_URL}/predictions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      ...matchPayload,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to post event prediction');
  }

  const data = (await response.json()) as IResponse<Prediction>;

  return data;
}

export async function updateEventPrediction(
  eventId: number,
  updatePayload: PredictionUpdatePayload,
) {
  const response = await fetch(`${BACKEND_URL}/predictions/${eventId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      ...updatePayload,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update event prediction');
  }

  const data = (await response.json()) as IResponse<Prediction>;

  return data;
}

export async function getUserMatchPrediction(eventId: number) {
  const response = await fetch(
    `${BACKEND_URL}/predictions/my-prediction?eventId=${eventId}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user match prediction');
  }

  const result = await response.json();

  if (!result.ok) {
    throw new Error(result.error || 'Failed to fetch user match prediction');
  }

  return result.data;
}
