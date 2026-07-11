import { CouponItem } from '@/components/CouponItem/CouponItem';
import CouponTableShell from '@/components/CouponTableShell/CouponTableShell';
import { useCoupons } from '@/hooks/useCoupons';
import { usePagedCoupons } from '@/hooks/usePagedCoupons';
import type { SortMode, StatusFilter } from '@/utils/couponFilters';

interface CouponTableProps {
  selectedGameIds: number[];
  sortMode: SortMode;
  statusFilter: StatusFilter;
}

function CouponTable({ selectedGameIds, sortMode, statusFilter }: CouponTableProps) {
  const { coupons } = useCoupons(selectedGameIds);
  const { pagedCoupons, currentPage, totalPages, setCurrentPage } = usePagedCoupons({
    coupons,
    selectedGameIds,
    sortMode,
    statusFilter,
  });

  return (
    <CouponTableShell currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}>
      {pagedCoupons.map((coupon) => (
        <CouponItem key={coupon.id} coupon={coupon} />
      ))}
    </CouponTableShell>
  );
}

export default CouponTable
