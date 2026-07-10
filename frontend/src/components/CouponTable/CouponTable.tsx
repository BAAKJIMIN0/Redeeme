import { useState } from 'react'
import styles from './CouponTable.module.css'
import { CouponItem } from '@/components/CouponItem/CouponItem';
import { useCoupons } from '@/hooks/useCoupons';
import type { Coupon } from '@/types';

type SortMode = 'latest' | 'expiry';

const SORT_CYCLE: SortMode[] = ['latest', 'expiry'];
const SORT_LABEL: Record<SortMode, string> = {
  latest: '최신',
  expiry: '기한',
};

const isExpired = (expiredAt?: string) => {
  if (!expiredAt) return false;
  return new Date(expiredAt) < new Date();
};

function sortCoupons(coupons: Coupon[], mode: SortMode): Coupon[] {
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

interface CouponTableProps {
  selectedGameIds: number[];
}

function CouponTable({ selectedGameIds }: CouponTableProps) {
  const { coupons } = useCoupons(selectedGameIds);
  const [sortMode, setSortMode] = useState<SortMode>('latest');

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
