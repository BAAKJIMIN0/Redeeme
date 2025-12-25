import styles from './GameIcon.module.css'
import type { Game } from './types';

interface Props {
  game: Game;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

export const GameButton = ({ game, isSelected, onToggle }: Props) => {
  const iconUrl = `/gameIcons/gameIcon_${game.iconUrl}.png`;

  return (
    <label
      className={`${styles.gameButton} ${isSelected ? styles.active : ''}`}
    >
      <input 
        type="checkbox" 
        checked={isSelected} 
        onChange={() => onToggle(game.id)}
        className={styles.hiddenCheckbox} 
      />
      <div className={styles.iconWrapper}>
        <img src={iconUrl} alt={game.name} />
      </div>
    </label>
  );
};