import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import AdminEventForm from '@/components/AdminEventForm/AdminEventForm';
import type { Game, GameEvent } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { deleteEvent } from '@/api/admin';
import { formatEventDateTitle, formatEventTime } from '@/utils/formatEventTime';
import styles from './AdminEventDayModal.module.css';

interface Props {
  date: string;
  events: GameEvent[];
  games: Game[];
  onClose: () => void;
  onChanged: () => void;
}

function AdminEventDayModal({ date, events, games, onClose, onChanged }: Props) {
  const { token } = useAuth();
  const [editingEvent, setEditingEvent] = useState<GameEvent | 'new' | null>(null);

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!confirm('정말 이 일정을 삭제하시겠습니까?')) return;
    try {
      await deleteEvent(token, id);
      onChanged();
    } catch (err) {
      console.error('일정 삭제 실패:', err);
      alert('일정 삭제에 실패했습니다.');
    }
  };

  const handleSaved = () => {
    setEditingEvent(null);
    onChanged();
  };

  if (editingEvent !== null) {
    return (
      <Modal title={editingEvent === 'new' ? '일정 추가' : '일정 수정'} onClose={onClose}>
        <AdminEventForm
          games={games}
          defaultDate={date}
          initial={editingEvent === 'new' ? undefined : editingEvent}
          onSaved={handleSaved}
          onCancel={() => setEditingEvent(null)}
        />
      </Modal>
    );
  }

  return (
    <Modal title={formatEventDateTitle(date)} onClose={onClose}>
      <div className={styles.list}>
        {events.map((event) => (
          <div key={event.id} className={styles.item}>
            <img
              className={styles.icon}
              src={`/gameIcons/gameIcon_${event.slug}.png`}
              alt={event.korName}
              title={event.korName}
            />
            <div className={styles.info}>
              <div className={styles.eventTitle}>{event.title}</div>
              {event.description && (
                <div className={styles.description}>{event.description}</div>
              )}
              <div className={styles.time}>{formatEventTime(event.eventTime)}</div>
            </div>
            <div className={styles.itemActions}>
              <button className={styles.editBtn} onClick={() => setEditingEvent(event)}>수정</button>
              <button className={styles.deleteBtn} onClick={() => handleDelete(event.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.addBtn} onClick={() => setEditingEvent('new')}>
        + 새 일정 추가
      </button>
    </Modal>
  );
}

export default AdminEventDayModal;
