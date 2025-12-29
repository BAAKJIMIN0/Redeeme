import styles from './Home.module.css'
import Header from '../widgets/Header'
import Footer from '../widgets/Footer'
import GameListContainer from '../widgets/GameListContaioner/GameListContainer'
import CouponTable from '../widgets/CouponTable/CouponTable'

function HomePage() {
  return (
    <>
      <button style={{ marginBottom: '16px', width: 100 }}>제보하기</button>
      <GameListContainer />
      <CouponTable />
    </>
  )
}

export default HomePage