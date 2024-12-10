import { isObjectNearHero } from '@/game/utils';
import { useSocketDungeonMap } from '@/hooks/game/useSocketDungeonMap';

import { DungeonTile } from './DungeonTile';

interface Props {
  dungeonSessionId: string;
}
export const DungeonMap = ({ dungeonSessionId }: Props) => {
  const { mapData, heroPos, cameraPos, isLoading } = useSocketDungeonMap({
    dungeonSessionId,
  });
  if (isLoading) {
    return <p>Loading dungeon map...</p>;
  }
  if (!mapData || !cameraPos || !heroPos) return;
  const { dungeonMap, height, tileSize, width } = mapData;
  console.log(dungeonMap);

  return (
    <div className="relative  overflow-hidden h-[60vh] w-[600px] mx-auto">
      <img
        className="object-cover  "
        src="/sprites/dungeons/testDung.png"
        alt="dung-image"
        style={{
          width: `${tileSize * width}px`,
          height: `${tileSize * height}px`,
          objectPosition: `${cameraPos.x}px ${cameraPos.y}px`,
        }}
      />
      <div
        className="absolute left-0 top-0 "
        style={{
          width: `${tileSize * width}px`,
          height: `${tileSize * height}px`,
          display: 'grid',
          gridTemplateColumns: `repeat(${width}, ${tileSize}px)`,
          transform: ` translate(${cameraPos.x}px, ${cameraPos.y}px)`,
        }}
      >
        {dungeonMap?.map((row, y) =>
          row.map((tile, x) => {
            const isNearby = isObjectNearHero(heroPos.x, heroPos.y, x, y);

            return (
              <DungeonTile
                key={y - x}
                isNearby={isNearby}
                TILE_SIZE={tileSize}
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
  );
};
