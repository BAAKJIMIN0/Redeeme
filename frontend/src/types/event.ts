export interface GameEvent {
  id: number;
  gameId: number;
  korName: string;
  engName: string;
  slug: string;
  title: string;
  description: string | null;
  eventDate: string;
  eventTime: string | null;
  link: string | null;
}

export interface GameEventReport {
  id: number;
  reporterId: number;
  gameId: number | null;
  korName: string;
  title: string;
  description: string | null;
  eventDate: string;
  eventTime: string | null;
  link: string | null;
  createdAt: string;
}
