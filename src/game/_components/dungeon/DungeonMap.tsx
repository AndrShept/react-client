import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

import { DungeonMovingButtons } from './DungeonMovingButtons';

const TILE_SIZE = 48;

const initialMap = [
  [3, 0, 1, 0, 0], // 0 - пустий тайл, 1 - скриня
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2], // 2 - монстр
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0], // 3 - герой
];

const isNearHero = (
  heroX: number,
  heroY: number,
  objX: number,
  objY: number,
) => {
  const dx = Math.abs(heroX - objX);
  const dy = Math.abs(heroY - objY);

  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
};

export const DungeonMap = () => {
  const [map, setMap] = useState(initialMap);
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 });

  const moveHero = (dx: number, dy: number) => {
    setHeroPosition((prev) => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;

      // Перевіряємо межі карти
      if (newX < 0 || newY < 0 || newX >= map[0].length || newY >= map.length)
        return prev;

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

  useEffect(() => {
    console.log(map);
    console.log(heroPosition);
  }, [map]);

  return (
    <section>
      <div
        style={{
          position: 'relative',
          width: `${TILE_SIZE * map[0].length}px`,
          height: `${TILE_SIZE * map.length}px`,
          display: 'grid',
          gridTemplateColumns: `repeat(${map[0].length}, ${TILE_SIZE}px)`,
        }}
      >
        {map.map((row, y) =>
          row.map((tile, x) => {
            const isNearby = isNearHero(heroPosition.x, heroPosition.y, x, y);

            return (
              <div
                key={`${x}-${y}`}
                style={{
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                  position: 'relative',
                }}
                className={cn({
                  'bg-white': tile === 0,
                  'bg-orange-400': tile === 1,
                  'bg-red-500': tile === 2,
                  'bg-lime-500': isNearby && tile !== 0,
                })}
              >
                {tile === 3 && (
                  <img
                    src="/path/to/hero.png"
                    alt="Hero"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                )}
                {tile === 1 && (
                  <img
                    className="hover:scale-105 duration-100 "
                    src="/path/to/chest.png"
                    alt="Chest"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                )}
                {tile === 2 && (
                  <img
                    src="/path/to/monster.png"
                    alt="Monster"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                )}
              </div>
            );
          }),
        )}
      </div>

      <div style={{ marginTop: 10 }}>
        <DungeonMovingButtons moveHero={moveHero} />
      </div>
    </section>
  );
};
