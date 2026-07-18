import styles from './GameIcon.module.css'
import type { Game } from '@/types';

interface Props {
  game: Game;
  isSelected: boolean;
  onToggle: (id: number) => void;
  size?: number;
}

export const GameIcon = ({ game, isSelected, onToggle, size }: Props) => {
  const iconUrl = `/gameIcons/gameIcon_${game.slug}.png`;

  return (
    <label
      className={`${styles.gameButton} ${isSelected ? styles.active : ''}`}
      title={game.korName}
      style={size ? { width: size, height: size } : undefined}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(game.id)}
        className={styles.hiddenCheckbox}
      />
      <div className={styles.iconWrapper}>
        <img src={iconUrl} alt={game.korName} />
      </div>
    </label>
  );
};
