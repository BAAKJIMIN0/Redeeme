import axios from 'axios';
import type { Game } from '../model/types';

export const getGames = async (): Promise<Game[]> => {
  const response = await axios.get<Game[]>('http://localhost:8080/api/games');
  return response.data;
};