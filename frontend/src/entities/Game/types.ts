export interface Game {
  id: number;
  korName: string;
  engName: string;
  slug: string;
  active: boolean;
  priority: number;
  servers: string[];
}