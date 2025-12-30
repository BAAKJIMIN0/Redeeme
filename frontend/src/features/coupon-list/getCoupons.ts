import axios from 'axios';
import type { Coupon } from '../../entities/Coupon/types';
import type { RewardItem } from '../../entities/Coupon/types';

interface RawCoupon {
  id: number;
  gameId: number;
  korName: string;
  engName: string;
  code: string;
  description: string;
  server: string;
  rewards: RewardItem[];
  startedAt: string;
  expiredAt: string;
  slug: string;
  quickUrl: string | null;
}

export const getCoupons = async (): Promise<Coupon[]> => {
  const response = await axios.get<RawCoupon[]>('http://localhost:8080/api/coupons');
  
  return response.data.map((raw) => ({
    id: raw.id,
    gameId: raw.gameId,
    korName: raw.korName,
    engName: raw.engName,
    code: raw.code,
    description: raw.description,
    server: raw.server,
    rewards: raw.rewards,
    startedAt: raw.startedAt,
    expiredAt: raw.expiredAt,
    slug: raw.slug,
    quickUrl: raw.quickUrl ?? undefined,
  }));
};