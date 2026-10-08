import { useNavigate } from 'react-router-dom';
import EventReportForm from '@/components/EventReportForm/EventReportForm'

function EventReportPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button className="actionBtn" onClick={handleBackClick}>
          돌아가기
        </button>
      </div>
      <EventReportForm />
    </>
  )
}

export default EventReportPage
