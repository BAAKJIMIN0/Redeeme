import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameListContainer from '@/components/GameListContainer/GameListContainer'
import CouponTable from '@/components/CouponTable/CouponTable'
import CouponFilterBar from '@/components/CouponFilterBar/CouponFilterBar'
import { useToggleGame } from '@/hooks/useToggleGame'
import type { SortMode, StatusFilter } from '@/utils/couponFilters';

function HomePage() {
  const navigate = useNavigate();
  const { selectedGameIds, toggle } = useToggleGame();
  const [sortMode, setSortMode] = useState<SortMode>('latest');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const handleReportClick = () => {
    navigate('/coupon-report');
  };

  const handleEventReportClick = () => {
    navigate('/event-report');
  };

  const handleInquiryClick = () => {
    navigate('/inquiry');
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px', gap: '8px' }}>
        <button className="actionBtn" onClick={() => navigate('/')}>
          리딤코드 보기
        </button>
        <button className="actionBtn" onClick={() => navigate('/schedule')}>
          공방 일정 보기
        </button>
        <button className="actionBtn" onClick={handleReportClick}>
          쿠폰 제보하기
        </button>
        <button className="actionBtn" onClick={handleEventReportClick}>
          공방 제보하기
        </button>
        <button className="actionBtn" onClick={handleInquiryClick}>
          문의 건의하기
        </button>
      </div>
      <GameListContainer selectedGameIds={selectedGameIds} onToggle={toggle} />
      <CouponFilterBar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortMode={sortMode}
        onSortModeChange={setSortMode}
      />
      <CouponTable selectedGameIds={selectedGameIds} sortMode={sortMode} statusFilter={statusFilter} />
    </>
  );
}

export default HomePage;
