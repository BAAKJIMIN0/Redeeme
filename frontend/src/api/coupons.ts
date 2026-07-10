import axios from 'axios';
import type { Coupon, RewardItem } from '@/types';

interface RawCoupon {
  id: number;
  gameId: number;
  korName: string;
  engName: string;
  code: string;
  description: string;
  server: string;
  rewards: RewardItem[];
  createdAt: string;
  expiredAt: string;
  slug: string;
  quickUrl: string | null;
}

export const getCoupons = async (selectedGameIds?: number[]): Promise<Coupon[]> => {
  const response = await axios.get<RawCoupon[]>('http://localhost:8080/api/coupons', {
    params: {
      gameIds: selectedGameIds?.join(',')
    }
  });

  return response.data.map((raw) => ({
    id: raw.id,
    gameId: raw.gameId,
    korName: raw.korName,
    engName: raw.engName,
    code: raw.code,
    description: raw.description,
    server: raw.server,
    rewards: raw.rewards,
    createdAt: raw.createdAt,
    expiredAt: raw.expiredAt,
    slug: raw.slug,
    quickUrl: raw.quickUrl ?? undefined,
  }));
};
