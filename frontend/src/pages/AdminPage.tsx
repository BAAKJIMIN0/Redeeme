import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom';
import GameListContainer from '../widgets/GameListContainer/GameListContainer'
import CouponTable from '../widgets/CouponTable/CouponTable'
import { useToggleGame } from '@/features/coupon-filter'

function HomePage() {
  const navigate = useNavigate();
  const { selectedGameIds, toggle } = useToggleGame();

  const handleReportClick = () => {
    navigate('/admin/coupon-create');
  };

  return (
    <>
      <button
        style={{ marginBottom: '16px', width: 100, cursor: 'pointer' }}
        onClick={handleReportClick}
      >
        제보하기
      </button>
      <GameListContainer selectedGameIds={selectedGameIds} onToggle={toggle} />
      <CouponTable selectedGameIds={selectedGameIds} />
    </>
  )
}

export default HomePage