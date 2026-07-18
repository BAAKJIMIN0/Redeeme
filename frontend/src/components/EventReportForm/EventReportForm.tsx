import { useState } from 'react';
import { useGames } from '@/hooks/useGames';
import { GameIcon } from '@/components/GameIcon/GameIcon';
import { useAuth } from '@/hooks/useAuth';
import { reportEvent } from '@/api/events';
import styles from './EventReportForm.module.css';

function EventReportForm() {
  const { token } = useAuth();
  const { games, loading } = useGames();

  const [selectedGameId, setSelectedGameId] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [customGameName, setCustomGameName] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [link, setLink] = useState('');

  const handleGameSelect = (value: string) => {
    setSelectedGameId(value);
    setIsCustom(value === 'custom');
  };

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
    if (!token) return;

    const selectedGame = games.find(g => g.id.toString() === selectedGameId);
    const finalGameName = isCustom ? customGameName : selectedGame?.korName;

    if (!finalGameName) {
      alert('게임을 선택하거나 입력해주세요.');
      return;
    }

    if (!title.trim()) {
      alert('행사명을 입력해주세요.');
      return;
    }

    if (!eventDate) {
      alert('날짜를 선택해주세요.');
      return;
    }

    if (hour === '') {
      alert('시간을 입력해주세요.');
      return;
    }

    const payload = {
      gameId: isCustom ? 0 : Number(selectedGameId),
      korName: finalGameName,
      title,
      description: description || null,
      eventDate,
      eventTime: `${hour.padStart(2, '0')}:${(minute || '0').padStart(2, '0')}`,
      link: link || null,
    };

    try {
      await reportEvent(token, payload);

      alert('공방 일정 제보가 완료되었습니다, 감사합니다!');
      setTitle('');
      setDescription('');
      setEventDate('');
      setHour('');
      setMinute('');
      setLink('');
    } catch (error) {
      console.error('공방 일정 제보 실패:', error);
      alert('공방 일정 제보에 실패했습니다.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <div className={styles.gameIconList}>
          {!loading && games?.map(game => (
            <GameIcon
              key={game.id}
              game={game}
              isSelected={selectedGameId === game.id.toString()}
              onToggle={() => handleGameSelect(game.id.toString())}
            />
          ))}
          <button
            type="button"
            className={`${styles.customBtn} ${selectedGameId === 'custom' ? styles.selected : ''}`}
            onClick={() => handleGameSelect('custom')}
            title="기타"
          >
            기타
          </button>
        </div>
      </div>

      {isCustom && (
        <div className={styles.field}>
          <input
            className={styles.input}
            type="text"
            value={customGameName}
            onChange={(e) => setCustomGameName(e.target.value)}
            required
            placeholder="게임 이름을 직접 입력하세요"
          />
        </div>
      )}

      <div className={styles.field}>
        <label className={styles.label}>행사명</label>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
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
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>시간(24시간제)</label>
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
              required
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
        <label className={styles.label}>링크(선택)</label>
        <input
          className={styles.input}
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="방송 혹은 원본 링크"
        />
      </div>

      <button type="submit" className={styles.submitBtn}>제보하기</button>
    </form>
  );
}

export default EventReportForm;
