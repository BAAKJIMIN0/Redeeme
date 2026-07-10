import { useState } from 'react'
import styles from './AdminCouponTable.module.css'
import { useCoupons } from '@/hooks/useCoupons';
import { useGames } from '@/hooks/useGames';
import type { Coupon } from '@/types';
import AdminCouponItem from './AdminCouponItem';
import AdminCouponCreateRow from './AdminCouponCreateRow';

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

function AdminCouponTable({ selectedGameIds }: CouponTableProps) {
  const { coupons, refetch } = useCoupons(selectedGameIds);
  const { games } = useGames();
  const [sortMode, setSortMode] = useState<SortMode>('latest');
  const [adding, setAdding] = useState(false);

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
        <col className={styles.colAction} />
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {adding ? (
          <AdminCouponCreateRow
            games={games}
            onCreated={() => { setAdding(false); refetch(); }}
            onCancel={() => setAdding(false)}
          />
        ) : (
          <tr>
            <td colSpan={6} className={styles.addRow} onClick={() => setAdding(true)}>+</td>
          </tr>
        )}
        {sortCoupons(coupons, sortMode).map((coupon) => {
          const game = games.find((g) => g.id === coupon.gameId);
          return (
            <AdminCouponItem
              key={coupon.id}
              coupon={coupon}
              games={games}
              servers={game?.servers ?? []}
              onChanged={refetch}
            />
          );
        })}
      </tbody>
    </table>
  )
}

export default AdminCouponTable
