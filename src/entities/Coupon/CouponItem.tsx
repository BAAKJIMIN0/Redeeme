import styles from './CouponItem.module.css'
import type { Coupon } from './types';

interface Props {
  coupon: Coupon;
}

export const CouponItem = ({ coupon }: Props) => {
  const iconUrl = '/gameIcons/gameIcon_' + coupon.game + '.png';

  return (
    <tr>
          <td className={styles.centerText}>
            <img className={styles.gameImg} src={iconUrl} alt={coupon.game} />
          </td>
          <td>
            <div>{coupon.code}</div>
            <div className={styles.codeDescription}>{coupon.description}</div>
          </td>
          <td>{coupon.server}</td>
          <td>{coupon.reward}</td>
          <td>
            <div>등록: {coupon.startedAt}</div>
            <div>마감: {coupon.expiredAt}</div>
          </td>
          <td className={styles.centerText}>{coupon.ddayDate}</td>
        </tr>
  );
};