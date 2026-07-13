import { useNavigate } from 'react-router-dom';
import AdminCouponIssueReportTable from '@/components/AdminCouponIssueReportTable/AdminCouponIssueReportTable';

function AdminCouponIssueReportsPage() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button className="actionBtn" onClick={() => navigate('/admin')}>
          돌아가기
        </button>
      </div>
      <AdminCouponIssueReportTable />
    </>
  );
}

export default AdminCouponIssueReportsPage;
