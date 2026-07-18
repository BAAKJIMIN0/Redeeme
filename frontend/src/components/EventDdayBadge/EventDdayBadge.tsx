import styles from './EventDdayBadge.module.css';
import { getEventDateTimeMs } from '@/utils/formatEventTime';

interface Props {
  eventDate: string;
  eventTime: string | null;
}

type BadgeTone = 'green' | 'amber' | 'red';

function getDdayInfo(eventDate: string, eventTime: string | null): { label: string; tone: BadgeTone } {
  const diffMs = getEventDateTimeMs(eventDate, eventTime) - Date.now();

  if (diffMs <= 0) return { label: '종료', tone: 'red' };

  const diffMinutes = Math.floor(diffMs / (60 * 1000));
  if (diffMinutes < 60) return { label: `${diffMinutes}분 전`, tone: 'red' };

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return { label: `${diffHours}시간 전`, tone: 'amber' };

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return { label: `${diffDays}일 전`, tone: 'amber' };
  return { label: `${diffDays}일 전`, tone: 'green' };
}

function EventDdayBadge({ eventDate, eventTime }: Props) {
  const { label, tone } = getDdayInfo(eventDate, eventTime);
  return <span className={`${styles.badge} ${styles[tone]}`}>{label}</span>;
}

export default EventDdayBadge;
