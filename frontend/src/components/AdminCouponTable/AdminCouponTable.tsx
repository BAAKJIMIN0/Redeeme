import { useEffect, useState } from 'react'
import styles from './AdminCouponTable.module.css'
import CouponTableShell from '@/components/CouponTableShell/CouponTableShell';
import { useCoupons } from '@/hooks/useCoupons';
import { useGames } from '@/hooks/useGames';
import { usePagedCoupons } from '@/hooks/usePagedCoupons';
import { useAuth } from '@/hooks/useAuth';
import { getCouponIssueReportCounts } from '@/api/admin';
import type { SortMode, StatusFilter } from '@/utils/couponFilters';
import AdminCouponItem from './AdminCouponItem';
import AdminCouponCreateRow from './AdminCouponCreateRow';

interface CouponTableProps {
  selectedGameIds: number[];
  sortMode: SortMode;
  statusFilter: StatusFilter;
}

function AdminCouponTable({ selectedGameIds, sortMode, statusFilter }: CouponTableProps) {
  const { token } = useAuth();
  const { coupons, refetch } = useCoupons(selectedGameIds);
  const { games } = useGames();
  const [adding, setAdding] = useState(false);
  const [reportCounts, setReportCounts] = useState<Record<number, number>>({});
  const { pagedCoupons, currentPage, totalPages, setCurrentPage } = usePagedCoupons({
    coupons,
    selectedGameIds,
    sortMode,
    statusFilter,
  });

  useEffect(() => {
    if (!token) return;
    getCouponIssueReportCounts(token)
      .then((data) => setReportCounts(data))
      .catch((err) => console.error('쿠폰 신고 수 로드 실패:', err));
  }, [token, coupons]);

  return (
    <CouponTableShell hasReportColumn hasActionColumn currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}>
      {adding ? (
        <AdminCouponCreateRow
          games={games}
          onCreated={() => { setAdding(false); refetch(); }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <tr>
          <td colSpan={8} className={styles.addRow} onClick={() => setAdding(true)}>+</td>
        </tr>
      )}
      {pagedCoupons.map((coupon) => {
        const game = games.find((g) => g.id === coupon.gameId);
        return (
          <AdminCouponItem
            key={coupon.id}
            coupon={coupon}
            games={games}
            servers={game?.servers ?? []}
            reportCount={reportCounts[coupon.id] ?? 0}
            onChanged={refetch}
          />
        );
      })}
    </CouponTableShell>
  );
}

export default AdminCouponTable
