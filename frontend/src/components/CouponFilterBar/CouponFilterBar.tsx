import styles from './CouponFilterBar.module.css'
import type { SortMode, StatusFilter } from '@/utils/couponFilters';

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'expiry', label: '기한순' },
];

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'available', label: '사용가능' },
  { value: 'expired', label: '만료' },
];

interface CouponFilterBarProps {
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  sortMode: SortMode;
  onSortModeChange: (mode: SortMode) => void;
}

function CouponFilterBar({ statusFilter, onStatusFilterChange, sortMode, onSortModeChange }: CouponFilterBarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.statusGroup}>
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={opt.value === statusFilter ? `${styles.statusBtn} ${styles.active}` : styles.statusBtn}
            onClick={() => onStatusFilterChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className={styles.sortGroup}>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={opt.value === sortMode ? `${styles.statusBtn} ${styles.active}` : styles.statusBtn}
            onClick={() => onSortModeChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CouponFilterBar
