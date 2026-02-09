import { useState, useEffect, useCallback } from 'react';
import type { Coupon } from './types';
import { getCoupons } from '../api/getCoupons';

export const useCoupons = (selectedGameIds: number[] = []) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAllSelected = selectedGameIds.length === 0;

  const fetchCoupons = useCallback(async () => {
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
  }, [selectedGameIds, isAllSelected]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const refetch = useCallback(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  return { coupons, isLoading, refetch };
};