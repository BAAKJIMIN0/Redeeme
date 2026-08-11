import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './GameIconPicker.module.css';
import type { Game } from '@/types';

interface Props {
  games: Game[];
  selectedGameId: number;
  onChange: (gameId: number) => void;
  size?: number;
}

function GameIconPicker({ games, selectedGameId, onChange, size }: Props) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const selectedGame = games.find((g) => g.id === selectedGameId);
  const iconUrl = selectedGame ? `/gameIcons/gameIcon_${selectedGame.slug}.png` : '';

  const handleToggle = () => {
    if (!open && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 4, left: rect.left + rect.width / 2 });
    }
    setOpen(!open);
  };

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        wrapperRef.current && !wrapperRef.current.contains(target) &&
        popupRef.current && !popupRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    const handleScroll = () => setOpen(false);
    document.addEventListener('mousedown', handleClick);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [open]);

  return (
    <div className={styles.wrapper} ref={wrapperRef} style={size ? { width: size, height: size } : undefined}>
      {selectedGame && (
        <img
          className={styles.currentIcon}
          src={iconUrl}
          alt={selectedGame.korName}
          onClick={handleToggle}
        />
      )}
      {open && position && createPortal(
        <div
          className={styles.popup}
          ref={popupRef}
          style={{ top: position.top, left: position.left }}
        >
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
        </div>,
        document.body
      )}
    </div>
  );
}

export default GameIconPicker;
