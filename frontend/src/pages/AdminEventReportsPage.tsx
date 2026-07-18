import { useNavigate } from 'react-router-dom';
import AdminEventReportTable from '@/components/AdminEventReportTable/AdminEventReportTable';

function AdminEventReportsPage() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button className="actionBtn" onClick={() => navigate('/admin')}>
          돌아가기
        </button>
      </div>
      <AdminEventReportTable />
    </>
  );
}

export default AdminEventReportsPage;
