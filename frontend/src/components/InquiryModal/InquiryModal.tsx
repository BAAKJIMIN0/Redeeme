import axios from 'axios';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import styles from './InquiryModal.module.css';

interface Props {
  onClose: () => void;
}

function InquiryModal({ onClose }: Props) {
  const { token, user } = useAuth();
  const { showToast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(
        'http://localhost:8080/api/inquiries',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast('문의가 접수되었습니다. 감사합니다!');
      onClose();
    } catch (error) {
      console.error('문의 등록 실패:', error);
      alert('문의 등록에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Modal title="문의 · 건의" onClose={onClose}>
        <p className={styles.loginNotice}>문의·건의는 로그인 후 이용할 수 있습니다.</p>
      </Modal>
    );
  }

  return (
    <Modal title="문의 · 건의" onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>제목</label>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>내용</label>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="문의 또는 건의 내용을 입력하세요"
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          보내기
        </button>
      </form>
    </Modal>
  );
}

export default InquiryModal;
