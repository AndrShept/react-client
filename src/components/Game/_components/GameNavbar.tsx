import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/store';
import React, { useEffect, useState } from 'react';

import { getRandomValue } from '../utils';
import { FillBar } from './FillBar';

export const GameNavbar = () => {
  const [currentHp, setCurrentHp] = useState(100);
  const [maxHp, setMaxHp] = useState(120);
  const [isBattle, setIsBattle] = useState(false);
  const hero = useAppSelector((state) => state.hero.hero);

  useEffect(() => {
    const hpRegenerate = setInterval(() => {
      if (currentHp < maxHp && !isBattle) {
        setCurrentHp((prev) => prev + 1);
      }
    }, 1000);
    if (currentHp < 0) {
      setCurrentHp(0);
    }
    return () => clearInterval(hpRegenerate);
  }, [currentHp]);
  return (
    <section className="">
      <div className="h-14 border-b p-2 flex gap-2">
        <div className="flex gap-1 ml-auto">
          <Button className="relative" size={'icon'} variant={'outline'}>
            <img
              className="size-8"
              src="sprites/icons/backpack.png"
              alt="backpack-image"
            />
            <div className="absolute text-[10px] -bottom-1">
              {hero?.inventorys.length}/{hero?.inventorySlots}
            </div>
          </Button>
          <Button size={'icon'} variant={'outline'}>
            <img
              className="size-8"
              src="sprites/icons/skills.png"
              alt="backpack-image"
            />
          </Button>
        </div>

        <FillBar color="green" value={currentHp} maxValue={maxHp} />
      </div>
      <div className="flex-1"></div>
    </section>
  );
};
