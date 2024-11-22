import { isObjectNearHero } from '@/game/utils';
import { useHeroMove } from '@/hooks/game/useHeroMove';
import { useEffect } from 'react';

import { DungeonMovingButtons } from './DungeonMovingButtons';
import { DungeonTiles } from './DungeonTiles';

const TILE_SIZE = 48;

const initialMap = [
  [3, 0, 1, 0, 0], // 0 - пустий тайл, 1 - скриня
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2], // 2 - монстр
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0], // 3 - герой
];

export const DungeonMap = () => {
  const { heroPosition, moveHero, map } = useHeroMove({
    initialMap,
  });
  useEffect(() => {
    console.log(map);
    console.log(heroPosition);
  }, [map]);

  return (
    <section className="flex">
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
            const isNearby = isObjectNearHero(
              heroPosition.x,
              heroPosition.y,
              x,
              y,
            );

            return (
              <DungeonTiles
                key={y - x}
                isNearby={isNearby}
                TILE_SIZE={TILE_SIZE}
                tile={tile}
              />
            );
          }),
        )}
      </div>

      <div className="ml-4">
        <DungeonMovingButtons moveHero={moveHero} />
      </div>
    </section>
  );
};
