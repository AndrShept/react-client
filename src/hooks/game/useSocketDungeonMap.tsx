import { useSocket } from '@/components/providers/SocketProvider';
import {
  setDungeonMap,
  setHeroPos,
  updateCameraPos,
  updateTile,
} from '@/lib/redux/dungeonSessionSlice';
import { ISysMessages, setSysMessages } from '@/lib/redux/heroSlice';
import {
  ISocketDungeonMapData,
  ISocketDungeonMoveHero,
} from '@/lib/types/game.types';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store';

interface Props {
  dungeonSessionId: string;
}

export const useSocketDungeonMap = ({ dungeonSessionId }: Props) => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  const mapData = useAppSelector((state) => state.dungeonSession.mapData);
  const heroId = useAppSelector((state) => state.hero.hero?.id);
  const heroPos = useAppSelector((state) => state.dungeonSession.heroPos);
  const cameraPos = useAppSelector((state) => state.dungeonSession.cameraPos);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!socket) return;
    const socketListener = (data: ISocketDungeonMapData) => {
      dispatch(setDungeonMap(data));
      dispatch(updateCameraPos());
      setIsLoading(false);
    };
    const updateTileListener = (data: ISocketDungeonMoveHero) => {
      console.log(data);
      if (data.newTiles.some((tile) => tile.heroId === heroId)) {
        dispatch(setHeroPos(data.heroPos));
        dispatch(updateCameraPos());
      }
      dispatch(updateTile(data.newTiles));
    };
    const heroListener = (data: ISysMessages) => {
      dispatch(
        setSysMessages({
          ...data,
          createdAt: Date.now(),
        }),
      );
    };

    socket.emit('dungeon-init', dungeonSessionId);

    socket.on(dungeonSessionId, socketListener);
    socket.on(`move-hero-${dungeonSessionId}`, updateTileListener);
    socket.on(`move-hero-${heroId}`, heroListener);

    return () => {
      socket.off(dungeonSessionId, socketListener);
      socket.off(`move-hero-${dungeonSessionId}`, updateTileListener);
      socket.off(`move-hero-${heroId}`, heroListener);
    };
  }, [socket, dungeonSessionId, dispatch, heroId]);
  return {
    mapData,
    heroPos,
    cameraPos,
    isLoading,
  };
};
