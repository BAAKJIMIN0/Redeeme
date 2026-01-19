import { useState, useEffect } from 'react';
import type { Coupon } from './types';
import { getCoupons } from '../api/getCoupons';

export const useCoupons = (selectedGameIds: number[] = []) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAllSelected = selectedGameIds.length === 0;

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setIsLoading(true);
        const data = await getCoupons(
          isAllSelected ? undefined : selectedGameIds
        );
        setCoupons(data);
      } catch (error) {
        console.error('쿠폰 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, [selectedGameIds, isAllSelected]);

  return { coupons, isLoading };
};