import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { createCouponIssueReport } from '@/api/couponIssueReports';
import styles from './CouponIssueReportModal.module.css';

const REASONS = [
  '쿠폰이 만료됐어요',
  '코드가 작동하지 않아요',
  '보상이 잘못 작성됐어요',
  '기타',
];

interface Props {
  couponId: number;
  onClose: () => void;
}

function CouponIssueReportModal({ couponId, onClose }: Props) {
  const { token, user } = useAuth();
  const { showToast } = useToast();
  const [reason, setReason] = useState(REASONS[0]);
  const [detail, setDetail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (reason === '기타' && !detail.trim()) {
      alert('기타 사유는 상세 내용을 입력해주세요.');
      return;
    }

    setSubmitting(true);
    try {
      await createCouponIssueReport(token, { couponId, reason, detail: detail.trim() || undefined });
      showToast('신고가 접수되었습니다. 감사합니다!');
      onClose();
    } catch (error) {
      console.error('쿠폰 신고 실패:', error);
      alert('쿠폰 신고에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Modal title="쿠폰 신고" onClose={onClose}>
        <p className={styles.loginNotice}>쿠폰 신고는 로그인 후 이용할 수 있습니다.</p>
      </Modal>
    );
  }

  return (
    <Modal title="쿠폰 신고" onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>신고 사유</label>
          {REASONS.map((r) => (
            <label key={r} className={styles.radioRow}>
              <input
                type="radio"
                name="reason"
                value={r}
                checked={reason === r}
                onChange={() => setReason(r)}
              />
              {r}
            </label>
          ))}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            상세 내용{reason === '기타' ? '' : '(선택)'}
          </label>
          <textarea
            className={styles.textarea}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="추가로 알려주실 내용이 있다면 적어주세요"
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          신고하기
        </button>
      </form>
    </Modal>
  );
}

export default CouponIssueReportModal;
