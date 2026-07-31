import { useState } from 'react';
import styles from './AdminCouponItem.module.css';
import type { Game, RewardItem } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { createCoupon } from '@/api/admin';
import GameIconPicker from './GameIconPicker';

interface Props {
  games: Game[];
  onCreated: () => void;
  onCancel: () => void;
}

function AdminCouponCreateRow({ games, onCreated, onCancel }: Props) {
  const { token } = useAuth();

  const [gameId, setGameId] = useState<number>(games[0]?.id ?? 0);
  const [server, setServer] = useState(games[0]?.servers?.[0] ?? '');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [rewards, setRewards] = useState<RewardItem[]>([{ item: '', amount: 0 }]);
  const [expiredAt, setExpiredAt] = useState('');
  const [quickUrl, setQuickUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  const selectedGame = games.find((g) => g.id === gameId);
  const servers = selectedGame?.servers ?? [];

  const handleGameChange = (id: number) => {
    setGameId(id);
    const game = games.find((g) => g.id === id);
    const srvList = game?.servers ?? [];
    setServer(srvList.length > 0 ? srvList[0] : '');
  };

  const handleRewardChange = (index: number, field: keyof RewardItem, value: string) => {
    const updated = [...rewards];
    if (field === 'amount') {
      updated[index] = { ...updated[index], amount: Number(value) };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setRewards(updated);
  };

  const addReward = () => setRewards([...rewards, { item: '', amount: 0 }]);

  const removeReward = (index: number) => {
    if (rewards.length <= 1) return;
    setRewards(rewards.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!token || !gameId) return;
    try {
      const filteredRewards = rewards.filter((r) => r.item.trim() !== '');
      await createCoupon(token, {
        gameId,
        korName: selectedGame?.korName ?? '',
        code,
        description,
        server,
        rewards: filteredRewards,
        expiredAt: expiredAt || null,
        quickUrl: quickUrl || null,
      });
      onCreated();
    } catch (err) {
      console.error('쿠폰 생성 실패:', err);
      alert('쿠폰 생성에 실패했습니다.');
    }
  };

  return (
    <tr className={styles.editingRow}>
      <td className={styles.centerText}>
        <GameIconPicker games={games} selectedGameId={gameId} onChange={handleGameChange} />
      </td>
      <td>
        {servers.length > 1 ? (
          <select className={styles.editInput} value={server} onChange={(e) => setServer(e.target.value)}>
            {servers.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        ) : (
          <span>{servers[0] ?? ''}</span>
        )}
      </td>
      <td>
        <div className={styles.codeEditRow}>
          <input className={styles.editInput} value={code} onChange={(e) => setCode(e.target.value)} placeholder="코드" />
          <button
            type="button"
            className={`${styles.linkIconBtn} ${quickUrl ? styles.linkIconActive : ''}`}
            onClick={() => setShowUrlInput(!showUrlInput)}
            title="링크 URL"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </button>
        </div>
        {showUrlInput && (
          <input className={styles.urlInput} value={quickUrl} onChange={(e) => setQuickUrl(e.target.value)} placeholder="링크 URL" />
        )}
        <input className={styles.editInput} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="설명" />
      </td>
      <td>
        {rewards.map((reward, i) => (
          <div key={i} className={styles.rewardEditRow}>
            <input className={styles.editInput} value={reward.item} onChange={(e) => handleRewardChange(i, 'item', e.target.value)} placeholder="아이템" />
            <input className={styles.editInputSmall} type="number" value={reward.amount} onChange={(e) => handleRewardChange(i, 'amount', e.target.value)} />
            <button className={styles.cancelBtn} type="button" onClick={() => removeReward(i)}>−</button>
          </div>
        ))}
        <button className={styles.editBtn} type="button" onClick={addReward}>+ 보상</button>
      </td>
      <td>
        <input className={styles.editInput} type="date" value={expiredAt} onChange={(e) => setExpiredAt(e.target.value)} />
      </td>
      <td className={styles.centerText}>-</td>
      <td className={styles.centerText}>-</td>
      <td className={styles.actionCell}>
        <button className={styles.saveBtn} onClick={handleSave}>저장</button>
        <button className={styles.cancelBtn} onClick={onCancel}>취소</button>
      </td>
    </tr>
  );
}

export default AdminCouponCreateRow;
