import styles from './CouponItem.module.css'
import type { Coupon } from './types';

interface Props {
  coupon: Coupon;
}

export const CouponItem = ({ coupon }: Props) => {
  const iconUrl = '/gameIcons/gameIcon_' + coupon.slug + '.png';

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '무기한';
    return dateStr.split(' ')[0];
  };

  console.log("전체 쿠폰 데이터:", coupon);
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
          <td>
            <div>등록: {formatDate(coupon.startedAt)}</div>
            <div>마감: {formatDate(coupon.expiredAt)}</div>
          </td>
          <td className={styles.centerText}></td>
          <td className={styles.centerText}></td>
        </tr>
  );
};