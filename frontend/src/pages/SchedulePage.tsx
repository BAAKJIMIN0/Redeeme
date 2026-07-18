import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameListContainer from '@/components/GameListContainer/GameListContainer'
import EventCalendar from '@/components/EventCalendar/EventCalendar'
import EventDetailModal from '@/components/EventDetailModal/EventDetailModal'
import EventTable from '@/components/EventTable/EventTable'
import { useToggleGame } from '@/hooks/useToggleGame'
import { useEvents } from '@/hooks/useEvents'
import { addDays, formatRangeLabel, getCalendarDays } from '@/utils/calendarRange'
import type { GameEvent } from '@/types';
import styles from './SchedulePage.module.css';

type ViewMode = 'calendar' | 'list';

function SchedulePage() {
  const navigate = useNavigate();
  const { selectedGameIds, toggle } = useToggleGame();
  const [anchorDate, setAnchorDate] = useState(() => new Date());
  const [dayModal, setDayModal] = useState<{ date: string; events: GameEvent[] } | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');

  const days = useMemo(() => getCalendarDays(anchorDate), [anchorDate]);
  const from = days[0].iso;
  const to = days[days.length - 1].iso;

  const { events } = useEvents(from, to);
  const listEvents = selectedGameIds.length === 0
    ? events
    : events.filter((event) => selectedGameIds.includes(event.gameId));

  const handleDayClick = (date: string) => {
    setDayModal({ date, events: events.filter((event) => event.eventDate === date) });
  };

  const handleIconClick = (event: GameEvent) => {
    setDayModal({ date: event.eventDate, events: [event] });
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px', gap: '8px' }}>
        <button className="actionBtn" onClick={() => navigate('/')}>
          돌아가기
        </button>
      </div>
      <GameListContainer selectedGameIds={selectedGameIds} onToggle={toggle} />
      <div className={styles.viewToggle}>
        <button
          type="button"
          className={viewMode === 'calendar' ? `${styles.viewBtn} ${styles.viewBtnActive}` : styles.viewBtn}
          onClick={() => setViewMode('calendar')}
        >
          캘린더
        </button>
        <button
          type="button"
          className={viewMode === 'list' ? `${styles.viewBtn} ${styles.viewBtnActive}` : styles.viewBtn}
          onClick={() => setViewMode('list')}
        >
          리스트
        </button>
      </div>
      <div className={styles.monthNav}>
        <button className={styles.navBtn} onClick={() => setAnchorDate((d) => addDays(d, -35))}>◀</button>
        <span className={styles.monthLabel}>{formatRangeLabel(days[0].date, days[days.length - 1].date)}</span>
        <button className={styles.navBtn} onClick={() => setAnchorDate((d) => addDays(d, 35))}>▶</button>
        <button className={styles.todayBtn} onClick={() => setAnchorDate(new Date())}>오늘</button>
      </div>
      {viewMode === 'calendar' ? (
        <EventCalendar
          days={days}
          events={events}
          highlightGameIds={selectedGameIds}
          onDayClick={handleDayClick}
          onIconClick={handleIconClick}
        />
      ) : (
        <EventTable events={listEvents} />
      )}
      {dayModal && (
        <EventDetailModal
          date={dayModal.date}
          events={dayModal.events}
          onClose={() => setDayModal(null)}
        />
      )}
    </>
  );
}

export default SchedulePage;
