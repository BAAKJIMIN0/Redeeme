import { useNavigate } from 'react-router-dom';
import InquiryForm from '@/components/InquiryForm/InquiryForm'
import { useAuth } from '@/hooks/useAuth';

function InquiryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

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
      {user ? (
        <InquiryForm />
      ) : (
        <p style={{ textAlign: 'center', marginTop: '48px', color: 'var(--color-text-secondary)' }}>
          문의·건의는 로그인 후 이용할 수 있습니다.
        </p>
      )}
    </>
  )
}

export default InquiryPage
