import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/store';
import { Link, useLocation } from 'react-router-dom';

import { FillBar } from './FillBar';
import { HeroAvatar } from './HeroAvatar';
import { BackpackButton } from './game-button/BackpackButton';
import { DungeonButton } from './game-button/DungeonButton';
import { ShopButton } from './game-button/ShopButton';
import { GoldIcon } from './game-icons/GoldIcon';
import { PremIcon } from './game-icons/PremIcon';

export const gameUrls = {
  dungeons: 'dungeons',
  shop: 'shop',
  inventory: 'inventory',
};

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
                value={hero?.health ?? 0}
                maxValue={hero?.modifier.maxHealth ?? 0}
              />
              <FillBar
                color="blue"
                value={hero?.mana ?? 0}
                maxValue={hero?.modifier.maxMana ?? 0}
              />
            </div>
          </article>
        )}
      </div>
      <div className="flex gap-1 ml-auto  ">
        <div className="my-auto flex  items-center gap-1 mr-4">
          <div className="flex  items-center">
            <GoldIcon classname="size-6  " />
            <span className="text-xs">{hero?.gold}</span>
          </div>
          <div className="flex  items-center">
            <PremIcon classname="size-6 " />
            <span className="text-xs">{hero?.premCoin}</span>
          </div>
        </div>

        <Link to={gameUrls.dungeons}>
          <DungeonButton />
        </Link>
        <Link to={gameUrls.shop}>
          <ShopButton />
        </Link>
        <Button variant={'outline'} size={'icon'}>
          <img
            className={'size-8'}
            src="/sprites/icons/ability.png"
            alt="ability-image"
          />
        </Button>
        <Link to={gameUrls.inventory}>
          <BackpackButton
            inventorySlots={hero?.inventorySlots}
            inventorysLength={hero?.inventorys.length}
          />
        </Link>
      </div>
    </section>
  );
};
