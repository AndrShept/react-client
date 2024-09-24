import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppSelector } from '@/hooks/store';
import React from 'react';

import { GameItemCard } from './GameItemCard';

export const HeroInventory = () => {
  const hero = useAppSelector((state) => state.hero.hero);
  return (
    <ScrollArea className="h-full ">
      <ul className="flex flex-wrap gap-1">
        {[...Array(hero?.inventorySlots)].map((_, idx) => (
          <div key={idx} className="size-12 border relative group ">
            <div className='bg-red-400 w-10 h-5 absolute z-40  -top-10'>

            </div>
            {hero?.inventorys[idx] && (
              <GameItemCard
                isSelected={false}
                item={hero?.inventorys[idx].gameItem!}
                inventoryItemId={hero?.inventorys[idx].id}
              />
            )}
          </div>
        ))}
      </ul>
    </ScrollArea>
  );
};
