import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom';
import GameListContainer from '../widgets/GameListContainer/GameListContainer'
import CouponTable from '../widgets/CouponTable/CouponTable'
import { useState } from 'react';

function HomePage() {
  const navigate = useNavigate();

  const [selectedGameIds, setSelectedGameIds] = useState<number[]>([]);

  const handleToggleGame = (id: number) => {
    setSelectedGameIds(prev =>
      prev.includes(id) 
        ? prev.filter(gameId => gameId !== id)
        : [...prev, id]
    );
  };
  
  const handleReportClick = () => {
    navigate('/admin/coupon-create');
  };

  return (
    <>
      <button 
        style={{ marginBottom: '16px', width: 100, cursor: 'pointer' }} 
        onClick={handleReportClick}
      >
        제보하기
      </button>
      <GameListContainer selectedGameIds={selectedGameIds} onToggle={handleToggleGame} />
      <CouponTable selectedGameIds={selectedGameIds} />
    </>
  )
}

export default HomePage