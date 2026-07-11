import styles from './ExpiryBadge.module.css'

interface ExpiryBadgeProps {
  expiredAt?: string;
}

type BadgeTone = 'blue' | 'green' | 'amber' | 'red';

function getBadgeInfo(expiredAt?: string): { label: string; tone: BadgeTone } {
  if (!expiredAt) return { label: '무기한', tone: 'blue' };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(expiredAt);
  exp.setHours(0, 0, 0, 0);
  const diffDays = Math.round((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: '만료', tone: 'red' };
  if (diffDays === 0) return { label: 'D-DAY', tone: 'red' };
  if (diffDays < 7) return { label: `D-${diffDays}`, tone: 'amber' };
  return { label: `D-${diffDays}`, tone: 'green' };
}

function ExpiryBadge({ expiredAt }: ExpiryBadgeProps) {
  const { label, tone } = getBadgeInfo(expiredAt);
  return <span className={`${styles.badge} ${styles[tone]}`}>{label}</span>;
}

export default ExpiryBadge
