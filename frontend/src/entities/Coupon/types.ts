export interface RewardItem {
  item: string;
  amount: string;
}

export interface Coupon {
  id: number;
  gameId: number;
  korName: string;
  engName: string;
  code: string;
  description?: string;
  server: string;
  rewards: RewardItem[];
  startedAt: string;
  expiredAt?: string;
  slug: string;
  quickUrl?: string;
}