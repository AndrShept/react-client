import { isObjectNearHero } from '@/game/utils';
import { useSocketDungeonMap } from '@/hooks/game/useSocketDungeonMap';

import { DungeonTile } from './DungeonTile';

interface Props {
  dungeonSessionId: string;
}
export const DungeonMap = ({ dungeonSessionId }: Props) => {
  const { mapData, heroPos } = useSocketDungeonMap({
    dungeonSessionId,
  });

  if (!mapData || !heroPos) {
    return <p>Loading dungeon map...</p>;
  }
  const { dungeonMap, height, tileSize, width } = mapData;
  console.log(dungeonMap);



  
  return (
    <section className="flex">
      <div className="relative">
        <img src="/sprites/dungeons/testDung.png " alt="dung-image" />
        <div
          className="absolute left-0 top-0"
          style={{
            width: `${tileSize! * width!}px`,
            height: `${tileSize! * height!}px`,
            display: 'grid',
            gridTemplateColumns: `repeat(${width}, ${tileSize}px)`,
          }}
        >
          {dungeonMap?.map((row, y) =>
            row.map((tile, x) => {
              const isNearby = isObjectNearHero(heroPos.x, heroPos.y, x, y);

              return (
                <DungeonTile
                  key={y - x}
                  isNearby={isNearby}
                  TILE_SIZE={tileSize ?? 0}
                  tile={tile}
                  dungeonSessionId={dungeonSessionId}
                  x={x}
                  y={y}
                />
              );
            }),
          )}
        </div>
      </div>
    </section>
  );
};
