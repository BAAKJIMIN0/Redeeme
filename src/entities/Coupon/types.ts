export interface Coupon {
  id: number;
  game: string;
  code: string;
  description?: string;
  server: string;
  reward: string;
  startedAt: string;
  expiredAt: string;
  ddayDate: string;
}