import type { ReactNode } from 'react';
import styles from './CouponTableShell.module.css'
import Pagination from '@/components/Pagination/Pagination';

interface CouponTableShellProps {
  hasActionColumn?: boolean;
  hasReportColumn?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  children: ReactNode;
}

function CouponTableShell({ hasActionColumn = false, hasReportColumn = false, currentPage, totalPages, onPageChange, children }: CouponTableShellProps) {
  return (
    <>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <colgroup>
            <col className={styles.colGame} />
            <col className={styles.colServer} />
            <col className={styles.colCode} />
            <col className={styles.colRewards} />
            <col className={styles.colRemaining} />
            <col className={styles.colRegistered} />
            {hasReportColumn && <col className={styles.colReport} />}
            {hasActionColumn && <col className={styles.colAction} />}
          </colgroup>

          <thead>
            <tr>
              <th className={styles.centerHeader}>게임</th>
              <th className={styles.centerHeader}>서버</th>
              <th>코드</th>
              <th>보상</th>
              <th className={styles.centerHeader}>기한</th>
              <th className={styles.centerHeader}>등록</th>
              {hasReportColumn && <th className={styles.centerHeader}>신고</th>}
              {hasActionColumn && <th></th>}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
}

export default CouponTableShell
