import styles from './CouponReportPage.module.css'
import { useNavigate } from 'react-router-dom';
import CouponReportForm from '../widgets/CouponReportForm/CouponReportForm'

function CouponReportPage() {
  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate('/admin');
  };

  return (
    <>
      <button 
        style={{ marginBottom: '16px', width: 100, cursor: 'pointer' }} 
        onClick={handleReportClick}
      >
        돌아가기
      </button>
      <CouponReportForm />
    </>
  )
}

export default CouponReportPage