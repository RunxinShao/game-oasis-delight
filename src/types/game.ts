
export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  releaseDate: string;
  developer: string;
  platforms: string[];
  featured?: boolean;
  screenshots?: string[];
  systemRequirements?: {
    minimum: string[];
    recommended: string[];
  };
}

export interface GameReview {
  id: string;
  gameId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}
