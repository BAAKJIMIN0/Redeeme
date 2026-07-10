import { useEffect, useState } from 'react';
import styles from './AdminInquiryList.module.css';
import { useAuth } from '@/hooks/useAuth';
import { getInquiries, deleteInquiry } from '@/api/admin';

interface Inquiry {
  id: number;
  reporterId: number;
  title: string;
  content: string;
  createdAt: string;
}

function AdminInquiryList() {
  const { token } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    getInquiries(token).then((data) => {
      if (!cancelled) setInquiries(data);
    }).catch((err) => {
      console.error('문의 목록 로드 실패:', err);
    });
    return () => { cancelled = true; };
  }, [token, refreshKey]);

  const refetch = () => setRefreshKey((k) => k + 1);

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await deleteInquiry(token, id);
      refetch();
    } catch (err) {
      console.error('문의 삭제 실패:', err);
      alert('문의 삭제에 실패했습니다.');
    }
  };

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const formatDate = (dateStr: string) => {
    return dateStr.split('T')[0];
  };

  return (
    <table className={styles.table}>
      <colgroup>
        <col className={styles.colTitle} />
        <col className={styles.colDate} />
        <col className={styles.colAction} />
      </colgroup>
      <thead>
        <tr>
          <th>제목</th>
          <th>날짜</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {inquiries.length === 0 ? (
          <tr>
            <td colSpan={3} className={styles.emptyRow}>문의가 없습니다.</td>
          </tr>
        ) : (
          inquiries.map((inquiry) => (
            <>
              <tr key={inquiry.id}>
                <td
                  className={styles.titleCell}
                  onClick={() => toggleOpen(inquiry.id)}
                >
                  {inquiry.title}
                </td>
                <td>{formatDate(inquiry.createdAt)}</td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(inquiry.id)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
              {openId === inquiry.id && (
                <tr key={`content-${inquiry.id}`} className={styles.contentRow}>
                  <td colSpan={3}>{inquiry.content}</td>
                </tr>
              )}
            </>
          ))
        )}
      </tbody>
    </table>
  );
}

export default AdminInquiryList;
