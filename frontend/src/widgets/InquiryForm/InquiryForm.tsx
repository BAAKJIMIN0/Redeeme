import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '@/features/auth';
import styles from './InquiryForm.module.css';

function InquiryForm() {
  const { token } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8080/api/inquiries',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('문의가 접수되었습니다. 감사합니다!');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('문의 등록 실패:', error);
      alert('문의 등록에 실패했습니다.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>제목</label>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="제목을 입력하세요"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>내용</label>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="문의 또는 건의 내용을 입력하세요"
        />
      </div>

      <button type="submit" className={styles.submitBtn}>보내기</button>
    </form>
  );
}

export default InquiryForm;
