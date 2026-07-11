import { useState } from 'react';
import styles from './AdminCouponItem.module.css';
import type { Coupon, RewardItem, Game } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { updateCoupon, deleteCoupon } from '@/api/admin';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import ExpiryBadge from '@/components/ExpiryBadge/ExpiryBadge';
import RewardList from '@/components/RewardList/RewardList';
import { useToast } from '@/hooks/useToast';
import GameIconPicker from './GameIconPicker';

interface Props {
  coupon: Coupon;
  games: Game[];
  servers: string[];
  onChanged: () => void;
}

function AdminCouponItem({ coupon, games, servers, onChanged }: Props) {
  const { token } = useAuth();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);

  const [gameId, setGameId] = useState(coupon.gameId);
  const [code, setCode] = useState(coupon.code);
  const [description, setDescription] = useState(coupon.description ?? '');
  const [server, setServer] = useState(coupon.server);
  const [rewards, setRewards] = useState<RewardItem[]>(coupon.rewards ?? []);
  const [expiredAt, setExpiredAt] = useState(coupon.expiredAt ?? '');
  const [quickUrl, setQuickUrl] = useState(coupon.quickUrl ?? '');
  const [showUrlInput, setShowUrlInput] = useState(false);

  const selectedGame = games.find((g) => g.id === gameId);
  const editServers = selectedGame?.servers ?? servers;
  const iconUrl = '/gameIcons/gameIcon_' + coupon.slug + '.png';

  const handleGameChange = (id: number) => {
    setGameId(id);
    const game = games.find((g) => g.id === id);
    const srvList = game?.servers ?? [];
    setServer(srvList.length > 0 ? srvList[0] : '');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    showToast('코드가 클립보드에 복사되었습니다');
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

  const handleSave = async () => {
    if (!token) return;
    try {
      await updateCoupon(token, coupon.id, {
        gameId,
        korName: selectedGame?.korName ?? coupon.korName,
        code,
        description,
        server,
        rewards,
        expiredAt: expiredAt || null,
        quickUrl: quickUrl || null,
      });
      setEditing(false);
      onChanged();
    } catch (err) {
      console.error('쿠폰 수정 실패:', err);
      alert('쿠폰 수정에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    setGameId(coupon.gameId);
    setCode(coupon.code);
    setDescription(coupon.description ?? '');
    setServer(coupon.server);
    setRewards(coupon.rewards ?? []);
    setExpiredAt(coupon.expiredAt ?? '');
    setQuickUrl(coupon.quickUrl ?? '');
    setShowUrlInput(false);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!token) return;
    if (!confirm('정말 이 쿠폰을 삭제하시겠습니까?')) return;
    try {
      await deleteCoupon(token, coupon.id);
      onChanged();
    } catch (err) {
      console.error('쿠폰 삭제 실패:', err);
      alert('쿠폰 삭제에 실패했습니다.');
    }
  };

  if (editing) {
    return (
      <tr className={styles.editingRow}>
        <td className={styles.centerText}>
          <GameIconPicker games={games} selectedGameId={gameId} onChange={handleGameChange} />
        </td>
        <td>
          {editServers.length > 1 ? (
            <select className={styles.editInput} value={server} onChange={(e) => setServer(e.target.value)}>
              {editServers.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          ) : (
            <span>{editServers[0] ?? server}</span>
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
            </div>
          ))}
        </td>
        <td>
          <input className={styles.editInput} type="date" value={expiredAt} onChange={(e) => setExpiredAt(e.target.value)} />
        </td>
        <td className={styles.centerText}>{formatRelativeTime(coupon.createdAt)}</td>
        <td className={styles.actionCell}>
          <button className={styles.saveBtn} onClick={handleSave}>저장</button>
          <button className={styles.cancelBtn} onClick={handleCancel}>취소</button>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td className={styles.centerText}>
        <img className={styles.gameImg} src={iconUrl} alt={coupon.korName} />
      </td>
      <td className={styles.centerText}>{coupon.server}</td>
      <td>
        <div className={styles.codeRow}>
          <span className={styles.codeBox} onClick={handleCopy}>{coupon.code}</span>
          {coupon.quickUrl && (
            <a href={coupon.quickUrl} target="_blank" rel="noopener noreferrer" className={styles.linkIcon} title="쿠폰 교환 페이지">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
        <div className={styles.codeDescription}>{coupon.description}</div>
      </td>
      <td>
        <RewardList rewards={coupon.rewards || []} />
      </td>
      <td className={styles.centerText}>
        <ExpiryBadge expiredAt={coupon.expiredAt} />
      </td>
      <td className={styles.centerText}>{formatRelativeTime(coupon.createdAt)}</td>
      <td className={styles.actionCell}>
        <button className={styles.editBtn} onClick={() => setEditing(true)}>수정</button>
        <button className={styles.deleteBtn} onClick={handleDelete}>삭제</button>
      </td>
    </tr>
  );
}

export default AdminCouponItem;
