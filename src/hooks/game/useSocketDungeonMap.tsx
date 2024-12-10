import { useSocket } from '@/components/providers/SocketProvider';
import {
  clearDungSession,
  setDungeonMap,
  setHeroPos,
} from '@/lib/redux/dungeonSessionSlice';
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
  const cameraPos = useAppSelector((state) => state.dungeonSession.cameraPos);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!socket) return;
    const socketListener = (data: ISocketDungeonMapData) => {
      dispatch(setDungeonMap(data));
      setIsLoading(false);
    };

    socket.emit('dungeon-init', dungeonSessionId);

    socket.on(dungeonSessionId, socketListener);

    return () => {
      socket.off(dungeonSessionId, socketListener);
    };
  }, [socket, dungeonSessionId, dispatch]);
  return {
    mapData,
    heroPos,
    cameraPos,
    isLoading,
  };
};
