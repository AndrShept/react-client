import { useAppSelector } from '@/hooks/store';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FillBar } from './FillBar';
import { HeroAvatar } from './HeroAvatar';
import { AbilityGameIcon } from './game-icons/AbilityGameIcon';
import { BackpackGameIcon } from './game-icons/BackpackGameIcon';
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
      <div className="flex gap-1 ml-auto">
        <Link to={'shop'}>
          <ShopGameIcon />
        </Link>
        <AbilityGameIcon />
        <Link to={'inventory'}>
          <BackpackGameIcon wrapperClassname=" relative">
            <div className="absolute text-[10px] -bottom-1">
              {hero?.inventorys.length}/{hero?.inventorySlots}
            </div>
          </BackpackGameIcon>
        </Link>
      </div>
    </section>
  );
};
