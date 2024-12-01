import { useSocket } from '@/components/providers/SocketProvider';
import { setDungeonMap, setHeroPos } from '@/lib/redux/dungeonSessionSlice';
import { ISocketDungeonMapData, Tile } from '@/lib/types/game.types';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store';

interface Props {
  dungeonSessionId: string;
}

export const useSocketDungeonMap = ({ dungeonSessionId }: Props) => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  const mapData = useAppSelector((state) => state.dungeonSession.mapData);
  const heroPos = useAppSelector((state) => state.dungeonSession.heroPos);
  useEffect(() => {
    const socketListener = (data: ISocketDungeonMapData) => {
      dispatch(setDungeonMap(data));
    };
  
    socket?.emit('dungeon-init', dungeonSessionId);

    socket?.on(dungeonSessionId, socketListener);

    return () => {
      socket?.off(dungeonSessionId, socketListener);
    };
  }, [socket, dungeonSessionId]);
  return {
    mapData,
    heroPos
  };
};
