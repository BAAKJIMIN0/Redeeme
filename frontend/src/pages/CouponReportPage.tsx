import { useNavigate } from 'react-router-dom';
import CouponReportForm from '@/components/CouponReportForm/CouponReportForm'
import { useAuth } from '@/hooks/useAuth';

function CouponReportPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

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
      {user ? (
        <CouponReportForm />
      ) : (
        <p style={{ textAlign: 'center', marginTop: '48px', color: 'var(--color-text-secondary)' }}>
          쿠폰 제보는 로그인 후 이용할 수 있습니다.
        </p>
      )}
    </>
  )
}

export default CouponReportPage