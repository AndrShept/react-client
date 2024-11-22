import { useState } from 'react';

interface Props {
  initialMap: number[][];
}

export const useHeroMove = ({ initialMap }: Props) => {
  const [map, setMap] = useState(initialMap);
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 });
  const moveHero = (dx: number, dy: number) => {
    setHeroPosition((prev) => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;

      // Перевіряємо межі карти
      if (newX < 0 || newY < 0 || newX >= map[0].length || newY >= map.length)
        return prev;
      //КОЛІЗІЯ
      if (map[newY][newX] !== 0) {
        return prev;
      }

      // Оновлюємо карту, якщо герой рухається
      const newMap = map.map((row, y) =>
        row.map((tile, x) => {
          if (x === prev.x && y === prev.y) return 0; // Очищаємо старе місце героя
          if (x === newX && y === newY) return 3; // Ставимо героя на нове місце
          return tile;
        }),
      );

      setMap(newMap);

      return { x: newX, y: newY };
    });
  };

  return {
    moveHero,
    heroPosition,
    map
  };
};
