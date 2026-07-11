import { useState } from 'react';
import type { Coupon } from '@/types';
import { sortCoupons, filterCouponsByStatus } from '@/utils/couponFilters';
import type { SortMode, StatusFilter } from '@/utils/couponFilters';

const PAGE_SIZE = 30;

interface UsePagedCouponsParams {
  coupons: Coupon[];
  selectedGameIds: number[];
  sortMode: SortMode;
  statusFilter: StatusFilter;
}

export function usePagedCoupons({ coupons, selectedGameIds, sortMode, statusFilter }: UsePagedCouponsParams) {
  const [currentPage, setCurrentPage] = useState(1);

  const pageResetKey = `${selectedGameIds.join(',')}|${sortMode}|${statusFilter}`;
  const [prevPageResetKey, setPrevPageResetKey] = useState(pageResetKey);
  if (pageResetKey !== prevPageResetKey) {
    setPrevPageResetKey(pageResetKey);
    setCurrentPage(1);
  }

  const sortedCoupons = sortCoupons(filterCouponsByStatus(coupons, statusFilter), sortMode);
  const totalPages = Math.ceil(sortedCoupons.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const pagedCoupons = sortedCoupons.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return { pagedCoupons, currentPage: safePage, totalPages, setCurrentPage };
}
