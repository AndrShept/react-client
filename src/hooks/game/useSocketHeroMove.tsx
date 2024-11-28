import { useSocket } from '@/components/providers/SocketProvider';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store';

export const useSocketHeroMove = () => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const heroId = useAppSelector((state) => state.hero.hero?.id);
  const heroPos = useAppSelector((state) => state.dungeonSession.heroPos);
  if (!heroId) {
    return;
  }

  useEffect(() => {
    console.log(heroPos);
  }, [heroPos]);
};
