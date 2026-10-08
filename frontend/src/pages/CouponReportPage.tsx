import { useNavigate } from 'react-router-dom';
import CouponReportForm from '@/components/CouponReportForm/CouponReportForm'

function CouponReportPage() {
  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate('/');
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button className="actionBtn" onClick={handleReportClick}>
          돌아가기
        </button>
      </div>
      <CouponReportForm />
    </>
  )
}

export default CouponReportPage