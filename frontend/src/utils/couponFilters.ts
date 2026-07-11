import type { Coupon } from '@/types';

export type SortMode = 'latest' | 'expiry';
export type StatusFilter = 'all' | 'available' | 'expired';

export const isExpired = (expiredAt?: string) => {
  if (!expiredAt) return false;
  return new Date(expiredAt) < new Date();
};

export function filterCouponsByStatus(coupons: Coupon[], status: StatusFilter): Coupon[] {
  if (status === 'all') return coupons;
  return coupons.filter((coupon) =>
    status === 'expired' ? isExpired(coupon.expiredAt) : !isExpired(coupon.expiredAt)
  );
}

export function sortCoupons(coupons: Coupon[], mode: SortMode): Coupon[] {
  const sorted = [...coupons];

  return sorted.sort((a, b) => {
    const aExpired = isExpired(a.expiredAt);
    const bExpired = isExpired(b.expiredAt);
    if (aExpired && !bExpired) return 1;
    if (!aExpired && bExpired) return -1;

    switch (mode) {
      case 'latest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

      case 'expiry':
        if (!a.expiredAt && !b.expiredAt) return 0;
        if (!a.expiredAt) return 1;
        if (!b.expiredAt) return -1;
        return new Date(a.expiredAt).getTime() - new Date(b.expiredAt).getTime();
    }
  });
}
