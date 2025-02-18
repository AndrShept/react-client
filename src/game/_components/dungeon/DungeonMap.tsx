import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { useSocket } from '@/components/providers/SocketProvider';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  setHeroPos,
  updateCameraPos,
  updateTile,
} from '@/lib/redux/dungeonSessionSlice';
import { setSysMessages } from '@/lib/redux/heroSlice';
import { useGetDungeonMapQuery } from '@/lib/services/game/dungeonApi';
import {
  ISocketDungeonMoveHero,
  ISysMessages,
  Tile,
} from '@/lib/types/game.types';
import { useEffect } from 'react';

import { DungeonTile } from './DungeonTile';

interface Props {
  dungeonSessionId: string;
}
export const DungeonMap = ({ dungeonSessionId }: Props) => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useGetDungeonMapQuery(dungeonSessionId);
  const { dungeonMap, height, tileSize, width } = useAppSelector(
    (state) =>
      state.dungeonSession.mapData ?? {
        dungeonMap: [],
        height: 0,
        tileSize: 0,
        width: 0,
      },
  );
  const cameraPos = useAppSelector((state) => state.dungeonSession.cameraPos);
  const heroId = useAppSelector((state) => state.hero.hero?.id ?? '');

  useEffect(() => {

    const moveHeroListener = (data: ISocketDungeonMoveHero) => {
      if (data.newTiles.some((tile) => tile.heroId === heroId)) {
        dispatch(setHeroPos(data.heroPos));
        dispatch(updateCameraPos());
      }
      dispatch(updateTile(data.newTiles));
    };
    const updateTileListener = (tile: Tile[]) => {
      dispatch(updateTile(tile));
    };


    socket?.on(`move-hero-${dungeonSessionId}`, moveHeroListener);
    socket?.on(`update-tile-${dungeonSessionId}`, updateTileListener);
    socket?.emit('dungeon-init', dungeonSessionId);
    return () => {

      socket?.off(`move-hero-${dungeonSessionId}`, moveHeroListener);
      socket?.off(`update-tile-${dungeonSessionId}`, updateTileListener);
    };
  }, [dispatch, dungeonSessionId, heroId, socket]);

  if (isLoading) {
    return (
      <div className=" m-auto">
        <AnimatedShinyText className="inline-flex  items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Building map...</span>
        </AnimatedShinyText>
      </div>
    );
  }
  if (isError) return 'DATA FETCHING MAP ERROR';
  return (
    <div className=" relative  overflow-hidden h-[60vh] w-[900px] mx-auto mt-2 rounded-xl border ">
      <div
        className="absolute"
        style={{
          width: `${tileSize * width}px`,
          height: `${tileSize * height}px`,
          transform: ` translate(${cameraPos?.x}px, ${cameraPos?.y}px)`,
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
