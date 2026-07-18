import { useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import EventDdayBadge from '@/components/EventDdayBadge/EventDdayBadge';
import type { GameEvent } from '@/types';
import { formatEventDateTime, getEventDateTimeMs } from '@/utils/formatEventTime';
import styles from './EventTable.module.css';

interface Props {
  events: GameEvent[];
}

const PAGE_SIZE = 20;

function EventTable({ events }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [prevEvents, setPrevEvents] = useState(events);
  if (events !== prevEvents) {
    setPrevEvents(events);
    setCurrentPage(1);
  }

  const sorted = [...events].sort(
    (a, b) => getEventDateTimeMs(a.eventDate, a.eventTime) - getEventDateTimeMs(b.eventDate, b.eventTime)
  );
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const paged = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <>
      <table className={styles.table}>
        <colgroup>
          <col className={styles.colGame} />
          <col />
          <col className={styles.colDateTime} />
          <col className={styles.colDday} />
          <col className={styles.colLink} />
        </colgroup>
        <thead>
          <tr>
            <th className={styles.centerHeader}>게임</th>
            <th>행사명</th>
            <th className={styles.centerHeader}>날짜/시간</th>
            <th className={styles.centerHeader}>D-day</th>
            <th className={styles.centerHeader}>바로가기</th>
          </tr>
        </thead>
        <tbody>
          {paged.length === 0 ? (
            <tr>
              <td colSpan={5} className={styles.emptyRow}>표시할 일정이 없습니다.</td>
            </tr>
          ) : (
            paged.map((event) => (
              <tr key={event.id}>
                <td className={styles.centerText}>
                  <img
                    className={styles.gameImg}
                    src={`/gameIcons/gameIcon_${event.slug}.png`}
                    alt={event.korName}
                    title={event.korName}
                  />
                </td>
                <td>
                  <div>{event.title}</div>
                  {event.description && (
                    <div className={styles.eventDescription}>{event.description}</div>
                  )}
                </td>
                <td className={styles.centerText}>{formatEventDateTime(event.eventDate, event.eventTime)}</td>
                <td className={styles.centerText}>
                  <EventDdayBadge eventDate={event.eventDate} eventTime={event.eventTime} />
                </td>
                <td className={styles.centerText}>
                  {event.link ? (
                    <a href={event.link} target="_blank" rel="noopener noreferrer" className={styles.linkIcon} title="바로가기">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ) : (
                    <span className={styles.noLink}>-</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
}

export default EventTable;
