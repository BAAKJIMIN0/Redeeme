import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameListContainer from '@/components/GameListContainer/GameListContainer'
import EventCalendar from '@/components/EventCalendar/EventCalendar'
import AdminEventDayModal from '@/components/AdminEventDayModal/AdminEventDayModal'
import AdminEventForm from '@/components/AdminEventForm/AdminEventForm'
import Modal from '@/components/Modal/Modal'
import { useEvents } from '@/hooks/useEvents'
import { useGames } from '@/hooks/useGames'
import { useToggleGame } from '@/hooks/useToggleGame'
import { addDays, formatRangeLabel, getCalendarDays, toIsoDate } from '@/utils/calendarRange'
import type { GameEvent } from '@/types';
import styles from './SchedulePage.module.css';

function AdminEventsPage() {
  const navigate = useNavigate();
  const { games } = useGames();
  const { selectedGameIds, toggle } = useToggleGame();
  const [anchorDate, setAnchorDate] = useState(() => new Date());
  const [dayModal, setDayModal] = useState<{ date: string; events: GameEvent[] } | null>(null);
  const [addingNew, setAddingNew] = useState(false);

  const days = useMemo(() => getCalendarDays(anchorDate), [anchorDate]);
  const from = days[0].iso;
  const to = days[days.length - 1].iso;

  const { events, refetch } = useEvents(from, to);

  const handleDayClick = (date: string) => {
    setDayModal({ date, events: events.filter((event) => event.eventDate === date) });
  };

  const handleIconClick = (event: GameEvent) => {
    setDayModal({ date: event.eventDate, events: [event] });
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px', gap: '8px' }}>
        <button className="actionBtn" onClick={() => navigate('/admin')}>
          돌아가기
        </button>
      </div>
      <GameListContainer selectedGameIds={selectedGameIds} onToggle={toggle} />
      <div className={styles.monthNav}>
        <button className={styles.navBtn} onClick={() => setAnchorDate((d) => addDays(d, -35))}>◀</button>
        <span className={styles.monthLabel}>{formatRangeLabel(days[0].date, days[days.length - 1].date)}</span>
        <button className={styles.navBtn} onClick={() => setAnchorDate((d) => addDays(d, 35))}>▶</button>
        <button className={styles.addBtn} onClick={() => setAddingNew(true)} title="새 일정 추가">+</button>
        <button className={styles.todayBtn} onClick={() => setAnchorDate(new Date())}>오늘</button>
      </div>
      <EventCalendar
        days={days}
        events={events}
        highlightGameIds={selectedGameIds}
        onDayClick={handleDayClick}
        onIconClick={handleIconClick}
      />
      {dayModal && (
        <AdminEventDayModal
          date={dayModal.date}
          events={dayModal.events}
          games={games}
          onClose={() => setDayModal(null)}
          onChanged={refetch}
        />
      )}
      {addingNew && (
        <Modal title="일정 추가" onClose={() => setAddingNew(false)}>
          <AdminEventForm
            games={games}
            defaultDate={toIsoDate(new Date())}
            onSaved={() => { setAddingNew(false); refetch(); }}
            onCancel={() => setAddingNew(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default AdminEventsPage;
