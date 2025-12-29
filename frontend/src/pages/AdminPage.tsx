import styles from './Home.module.css'
import GameListContainer from '../widgets/GameListContaioner/GameListContainer'
import CouponTable from '../widgets/CouponTable/CouponTable'

function HomePage() {
  return (
    <>
      <button style={{ marginBottom: '16px', width: 100 }}>관리자 페이지</button>
      <GameListContainer />
      <CouponTable />
    </>
  )
}

export default HomePage