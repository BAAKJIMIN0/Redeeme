import { useState, useRef, useEffect } from 'react';
import styles from './GameIconPicker.module.css';
import type { Game } from '@/entities/game';

interface Props {
  games: Game[];
  selectedGameId: number;
  onChange: (gameId: number) => void;
}

function GameIconPicker({ games, selectedGameId, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedGame = games.find((g) => g.id === selectedGameId);
  const iconUrl = selectedGame ? `/gameIcons/gameIcon_${selectedGame.slug}.png` : '';

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {selectedGame && (
        <img
          className={styles.currentIcon}
          src={iconUrl}
          alt={selectedGame.korName}
          onClick={() => setOpen(!open)}
        />
      )}
      {open && (
        <div className={styles.popup}>
          {games.map((game) => (
            <div
              key={game.id}
              className={`${styles.iconOption} ${game.id === selectedGameId ? styles.selected : ''}`}
              onClick={() => {
                onChange(game.id);
                setOpen(false);
              }}
              title={game.korName}
            >
              <img src={`/gameIcons/gameIcon_${game.slug}.png`} alt={game.korName} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GameIconPicker;
