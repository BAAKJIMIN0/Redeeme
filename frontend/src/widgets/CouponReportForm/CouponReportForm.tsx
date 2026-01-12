import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGames } from '@/entities/game/index.ts'
import styles from './CouponReportForm.module.css';
import type { RewardItem } from '@/entities/coupon/index.ts';

function CouponReportForm() {
  const navigate = useNavigate();
  const { games, loading } = useGames();
  
  const [selectedGameId, setSelectedGameId] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [customGameName, setCustomGameName] = useState('');
  
  const [availableServers, setAvailableServers] = useState<string[]>([]);
  const [selectedServer, setSelectedServer] = useState('');

  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [rewards, setRewards] = useState<RewardItem[]>([{ item: '', amount: 0 }]);
  const [startedAt, setStartedAt] = useState(new Date().toISOString().split('T')[0]);
  const [expiredAt, setExpiredAt] = useState('');
  const [quickUrl, setQuickUrl] = useState('');

  const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedGameId(value);
    
    if (value === 'custom') {
      setIsCustom(true);
      setAvailableServers([]);
      setSelectedServer(''); 
    } else {
      setIsCustom(false);
      const selectedGame = games.find(g => g.id.toString() === value);
      const serverList = selectedGame?.servers || [];
      setAvailableServers(serverList);

      if (serverList.length === 1) {
        setSelectedServer(serverList[0]);
      } else if (serverList.length === 0) {
        setSelectedServer('ALL');
      } else {
        setSelectedServer('');
      }
    }
  };

  const addRewardField = () => {
    setRewards([...rewards, { item: '', amount: 0 }]);
  };

  const removeRewardField = (index: number) => {
    if (rewards.length > 1) {
      setRewards(rewards.filter((_, i) => i !== index));
    }
  };
  
  const handleRewardChange = (index: number, field: keyof RewardItem, value: string) => {
    const newRewards = [...rewards];
    if (field === 'amount') {
      newRewards[index][field] = Number(value) as any; 
    } else {
      newRewards[index][field] = value as any;
    }
    setRewards(newRewards);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedGame = games.find(g => g.id.toString() === selectedGameId);
    const finalGameName = isCustom ? customGameName : selectedGame?.korName;

    if (!finalGameName) {
      alert("게임을 선택하거나 입력해주세요.");
      return;
    }

    const filteredRewards = rewards.filter(r => r.item.trim() !== '');

    const payload = {
      gameId: isCustom ? 0 : Number(selectedGameId),
      korName: finalGameName,
      server: selectedServer,
      code,
      description,
      rewards: filteredRewards,
      startedAt: new Date(startedAt).toISOString(),
      expiredAt: expiredAt ? new Date(expiredAt).toISOString() : undefined,
      quickUrl
    };
    
  try {
      await axios.post(
        'http://localhost:8080/api/admin/coupon-create',
        payload
      );

      alert('쿠폰이 등록되었습니다!');
      navigate('/');
    } catch (error) {
      console.error('쿠폰 등록 실패:', error);
      alert('쿠폰 등록에 실패했습니다.');
    }
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
            placeholder="게임 이름을 직접 입력하세요"
          />
        </div>
      )}

      {!isCustom && availableServers.length > 1 && (
        <div className={styles.field}>
          <label className={styles.label}>서버 선택</label>
          <select 
            className={styles.select}
            value={selectedServer}
            onChange={(e) => setSelectedServer(e.target.value)}
            required
          >
            <option value="" disabled>서버를 선택해 주세요</option>
            {availableServers.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      {isCustom && (
        <div className={styles.field}>
          <label className={styles.label}>서버 정보</label>
          <input 
            className={styles.input}
            type="text"
            value={selectedServer}
            onChange={(e) => setSelectedServer(e.target.value)}
            placeholder="예: ALL, KR, JP, GLOBAL 등"
            required
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
          placeholder="예: 2025 신년 기념"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>보상 목록</label>
        {rewards.map((reward, index) => (
          <div key={index} className={styles.rewardRow}>
            <input 
              className={styles.input}
              type="text" 
              value={reward.item} 
              onChange={(e) => handleRewardChange(index, 'item', e.target.value)} 
              placeholder="아이템"
              required={index === 0}
            />
            <input 
              className={`${styles.input} ${styles.amountInput}`}
              type="text" 
              value={reward.amount} 
              onChange={(e) => handleRewardChange(index, 'amount', e.target.value)} 
              placeholder="수량"
            />
            {rewards.length > 1 && (
              <button 
                type="button" 
                className={styles.removeBtn} 
                onClick={() => removeRewardField(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button type="button" className={styles.addBtn} onClick={addRewardField}>
          + 보상 추가
        </button>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>링크(선택)</label>
        <input 
          className={styles.input}
          type="text" 
          value={quickUrl} 
          onChange={(e) => setQuickUrl(e.target.value)} 
          placeholder="쿠폰 바로가기 혹은 원본 링크"
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