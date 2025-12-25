import styles from './GameListContainer.module.css'
import { GAME_LIST } from '../../entities/Game/gameList';
import { GameButton } from '../../entities/Game/GameIcon';
import { useToggleGame } from '../../features/coupon-filter/useToggleGame';

function GameListContainer() {
  const { isSelected, toggle } = useToggleGame();

  return (
    <div className={styles.GameListContainer}>
      {GAME_LIST.map(game => (
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