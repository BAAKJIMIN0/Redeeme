import { useEffect, useState } from 'react';
import styles from './AdminEventReportTable.module.css';
import { useAuth } from '@/hooks/useAuth';
import { getEventReports, acceptEventReport, deleteEventReport } from '@/api/admin';
import { useGames } from '@/hooks/useGames';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import { formatEventTime } from '@/utils/formatEventTime';
import type { GameEventReport } from '@/types';

function AdminEventReportTable() {
  const { token } = useAuth();
  const { games } = useGames();
  const [reports, setReports] = useState<GameEventReport[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    getEventReports(token).then((data) => {
      if (!cancelled) setReports(data);
    }).catch((err) => {
      console.error('공방 일정 제보 목록 로드 실패:', err);
    });
    return () => { cancelled = true; };
  }, [token, refreshKey]);

  const refetch = () => setRefreshKey((k) => k + 1);

  const handleAccept = async (id: number) => {
    if (!token) return;
    try {
      await acceptEventReport(token, id);
      refetch();
    } catch (err) {
      console.error('제보 수락 실패:', err);
      alert('제보 수락에 실패했습니다.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await deleteEventReport(token, id);
      refetch();
    } catch (err) {
      console.error('제보 삭제 실패:', err);
      alert('제보 삭제에 실패했습니다.');
    }
  };

  return (
    <table className={styles.table}>
      <colgroup>
        <col className={styles.colGame} />
        <col className={styles.colTitle} />
        <col className={styles.colLink} />
        <col className={styles.colDuration} />
        <col className={styles.colAction} />
      </colgroup>
      <thead>
        <tr>
          <th></th>
          <th>행사명</th>
          <th>링크</th>
          <th>일정</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {reports.length === 0 ? (
          <tr>
            <td colSpan={5} className={styles.emptyRow}>제보가 없습니다.</td>
          </tr>
        ) : (
          reports.map((report) => (
            <tr key={report.id}>
              <td>
                {(() => {
                  const game = games.find((g) => g.id === report.gameId);
                  return game ? (
                    <img className={styles.gameImg} src={`/gameIcons/gameIcon_${game.slug}.png`} alt={game.korName} />
                  ) : (
                    report.korName
                  );
                })()}
              </td>
              <td>
                <div>{report.title}</div>
                {report.description && (
                  <div className={styles.titleDescription}>{report.description}</div>
                )}
              </td>
              <td>
                {report.link ? (
                  <a className={styles.link} href={report.link} target="_blank" rel="noreferrer">바로가기</a>
                ) : '-'}
              </td>
              <td>
                <div>일정: {report.eventDate} {formatEventTime(report.eventTime)}</div>
                <div>등록: {formatRelativeTime(report.createdAt)}</div>
              </td>
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

export default AdminEventReportTable;
