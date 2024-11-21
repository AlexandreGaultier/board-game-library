export interface BoardGame {
  id: number;
  name: string;
  publisher: string;
  categories: string[];
  imageUrl: string;
  rating: number;
}

export type BoardGameInput = Omit<BoardGame, 'id'>; 