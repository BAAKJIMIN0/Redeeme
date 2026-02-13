import { useNavigate } from 'react-router-dom';
import InquiryForm from '../widgets/InquiryForm/InquiryForm'

function InquiryPage() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button className="actionBtn" onClick={() => navigate('/')}>
          돌아가기
        </button>
      </div>
      <InquiryForm />
    </>
  )
}

export default InquiryPage
