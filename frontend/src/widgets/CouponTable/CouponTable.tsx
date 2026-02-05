import { useState } from 'react'
import styles from './CouponTable.module.css'
import { CouponItem, useCoupons } from '@/entities/coupon/index.ts';
import type { Coupon } from '@/entities/coupon/index.ts';

type SortMode = 'default' | 'latest' | 'expiry';

const SORT_CYCLE: SortMode[] = ['default', 'latest', 'expiry'];
const SORT_LABEL: Record<SortMode, string> = {
  default: '기본',
  latest: '최신',
  expiry: '기한',
};

const isExpired = (expiredAt?: string) => {
  if (!expiredAt) return false;
  return new Date(expiredAt) < new Date();
};

function sortCoupons(coupons: Coupon[], mode: SortMode): Coupon[] {
  const sorted = [...coupons];
  const now = new Date();
  const threeDays = 3 * 24 * 60 * 60 * 1000;

  return sorted.sort((a, b) => {
    const aExpired = isExpired(a.expiredAt);
    const bExpired = isExpired(b.expiredAt);
    if (aExpired && !bExpired) return 1;
    if (!aExpired && bExpired) return -1;

    switch (mode) {
      case 'default': {
        const aExpDate = a.expiredAt ? new Date(a.expiredAt) : null;
        const bExpDate = b.expiredAt ? new Date(b.expiredAt) : null;
        const aImminent = aExpDate && !aExpired && (aExpDate.getTime() - now.getTime()) <= threeDays;
        const bImminent = bExpDate && !bExpired && (bExpDate.getTime() - now.getTime()) <= threeDays;

        if (aImminent && !bImminent) return -1;
        if (!aImminent && bImminent) return 1;
        if (aImminent && bImminent) return aExpDate!.getTime() - bExpDate!.getTime();

        if (aExpDate && bExpDate) {
          if (aExpired) return bExpDate.getTime() - aExpDate.getTime();
          return aExpDate.getTime() - bExpDate.getTime();
        }
        if (aExpDate) return -1;
        if (bExpDate) return 1;
        return 0;
      }
      case 'latest':
        return new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime();

      case 'expiry':
        if (!a.expiredAt && !b.expiredAt) return 0;
        if (!a.expiredAt) return 1;
        if (!b.expiredAt) return -1;
        return new Date(a.expiredAt).getTime() - new Date(b.expiredAt).getTime();
    }
  });
}

interface CouponTableProps {
  selectedGameIds: number[];
}

function CouponTable({ selectedGameIds }: CouponTableProps) {
  const { coupons } = useCoupons(selectedGameIds);
  const [sortMode, setSortMode] = useState<SortMode>('default');

  const cycleSortMode = () => {
    setSortMode((prev) => {
      const idx = SORT_CYCLE.indexOf(prev);
      return SORT_CYCLE[(idx + 1) % SORT_CYCLE.length];
    });
  };

  return(
    <table className={styles.table}>
      <colgroup>
        <col className={styles.colGame} />
        <col className={styles.colServer} />
        <col className={styles.colCode} />
        <col className={styles.colRewards} />
        <col className={styles.colDuration} />
      </colgroup>

      <thead>
        <tr>
          <th></th>
          <th>서버</th>
          <th>코드</th>
          <th>보상</th>
          <th className={styles.sortableHeader} onClick={cycleSortMode}>
            <span>기한</span>
            <span className={styles.sortRight}>
              ▼ <span className={styles.sortLabel}>{SORT_LABEL[sortMode]}</span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortCoupons(coupons, sortMode).map((coupon) => (
            <CouponItem key={coupon.id} coupon={coupon} />
          ))}
      </tbody>
    </table>
  )
}

export default CouponTable