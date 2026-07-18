import axios from 'axios';
import type { GameEvent } from '@/types';

export const getEvents = async (from: string, to: string): Promise<GameEvent[]> => {
  const response = await axios.get<GameEvent[]>('http://localhost:8080/api/events', {
    params: { from, to },
  });

  return response.data;
};

export const reportEvent = async (token: string, data: Record<string, unknown>) => {
  const response = await axios.post('http://localhost:8080/api/event-reports', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
