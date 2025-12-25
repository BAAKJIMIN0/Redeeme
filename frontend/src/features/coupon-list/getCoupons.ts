import axios from 'axios';
import type { Coupon } from '../../entities/Coupon/types';

// 백엔드에서 오는 원본 데이터 타입 정의 (스네이크 케이스)
interface RawCoupon {
  id: number;
  game_id: number;
  kor_name: string;
  eng_name: string;
  code: string;
  description: string;
  server: string;
  reward: string;
  started_at: string;  // 👈 스네이크 케이스
  expired_at: string;  // 👈 스네이크 케이스
  slug: string;
  quickUrl: string | null;
}

export const getCoupons = async (): Promise<Coupon[]> => {
  const response = await axios.get<RawCoupon[]>('http://localhost:8080/api/coupons');
  
  return response.data.map((raw) => ({
    id: raw.id,
    game_id: raw.game_id,
    kor_name: raw.kor_name,
    eng_name: raw.eng_name,
    code: raw.code,
    description: raw.description,
    server: raw.server,
    reward: raw.reward,
    startedAt: raw.started_at,
    expiredAt: raw.expired_at,
    slug: raw.slug,
    quickUrl: raw.quickUrl ?? undefined,
  }));
};