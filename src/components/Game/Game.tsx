import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

import { Button } from '../ui/button';
import { getRandomValue } from './utils';

export const Game = () => {
  const [currentHp, setCurrentHp] = useState(100);
  const [maxHp, setMaxHp] = useState(120);
  const [isBattle, setIsBattle] = useState(false);

  const onClick = () => {
    if (currentHp > 0) {
      setCurrentHp((prev) => prev - getRandomValue(5, 10));
    }
  };

  useEffect(() => {
    const hpRegenerate = setInterval(() => {
      if (currentHp < maxHp && !isBattle) {
        setCurrentHp((prev) => prev + 1);
        console.log('GPOGOGOG');
      }
    }, 1000);
    if (currentHp < 0) {
      setCurrentHp(0);
    }
    return () => clearInterval(hpRegenerate);
  }, [currentHp]);

  return (
    <section className="flex flex-col ">
      <div className="h-14 border-b p-2 flex gap-2">
        <div className="flex gap-1 ml-auto">
          <Button onClick={onClick} size={'icon'} variant={'outline'}>
            <img
              className="size-8"
              src="sprites/icons/backpack.png"
              alt="backpack-image"
            />
          </Button>
          <Button size={'icon'} variant={'outline'}>
            <img
              className="size-8"
              src="sprites/icons/skills.png"
              alt="backpack-image"
            />
          </Button>
        </div>

        <div className="relative border rounded-lg w-28 h-4">
          <div
            style={{ width: `${(currentHp / maxHp) * 100}%` }}
            className={cn(
              ' h-full transition-all duration-300 ease-in-out rounded-lg  bg-gradient-to-b from-green-400  to-green-800 ',
              {
                'bg-gradient-to-b from-red-400  to-red-800': currentHp < 30,
              },
            )}
          />
          <div className="absolute w-full -top-[1px] text-center">
            <p className=" text-[11px]">{currentHp}</p>
          </div>
        </div>
      </div>
      <div className="flex-1"></div>
    </section>
  );
};
