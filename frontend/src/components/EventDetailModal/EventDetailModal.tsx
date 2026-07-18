import Modal from '@/components/Modal/Modal';
import type { GameEvent } from '@/types';
import { formatEventDateTitle, formatEventTime } from '@/utils/formatEventTime';
import styles from './EventDetailModal.module.css';

interface Props {
  date: string;
  events: GameEvent[];
  onClose: () => void;
}

function EventDetailModal({ date, events, onClose }: Props) {
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
            {event.link && (
              <a
                className={styles.linkBtn}
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                바로가기
              </a>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default EventDetailModal;
