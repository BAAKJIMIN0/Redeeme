import { useEffect, useState } from 'react';
import styles from './AdminReportTable.module.css';
import { useAuth } from '@/features/auth';
import { getReports, acceptReport, deleteReport } from '@/features/admin/api';
import type { RewardItem } from '@/entities/coupon/index.ts';

interface CouponReport {
  id: number;
  reporterId: number;
  gameId: number | null;
  korName: string;
  server: string;
  code: string;
  description?: string;
  rewards: RewardItem[];
  startedAt: string;
  expiredAt?: string;
  quickUrl?: string;
  createdAt: string;
}

function AdminReportTable() {
  const { token } = useAuth();
  const [reports, setReports] = useState<CouponReport[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    getReports(token).then((data) => {
      if (!cancelled) setReports(data);
    }).catch((err) => {
      console.error('제보 목록 로드 실패:', err);
    });
    return () => { cancelled = true; };
  }, [token, refreshKey]);

  const refetch = () => setRefreshKey((k) => k + 1);

  const handleAccept = async (id: number) => {
    if (!token) return;
    try {
      await acceptReport(token, id);
      refetch();
    } catch (err) {
      console.error('제보 수락 실패:', err);
      alert('제보 수락에 실패했습니다.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!confirm('정말 이 제보를 삭제하시겠습니까?')) return;
    try {
      await deleteReport(token, id);
      refetch();
    } catch (err) {
      console.error('제보 삭제 실패:', err);
      alert('제보 삭제에 실패했습니다.');
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-';
    return dateStr.split('T')[0];
  };

  return (
    <table className={styles.table}>
      <colgroup>
        <col className={styles.colGame} />
        <col className={styles.colServer} />
        <col className={styles.colCode} />
        <col className={styles.colRewards} />
        <col className={styles.colDuration} />
        <col className={styles.colDate} />
        <col className={styles.colAction} />
      </colgroup>
      <thead>
        <tr>
          <th>게임</th>
          <th>서버</th>
          <th>코드</th>
          <th>보상</th>
          <th>기한</th>
          <th>제보일</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {reports.length === 0 ? (
          <tr>
            <td colSpan={7} className={styles.emptyRow}>제보가 없습니다.</td>
          </tr>
        ) : (
          reports.map((report) => (
            <tr key={report.id}>
              <td>{report.korName}</td>
              <td>{report.server}</td>
              <td>
                <div>{report.code}</div>
                {report.description && (
                  <div className={styles.codeDescription}>{report.description}</div>
                )}
              </td>
              <td>
                {(report.rewards || []).map((reward, index) => (
                  <div key={index} className={styles.rewardItem}>
                    {reward.item} * {reward.amount}
                  </div>
                ))}
              </td>
              <td>
                <div>시작: {formatDate(report.startedAt)}</div>
                <div>마감: {formatDate(report.expiredAt)}</div>
              </td>
              <td>{formatDate(report.createdAt)}</td>
              <td className={styles.actionCell}>
                <button
                  className={styles.acceptBtn}
                  onClick={() => handleAccept(report.id)}
                  disabled={report.gameId === null}
                  title={report.gameId === null ? '기타 게임은 직접 등록해주세요' : ''}
                >
                  수락
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(report.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default AdminReportTable;
