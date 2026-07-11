import { useState } from 'react'
import styles from './RewardList.module.css'
import type { RewardItem } from '@/types';

interface RewardListProps {
  rewards: RewardItem[];
}

function RewardList({ rewards }: RewardListProps) {
  const [expanded, setExpanded] = useState(false);

  if (rewards.length <= 2) {
    return (
      <>
        {rewards.map((reward, index) => (
          <div key={index} className={styles.rewardItem}>
            {reward.item} * {reward.amount}
          </div>
        ))}
      </>
    );
  }

  if (expanded) {
    return (
      <>
        {rewards.map((reward, index) => (
          <div key={index} className={styles.rewardItem}>
            {reward.item} * {reward.amount}
          </div>
        ))}
        <div className={styles.toggle} onClick={() => setExpanded(false)}>접기</div>
      </>
    );
  }

  const [first, ...rest] = rewards;
  return (
    <>
      <div className={styles.rewardItem}>{first.item} * {first.amount}</div>
      <div className={styles.toggle} onClick={() => setExpanded(true)}>외 {rest.length}개</div>
    </>
  );
}

export default RewardList
