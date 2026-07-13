import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './AdminCouponIssueReportTable.module.css';
import { useAuth } from '@/hooks/useAuth';
import { getCouponIssueReports, deleteCouponIssueReport } from '@/api/admin';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import Pagination from '@/components/Pagination/Pagination';
import type { CouponIssueReport } from '@/types';

const PAGE_SIZE = 35;

function AdminCouponIssueReportTable() {
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const couponIdParam = searchParams.get('couponId');
  const couponId = couponIdParam ? Number(couponIdParam) : undefined;

  const [reports, setReports] = useState<CouponIssueReport[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openId, setOpenId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    getCouponIssueReports(token, couponId).then((data) => {
      if (!cancelled) setReports(data);
    }).catch((err) => {
      console.error('쿠폰 신고 목록 로드 실패:', err);
    });
    return () => { cancelled = true; };
  }, [token, couponId, refreshKey]);

  const [prevCouponId, setPrevCouponId] = useState(couponId);
  if (couponId !== prevCouponId) {
    setPrevCouponId(couponId);
    setCurrentPage(1);
  }

  const refetch = () => setRefreshKey((k) => k + 1);

  const totalPages = Math.ceil(reports.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const pagedReports = reports.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await deleteCouponIssueReport(token, id);
      refetch();
    } catch (err) {
      console.error('쿠폰 신고 삭제 실패:', err);
      alert('쿠폰 신고 삭제에 실패했습니다.');
    }
  };

  return (
    <>
      <table className={styles.table}>
        <colgroup>
          <col className={styles.colGame} />
          <col className={styles.colServer} />
          <col className={styles.colCode} />
          <col className={styles.colReason} />
          <col className={styles.colDuration} />
          <col className={styles.colAction} />
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>서버</th>
            <th>코드</th>
            <th>사유</th>
            <th>등록</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.emptyRow}>신고가 없습니다.</td>
            </tr>
          ) : (
            pagedReports.map((report) => (
              <>
                <tr key={report.id}>
                  <td>{report.korName}</td>
                  <td>{report.server}</td>
                  <td>{report.couponCode}</td>
                  <td className={styles.reasonCell} onClick={() => toggleOpen(report.id)}>
                    {report.reason}
                  </td>
                  <td>{formatRelativeTime(report.createdAt)}</td>
                  <td className={styles.actionCell}>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(report.id)}>삭제</button>
                  </td>
                </tr>
                {openId === report.id && (
                  <tr key={`detail-${report.id}`} className={styles.detailRow}>
                    <td colSpan={6}>{report.detail || '상세 내용이 없습니다.'}</td>
                  </tr>
                )}
              </>
            ))
          )}
        </tbody>
      </table>
      <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
}

export default AdminCouponIssueReportTable;
