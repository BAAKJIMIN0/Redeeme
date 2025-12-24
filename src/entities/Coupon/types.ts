export interface Coupon {
  id: number;
  game_id: number;
  kor_name: string;
  eng_name: string;
  code: string;
  description?: string;
  server: string;
  reward: string;
  startedAt: string;
  expiredAt: string;
  slug: string;
}