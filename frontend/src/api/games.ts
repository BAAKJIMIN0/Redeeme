import axios from 'axios';
import { API_BASE_URL } from '@/api/config';
import type { Game } from '@/types';

export const getGames = async (): Promise<Game[]> => {
  const response = await axios.get<Game[]>(`${API_BASE_URL}/api/games`);
  return response.data;
};
