import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom';
import GameListContainer from '../widgets/GameListContainer/GameListContainer'
import CouponTable from '../widgets/CouponTable/CouponTable'

function HomePage() {
  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate('/coupon-report');
  };

  return (
    <>
      <button 
        style={{ marginBottom: '16px', width: 100, cursor: 'pointer' }} 
        onClick={handleReportClick}
      >
        제보하기
      </button>
      <GameListContainer />
      <CouponTable />
    </>
  );
}

export default HomePage;