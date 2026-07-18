import { useState } from 'react';
import styles from './AdminEventForm.module.css';
import type { Game, GameEvent } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { createEvent, updateEvent } from '@/api/admin';
import { GameIcon } from '@/components/GameIcon/GameIcon';

interface Props {
  games: Game[];
  defaultDate: string;
  initial?: GameEvent;
  onSaved: () => void;
  onCancel: () => void;
}

function AdminEventForm({ games, defaultDate, initial, onSaved, onCancel }: Props) {
  const { token } = useAuth();
  const [gameId, setGameId] = useState<number>(initial?.gameId ?? games[0]?.id ?? 0);
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [eventDate, setEventDate] = useState(initial?.eventDate ?? defaultDate);
  const [hour, setHour] = useState(initial?.eventTime?.slice(0, 2) ?? '');
  const [minute, setMinute] = useState(initial?.eventTime?.slice(3, 5) ?? '');
  const [link, setLink] = useState(initial?.link ?? '');
  const [submitting, setSubmitting] = useState(false);

  const handleHourChange = (value: string) => {
    if (value === '') { setHour(''); return; }
    setHour(String(Math.min(23, Math.max(0, Number(value)))));
  };

  const handleMinuteChange = (value: string) => {
    if (value === '') { setMinute(''); return; }
    setMinute(String(Math.min(59, Math.max(0, Number(value)))));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !gameId) return;
    if (!title.trim()) {
      alert('행사명을 입력해주세요.');
      return;
    }
    if (!eventDate) {
      alert('날짜를 선택해주세요.');
      return;
    }

    setSubmitting(true);
    try {
      const eventTime = hour === '' ? null : `${hour.padStart(2, '0')}:${(minute || '0').padStart(2, '0')}`;
      const payload = {
        gameId,
        title,
        description: description || null,
        eventDate,
        eventTime,
        link: link || null,
      };
      if (initial) {
        await updateEvent(token, initial.id, payload);
      } else {
        await createEvent(token, payload);
      }
      onSaved();
    } catch (err) {
      console.error('일정 저장 실패:', err);
      alert('일정 저장에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>게임</label>
        <div className={styles.gameGrid}>
          {games.map((game) => (
            <GameIcon
              key={game.id}
              game={game}
              isSelected={game.id === gameId}
              onToggle={setGameId}
              size={40}
            />
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>행사명</label>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예: 3주년 기념 방송"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>설명(선택)</label>
        <input
          className={styles.input}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="예: 신규 캐릭터 공개 방송"
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>날짜</label>
          <input
            className={styles.input}
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>시간 (선택, 24시간제)</label>
          <div className={styles.timeInputs}>
            <input
              className={styles.timeInput}
              type="number"
              inputMode="numeric"
              min={0}
              max={23}
              placeholder="시"
              value={hour}
              onChange={(e) => handleHourChange(e.target.value)}
            />
            <span className={styles.timeColon}>:</span>
            <input
              className={styles.timeInput}
              type="number"
              inputMode="numeric"
              min={0}
              max={59}
              placeholder="분"
              value={minute}
              onChange={(e) => handleMinuteChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>링크 (선택)</label>
        <input
          className={styles.input}
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          저장
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          취소
        </button>
      </div>
    </form>
  );
}

export default AdminEventForm;
