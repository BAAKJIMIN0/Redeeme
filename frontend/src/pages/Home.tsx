import styles from './Home.module.css'
import Header from '../widgets/Header'
import Footer from '../widgets/Footer'
import GameListContainer from '../widgets/GameListContaioner/GameListContainer'
import CouponTable from '../widgets/CouponTable/CouponTable'

function HomePage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <main className={styles.main}>
        <button style={{ marginBottom: '16px', width: 100 }}>제보하기</button>
        <GameListContainer />
        <CouponTable />
      </main>

      <Footer />
    </div>
  )
}

export default HomePage