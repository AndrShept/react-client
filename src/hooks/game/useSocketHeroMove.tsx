import { useSocket } from '@/components/providers/SocketProvider';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store';

interface Props {
  dungeonSessionId: string;
}

export const useSocketHeroMove = ({ dungeonSessionId }: Props) => {
  const { socket } = useSocket();
  const heroId = useAppSelector((state) => state.hero.hero?.id);
  const { x, y } = useAppSelector(
    (state) => state.dungeonSession.heroPos ?? { x: 0, y: 0 },
  );
  if (!heroId) return;
  const socketMove = () => {
    console.log(x , y)
    socket?.emit(`move-hero-${heroId}`, { x, y, dungeonSessionId });
  };

  useEffect(() => {
    const socketListener = (data: any) => {
      console.log(data);
    };

    socket?.on(`move-hero-${heroId}`, socketListener);
    console.log(x , y)
    return () => {
      socket?.off(`move-hero-${heroId}`, socketListener);
    };
  }, [dungeonSessionId, socket, heroId, x, y]);

  return {
    heroId,
    socketMove,
  };
};
