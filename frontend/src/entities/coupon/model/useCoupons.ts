import { useState, useEffect } from 'react';
import type { Coupon } from './types';
import { getCoupons } from '../api/getCoupons';

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllCoupons = async () => {
      try {
        setIsLoading(true);
        const data = await getCoupons();
        setCoupons(data);
      } catch (error) {
        console.error("전체 쿠폰 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCoupons();
  }, []);

  return { coupons, isLoading };
};