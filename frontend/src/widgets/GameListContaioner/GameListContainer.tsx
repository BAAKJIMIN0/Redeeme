import styles from './GameListContainer.module.css'
import { GAME_LIST } from '../../entities/Game/gameList';
import { GameButton } from '../../entities/Game/GameIcon';

function GameListContainer() {
  return(
    <div className={styles.GameListContainer}>
      {GAME_LIST.map((game) => (
        <GameButton key={game.id} game={game} />
      ))}
    </div>
  )
}

export default GameListContainer