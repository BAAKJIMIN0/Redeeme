import styles from './EventCalendar.module.css';
import type { GameEvent } from '@/types';
import type { CalendarDay } from '@/utils/calendarRange';
import { toIsoDate } from '@/utils/calendarRange';

interface Props {
  days: CalendarDay[];
  events: GameEvent[];
  highlightGameIds?: number[];
  onDayClick: (date: string) => void;
  onIconClick: (event: GameEvent) => void;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MAX_ICONS_PER_DAY = 4;

function EventCalendar({ days, events, highlightGameIds, onDayClick, onIconClick }: Props) {
  const todayIso = toIsoDate(new Date());
  const hasFilter = !!highlightGameIds && highlightGameIds.length > 0;

  const eventsByDate = events.reduce<Record<string, GameEvent[]>>((acc, event) => {
    (acc[event.eventDate] ??= []).push(event);
    return acc;
  }, {});

  return (
    <div className={styles.calendar}>
      <div className={styles.weekdayRow}>
        {WEEKDAYS.map((w) => (
          <div key={w} className={styles.weekday}>{w}</div>
        ))}
      </div>
      <div className={styles.grid}>
        {days.map(({ date, iso }) => {
          const dayEvents = eventsByDate[iso] ?? [];
          const shown = dayEvents.slice(0, MAX_ICONS_PER_DAY);
          const overflow = dayEvents.length - shown.length;
          const isPast = iso < todayIso;
          const hasMatch = hasFilter && dayEvents.some((event) => highlightGameIds!.includes(event.gameId));

          return (
            <div
              key={iso}
              className={`${styles.cell} ${isPast ? styles.past : ''} ${iso === todayIso ? styles.today : ''} ${dayEvents.length > 0 ? styles.clickable : ''} ${hasMatch ? styles.hasMatch : ''}`}
              onClick={() => dayEvents.length > 0 && onDayClick(iso)}
            >
              <span className={styles.dayNumber}>{date.getDate()}</span>
              {dayEvents.length > 0 && (
                <div className={styles.iconRow}>
                  {shown.map((event, idx) => {
                    const isMatch = !hasFilter || highlightGameIds!.includes(event.gameId);
                    return (
                      <img
                        key={event.id}
                        className={`${styles.dayIcon} ${hasFilter ? (isMatch ? styles.iconMatch : styles.iconDim) : ''}`}
                        style={{ zIndex: shown.length - idx }}
                        src={`/gameIcons/gameIcon_${event.slug}.png`}
                        alt={event.korName}
                        title={event.korName}
                        onClick={(e) => {
                          e.stopPropagation();
                          onIconClick(event);
                        }}
                      />
                    );
                  })}
                  {overflow > 0 && (
                    <span className={styles.overflowBadge}>+{overflow}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EventCalendar;
