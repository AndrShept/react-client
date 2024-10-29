import { incrementHealth, incrementMana } from '@/lib/redux/heroSlice';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './store';

export const useManaRegen = () => {
  const mana = useAppSelector((state) => state.hero.hero?.mana ?? 0);
  const maxMana = useAppSelector(
    (state) => state.hero.hero?.modifier.maxMana ?? 0,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const manaInterval = setInterval(() => {
      dispatch(incrementMana());
      if (mana >= maxMana) {
        clearInterval(manaInterval);
      }
    }, 1000);

    return () => {
      clearInterval(manaInterval);
    };
  }, [mana, maxMana]);

  return mana;
};
