import { useState } from 'react';

export function useToggleGame(initialIds: number[] = []) {
  const [selectedGameIds, setSelectedGameIds] = useState<number[]>(initialIds);

  const isSelected = (id: number) => selectedGameIds.includes(id);

  const toggle = (id: number) => {
    setSelectedGameIds(prev =>
      prev.includes(id)
        ? prev.filter(gameId => gameId !== id)
        : [...prev, id]
    );
  };

  return {
    selectedGameIds,
    isSelected,
    toggle,
  };
}
