import { useNavigate } from 'react-router-dom';
import GameListContainer from '../widgets/GameListContainer/GameListContainer'
import CouponTable from '../widgets/CouponTable/CouponTable'
import { useToggleGame } from '@/features/coupon-filter'

function HomePage() {
  const navigate = useNavigate();
  const { selectedGameIds, toggle } = useToggleGame();

  const handleReportClick = () => {
    navigate('/coupon-report');
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button className="actionBtn" onClick={handleReportClick}>
          쿠폰 제보하기
        </button>
      </div>
      <GameListContainer selectedGameIds={selectedGameIds} onToggle={toggle} />
      <CouponTable selectedGameIds={selectedGameIds} />
    </>
  );
}

export default HomePage;