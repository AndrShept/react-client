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

  return (
    <div className=" relative  overflow-hidden h-[60vh] w-[900px] mx-auto mt-2 rounded-xl border ">
      <div
        className="absolute"
        style={{
          width: `${tileSize * width}px`,
          height: `${tileSize * height}px`,
          transform: ` translate(${cameraPos.x}px, ${cameraPos.y}px)`,
        }}
      >
        {dungeonMap?.map((tile) => {
          return (
            <DungeonTile
              key={tile.id}
              TILE_SIZE={tileSize}
              tile={tile}
              dungeonSessionId={dungeonSessionId}
            />
          );
        })}
      </div>
    </div>
  );
};
