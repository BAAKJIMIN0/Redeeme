import { useNavigate } from 'react-router-dom';
import AdminReportTable from '@/widgets/AdminReportTable/AdminReportTable';

function AdminReportsPage() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button className="actionBtn" onClick={() => navigate('/admin')}>
          돌아가기
        </button>
      </div>
      <AdminReportTable />
    </>
  );
}

export default AdminReportsPage;
