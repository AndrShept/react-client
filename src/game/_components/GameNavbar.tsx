import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/store';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FillBar } from './FillBar';
import { HeroAvatar } from './HeroAvatar';
import { GoldIcon } from './game-icons/GoldIcon';
import { ShopGameIcon } from './game-icons/ShopGameIcon';

export const GameNavbar = () => {
  const hero = useAppSelector((state) => state.hero.hero);
  const { pathname } = useLocation();

  return (
    <section className="border-b flex gap-2 p-3 items-center h-16  ">
      <div>
        {pathname !== '/game' && (
          <article className="flex items-center  gap-2">
            <div>
              <Link to={'/game'}>
                <HeroAvatar src={hero?.avatarUrl} />
              </Link>
            </div>
            <div className="md:w-[200px] w-[100px]">
              <FillBar
                color="green"
                value={hero?.modifier.health ?? 0}
                maxValue={hero?.modifier.maxHealth ?? 0}
              />
              <FillBar
                color="blue"
                value={hero?.modifier.mana ?? 0}
                maxValue={hero?.modifier.maxMana ?? 0}
              />
            </div>
          </article>
        )}
      </div>
      <div className="flex gap-1 ml-auto  ">
        <div className="my-auto flex  items-center">
          <GoldIcon classname="size-6 " />
          <span className="text-xs">{hero?.gold}</span>
          
        </div>

        <Link to={'shop'}>
          <ShopGameIcon />
        </Link>
        <Button variant={'outline'} size={'icon'}>
          <img
            className={'size-8'}
            src="/sprites/icons/ability.png"
            alt="ability-image"
          />
        </Button>
        <Link to={'inventory'}>
          <Button className="relative" variant={'outline'} size={'icon'}>
            <img src="/sprites/icons/backpack.png" alt="ShopGameIcon" />
            <div className="absolute text-[10px] -bottom-1">
              {hero?.inventorys.length}/{hero?.inventorySlots}
            </div>
          </Button>
        </Link>
      </div>
    </section>
  );
};
