import React, { useState, useEffect } from 'react';

const TILE_SIZE = 48; // Розмір одного тайлу у пікселях

const initialMap = [
  [3, 0, 1, 0, 0], // 0 - пустий тайл, 1 - скриня
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2], // 2 - монстр
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0], // 3 - герой
];

export const DungeonMap = () => {
  const [map, setMap] = useState(initialMap);
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 }); // Початкова позиція героя

  const moveHero = (dx: number, dy: number) => {
    setHeroPosition((prev) => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;

      // Перевіряємо межі карти
      if (newX < 0 || newY < 0 || newX >= map[0].length || newY >= map.length) return prev;

      if (map[newY][newX] !== 0) {
        console.log("Ця клітинка зайнята!");
        return prev; // Герой не рухається
      }

      // Оновлюємо карту, якщо герой рухається
      const newMap = map.map((row, y) =>
        row.map((tile, x) => {
          if (x === prev.x && y === prev.y) return 0; // Очищаємо старе місце героя
          if (x === newX && y === newY) return 3; // Ставимо героя на нове місце
          return tile;
        })
      );

      setMap(newMap);

      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    console.log(map)
  }, [map])

  return (
    <section>
      <div
        className='scale-75'
        style={{
          position: 'relative',
          width: `${TILE_SIZE * map[0].length}px`,
          height: `${TILE_SIZE * map.length}px`,
          display: 'grid',
          gridTemplateColumns: `repeat(${map[0].length}, ${TILE_SIZE}px)`,
        }}
      >
        {map.map((row, y) =>
          row.map((tile, x) => (
            <div
            
              key={`${x}-${y}`}
              style={{
                width: TILE_SIZE,
                height: TILE_SIZE,
                position: 'relative',
                backgroundColor: tile === 0 ? 'white' : tile === 1 ? 'goldenrod' : 'red',
              }}
            
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
               className='hover:scale-105 duration-100 '
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
          ))
        )}
      </div>

      {/* Кнопки для руху */}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => moveHero(0, -1)}>Вгору</button>
        <button onClick={() => moveHero(0, 1)}>Вниз</button>
        <button onClick={() => moveHero(-1, 0)}>Вліво</button>
        <button onClick={() => moveHero(1, 0)}>Вправо</button>
      </div>
    </section>
  );
};
