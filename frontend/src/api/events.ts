import axios from 'axios';
import { API_BASE_URL } from '@/api/config';
import type { GameEvent } from '@/types';

export const getEvents = async (from: string, to: string): Promise<GameEvent[]> => {
  const response = await axios.get<GameEvent[]>(`${API_BASE_URL}/api/events`, {
    params: { from, to },
  });

  return response.data;
};

export const reportEvent = async (token: string, data: Record<string, unknown>) => {
  const response = await axios.post(`${API_BASE_URL}/api/event-reports`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
