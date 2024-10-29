import { useSocket } from '@/components/providers/SocketProvider';
import { setRegenHealthMana } from '@/lib/redux/heroSlice';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './store';
import { useAuth } from './useAuth';

export const useHealthManaRegen = () => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const { username } = useAuth();
  const health = useAppSelector((state) => state.hero.hero?.health ?? 0);
  const maxHealth = useAppSelector(
    (state) => state.hero.hero?.modifier.maxHealth ?? 0,
  );
  const mana = useAppSelector((state) => state.hero.hero?.mana ?? 0);
  const maxMana = useAppSelector(
    (state) => state.hero.hero?.modifier.maxMana ?? 0,
  );
  const isBattle = useAppSelector((state) => state.hero.hero?.isBattle);

  useEffect(() => {
    if (health < maxHealth && !isBattle) {
      socket?.emit('go-health', { health, maxHealth });
    } else {
      socket?.emit('stop-health', { health, maxHealth });
    }
  }, [health, maxHealth, isBattle, socket]);
  useEffect(() => {
    if (mana < maxMana && !isBattle) {
      socket?.emit('go-mana', { mana, maxMana });
    } else {
      socket?.emit('stop-mana', { mana, maxMana });
    }
  }, [mana, maxMana, isBattle, socket]);
  useEffect(() => {
    const socketListener = (data: Record<string, number>) => {
      console.log(data);
      dispatch(setRegenHealthMana(data));
    };
    if (username && socket) {
      socket.on(username, socketListener);
    }
    return () => {
      socket?.off(username, socketListener);
    };
  }, [socket, username]);

  return {
    health,
    maxHealth,
    mana,
    maxMana,
  };
};
