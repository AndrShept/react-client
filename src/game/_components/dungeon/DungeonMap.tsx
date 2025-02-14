import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
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
    return (
      <div className=" m-auto">
        <AnimatedShinyText className="inline-flex  items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Loading map...</span>
        </AnimatedShinyText>
      </div>
    );
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
