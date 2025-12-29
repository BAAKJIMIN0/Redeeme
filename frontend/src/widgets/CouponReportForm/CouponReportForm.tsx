import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGames } from '../../entities/Game/useGames';
import styles from './CouponReportForm.module.css';

function CouponReportForm() {
  const navigate = useNavigate();
  const { games, loading } = useGames();
  
  const [selectedGameId, setSelectedGameId] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [customGameName, setCustomGameName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [startedAt, setStartedAt] = useState(new Date().toISOString().split('T')[0]);
  const [expiredAt, setExpiredAt] = useState('');

  const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedGameId(value);
    setIsCustom(value === 'custom');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedGame = games.find(g => g.id.toString() === selectedGameId);
    const finalGameName = isCustom ? customGameName : selectedGame?.korName;

    if (!finalGameName) {
      alert("게임을 선택하거나 입력해주세요.");
      return;
    }

    const payload = {
      gameId: isCustom ? 0 : Number(selectedGameId),
      korName: isCustom ? customGameName : selectedGame?.korName || '',
      code,
      description,
      reward,
      startedAt: new Date(startedAt).toISOString(),
      expiredAt: expiredAt ? new Date(expiredAt).toISOString() : undefined,
    };
    
    console.log('서버 전송 데이터:', payload);
    alert('제보가 완료되었습니다!');
    navigate('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>게임 선택</label>
        <select 
          className={styles.select}
          value={selectedGameId} 
          onChange={handleGameChange} 
          required
        >
          <option value="" disabled>게임을 선택해 주세요</option>
          {!loading && games?.map(game => (
            <option key={game.id} value={game.id.toString()}>{game.korName}</option>
          ))}
          <option value="custom">기타</option>
        </select>
      </div>

      {isCustom && (
        <div className={styles.field}>
          <input 
            className={styles.input}
            type="text" 
            value={customGameName} 
            onChange={(e) => setCustomGameName(e.target.value)} 
            required 
            placeholder="게임 이름을 입력하세요"
          />
        </div>
      )}

      <div className={styles.field}>
        <label className={styles.label}>쿠폰 코드</label>
        <input 
          className={styles.input}
          type="text" 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          required 
          placeholder="쿠폰 코드를 입력하세요"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>설명(선택)</label>
        <input 
          className={styles.input}
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="쿠폰에 대한 추가 정보"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>보상</label>
        <input 
          className={styles.input}
          type="text" 
          value={reward} 
          onChange={(e) => setReward(e.target.value)} 
          placeholder="예: 청휘석 600개"
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>시작일</label>
          <input 
            className={styles.input}
            type="date" 
            value={startedAt} 
            onChange={(e) => setStartedAt(e.target.value)} 
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>만료일(선택)</label>
          <input 
            className={styles.input}
            type="date" 
            value={expiredAt} 
            onChange={(e) => setExpiredAt(e.target.value)} 
          />
        </div>
      </div>

      <button type="submit" className={styles.submitBtn}>제보하기</button>
    </form>
  );
}

export default CouponReportForm;