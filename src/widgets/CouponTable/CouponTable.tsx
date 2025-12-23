import styles from './CouponTable.module.css'

function CouponTable() {
  return(
    <table className={styles.table}>
      <colgroup>
        <col className={styles.colGame} />
        <col className={styles.colCode} />
        <col className={styles.colServer} />
        <col className={styles.colRewards} />
        <col className={styles.colDuration} />
        <col className={styles.colDday} />
      </colgroup>

      <thead>
        <tr>
          <th>게임</th>
          <th>코드</th>
          <th>서버</th>
          <th>보상</th>
          <th>기한</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={styles.centerText}>원신</td>
          <td>
            <div>GENSHIN2025</div>
            <div className={styles.codeDescription}>원신 2025년 기념 코드</div>
          </td>
          <td>GLOBAL</td>
          <td>원석 x100</td>
          <td>
            <div className={styles.centerText}>등록: 2025-01-05</div>
            <div className={styles.centerText}>마감: 2025-01-10</div>
          </td>
          <td className={styles.centerText}>D-3</td>
        </tr>
        <tr>
          <td className={styles.centerText}>명조</td>
          <td>
            <div>GodGame</div>
            <div className={styles.codeDescription}>명조 정말 갓겜입니다.</div>
          </td>
          <td>ALL</td>
          <td>원석 x100</td>
          <td>
            <div className={styles.centerText}>등록: 2025-01-05</div>
            <div className={styles.centerText}>마감: 2025-01-10</div>
          </td>
          <td className={styles.centerText}>D-3</td>
        </tr>
      </tbody>
    </table>
  )
}

export default CouponTable