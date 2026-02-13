import { useNavigate } from 'react-router-dom';
import AdminInquiryList from '@/widgets/AdminInquiryList/AdminInquiryList';

function AdminInquiriesPage() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button className="actionBtn" onClick={() => navigate('/admin')}>
          돌아가기
        </button>
      </div>
      <AdminInquiryList />
    </>
  );
}

export default AdminInquiriesPage;
