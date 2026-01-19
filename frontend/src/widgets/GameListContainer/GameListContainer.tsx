import styles from './GameListContainer.module.css'
import { GameIcon, useGames } from '@/entities/game/index.ts'

interface GameListContainerProps {
  selectedGameIds: number[];
  onToggle: (id: number) => void;
}

function GameListContainer({ selectedGameIds, onToggle }: GameListContainerProps) {
  const { games, loading, error } = useGames();

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>게임 목록을 불러오지 못했습니다.</div>;

  return (
    <div className={styles.GameListContainer}>
      {games.map(game => (
        <GameIcon
          key={game.id}
          game={game}
          isSelected={selectedGameIds.includes(game.id)}
          onToggle={() => onToggle(game.id)}
        />
      ))}
    </div>
  );
}

export default GameListContainer;