import styles from './CouponItem.module.css'
import type { Coupon } from '../model/types';

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

  return (
    <tr>
          <td className={styles.centerText}>
            <img className={styles.gameImg} src={iconUrl} alt={coupon.korName} />
          </td>
          <td>{coupon.server}</td>
          <td>
            <div>{coupon.code}</div>
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
            <div>등록: {formatDate(coupon.startedAt)}</div>
            <div>마감: {formatDate(coupon.expiredAt)}</div>
          </td>
        </tr>
  );
};