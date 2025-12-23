import styles from './GameIcon.module.css'
import type { Game } from './types';

interface Props {
  game: Game;
}

export const GameButton = ({ game }: Props) => {
  const iconUrl = '/gameIcons/gameIcon_' + game.iconUrl + '.png';

  return (
    <button className={styles.gameButton} title={game.name}>
      <img src={iconUrl} alt={game.name} />
    </button>
  );
};