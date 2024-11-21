import axios from 'axios';
import { BoardGame, BoardGameInput } from '../types/types';

const API_URL = 'http://localhost:3001'; // URL du json-server local

export const boardGameService = {
  getAll: async (): Promise<BoardGame[]> => {
    const response = await axios.get(`${API_URL}/games`);
    return response.data;
  },

  create: async (game: BoardGameInput): Promise<BoardGame> => {
    const response = await axios.post(`${API_URL}/games`, game);
    return response.data;
  },

  update: async (id: number, game: BoardGameInput): Promise<BoardGame> => {
    const response = await axios.put(`${API_URL}/games/${id}`, game);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/games/${id}`);
  }
}; 