import { useNavigate } from 'react-router-dom';
import GameListContainer from '../widgets/GameListContainer/GameListContainer'
import AdminCouponTable from '../widgets/AdminCouponTable/AdminCouponTable'
import { useToggleGame } from '@/features/coupon-filter'

function HomePage() {
  const navigate = useNavigate();
  const { selectedGameIds, toggle } = useToggleGame();

  const handleReportClick = () => {
    navigate('/admin/coupon-reports');
  };

  const handleInquiryClick = () => {
    navigate('/admin/inquiries');
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px', gap: '8px' }}>
        <button className="actionBtn" onClick={handleReportClick}>
          쿠폰 제보보기
        </button>
        <button className="actionBtn" onClick={handleInquiryClick}>
          문의 건의보기
        </button>
      </div>
      <GameListContainer selectedGameIds={selectedGameIds} onToggle={toggle} />
      <AdminCouponTable selectedGameIds={selectedGameIds} />
    </>
  )
}

export default HomePage