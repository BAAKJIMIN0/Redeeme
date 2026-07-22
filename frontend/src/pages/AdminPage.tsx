import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameListContainer from '@/components/GameListContainer/GameListContainer'
import AdminCouponTable from '@/components/AdminCouponTable/AdminCouponTable'
import CouponFilterBar from '@/components/CouponFilterBar/CouponFilterBar'
import { useToggleGame } from '@/hooks/useToggleGame'
import type { SortMode, StatusFilter } from '@/utils/couponFilters';

function HomePage() {
  const navigate = useNavigate();
  const { selectedGameIds, toggle } = useToggleGame();
  const [sortMode, setSortMode] = useState<SortMode>('latest');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const handleReportClick = () => {
    navigate('/admin/coupon-reports');
  };

  const handleEventReportClick = () => {
    navigate('/admin/event-reports');
  };

  const handleIssueReportClick = () => {
    navigate('/admin/coupon-issue-reports');
  };

  const handleInquiryClick = () => {
    navigate('/admin/inquiries');
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px', gap: '8px' }}>
        <button className="actionBtn" onClick={() => navigate('/admin')}>
          리딤코드 보기
        </button>
        <button className="actionBtn" onClick={() => navigate('/admin/events')}>
          공방 일정 보기
        </button>
        <button className="actionBtn" onClick={handleReportClick}>
          쿠폰 제보보기
        </button>
        <button className="actionBtn" onClick={handleIssueReportClick}>
          쿠폰 신고보기
        </button>
        <button className="actionBtn" onClick={handleEventReportClick}>
          공방 제보보기
        </button>
        <button className="actionBtn" onClick={handleInquiryClick}>
          문의 건의보기
        </button>
      </div>
      <GameListContainer selectedGameIds={selectedGameIds} onToggle={toggle} />
      <CouponFilterBar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortMode={sortMode}
        onSortModeChange={setSortMode}
      />
      <AdminCouponTable selectedGameIds={selectedGameIds} sortMode={sortMode} statusFilter={statusFilter} />
    </>
  )
}

export default HomePage
