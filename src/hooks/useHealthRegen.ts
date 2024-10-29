import { HEALTH_REGEN } from '@/lib/constants';
import { incrementHealth, incrementMana } from '@/lib/redux/heroSlice';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './store';

export const useHealthRegen = () => {
  const health = useAppSelector((state) => state.hero.hero?.health ?? 0);
  const maxHealth = useAppSelector(
    (state) => state.hero.hero?.modifier.maxHealth ?? 0,
  );
  const strength = useAppSelector(
    (state) => state.hero.hero?.modifier.strength ?? 0,
  );
  const constitution = useAppSelector(
    (state) => state.hero.hero?.modifier.constitution ?? 0,
  );
  const dispatch = useAppDispatch();
  const healthTime = HEALTH_REGEN - (constitution * 30 + strength * 10);
  console.log(healthTime);
  useEffect(() => {
    const healthInterval = setInterval(() => {
      dispatch(incrementHealth());
      if (health >= maxHealth) {
        clearInterval(healthInterval);
      }
    }, healthTime);

    return () => {
      clearInterval(healthInterval);
    };
  }, [health, maxHealth]);

  return health;
};
