import styles from './CouponTable.module.css'
import { CouponItem, useCoupons } from '@/entities/coupon/index.ts';

function CouponTable() {
  const { coupons } = useCoupons();
  return(
    <table className={styles.table}>
      <colgroup>
        <col className={styles.colGame} />
        <col className={styles.colServer} />
        <col className={styles.colCode} />
        <col className={styles.colRewards} />
        <col className={styles.colDuration} />
        <col className={styles.colDday} />
        <col className={styles.colLink} />
      </colgroup>

      <thead>
        <tr>
          <th></th>
          <th>서버</th>
          <th>코드</th>
          <th>보상</th>
          <th>기한</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {coupons.map((coupon) => (
            <CouponItem key={coupon.id} coupon={coupon} />
          ))}
      </tbody>
    </table>
  )
}

export default CouponTable