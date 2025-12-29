import styles from './GameListContainer.module.css'
import { GameButton } from '../../entities/Game/GameIcon.tsx';
import { useGames } from '../../entities/Game/useGames.ts';
import { useToggleGame } from '../../features/coupon-filter/useToggleGame.ts';

function GameListContainer() {
  const { games, loading, error } = useGames();
  const { isSelected, toggle } = useToggleGame();

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>게임 목록을 불러오지 못했습니다.</div>;

  return (
    <div className={styles.GameListContainer}>
      {games.map(game => (
        <GameButton
          key={game.id}
          game={game}
          isSelected={isSelected(game.id)}
          onToggle={toggle}
        />
      ))}
    </div>
  );
}
export default GameListContainer