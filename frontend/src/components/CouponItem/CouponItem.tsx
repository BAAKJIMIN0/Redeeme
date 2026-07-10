import styles from './CouponItem.module.css'
import type { Coupon } from '@/types';
import { formatRelativeTime } from '@/utils/formatRelativeTime';

interface Props {
  coupon: Coupon;
}

export const CouponItem = ({ coupon }: Props) => {
  const iconUrl = '/gameIcons/gameIcon_' + coupon.slug + '.png';

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '무기한';
    return dateStr.split(' ')[0];
  };

  const getExpirationClass = (expiredAt?: string) => {
    if (!expiredAt) return '';
    const now = new Date();
    const expDate = new Date(expiredAt);
    if (expDate < now) return styles.expired;
    const threeDays = 3 * 24 * 60 * 60 * 1000;
    if (expDate.getTime() - now.getTime() <= threeDays) return styles.expiringSoon;
    return '';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
  };

  return (
    <tr>
          <td className={styles.centerText}>
            <img className={styles.gameImg} src={iconUrl} alt={coupon.korName} />
          </td>
          <td>{coupon.server}</td>
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
          <td className={styles.rewardCell}>
            {(coupon.rewards || []).map((reward, index) => (
              <div key={index} className={styles.rewardItem}>
                {reward.item} * {reward.amount}
              </div>
            ))}
          </td>
          <td className={getExpirationClass(coupon.expiredAt)}>
            <div>등록: {formatRelativeTime(coupon.createdAt)}</div>
            <div>마감: {formatDate(coupon.expiredAt)}</div>
          </td>
        </tr>
  );
};
