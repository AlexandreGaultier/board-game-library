export interface BoardGame {
  id: number;
  name: string;
  publisher: string;
  categories: string[];
  imageUrl: string;
  rating: number;
  releaseDate?: string;
  featured?: boolean;
  popularity?: number;
  isNew?: boolean;
  minPlayers?: number;
  maxPlayers?: number;
  duration?: {
    min: number;
    max: number;
  };
  complexity?: number;
  age?: number;
  languages?: string[];
  price?: number;
  setupTime?: number;
  rulesUrl?: string;
  videoUrl?: string;
  description?: string;
}

export type BoardGameInput = Omit<BoardGame, 'id'>; 