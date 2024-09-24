import { GameItem } from '@/lib/types/game.types';
import React from 'react';

import { ItemModifiers } from './ItemModifiers';
import { BuyIcon } from './game-icons/BuyIcon';
import { GoldIcon } from './game-icons/GoldIcon';
import { cn } from '@/lib/utils';

interface Props {
  item: GameItem;
}

export const ShopItemCard = ({ item }: Props) => {
  const rarity = {
    'border-blue-700': item.rarity === 'MAGIC',
    'border-purple-500': item.rarity === 'EPIC',
    'border-orange-500 ': item.rarity === 'RARE',
  };
  console.log(item);
  return (
    <article className={cn("flex flex-col p-4 border rounded gap-4 text-sm ", {...rarity})}>
      <section className="flex gap-3">
        <img
          className="size-14"
          src={item.imageUrl}
          alt={`${item.name}-image`}
        />
        <ItemModifiers item={item} />
      </section>
      <section className="mt-auto">
        <div className="flex items-center gap-1 text-xs">
          <span>{item.price}</span>
          <GoldIcon classname="size-5" />
          <div className="ml-auto">
            <BuyIcon gameItemId={item.id} />
          </div>
        </div>
      </section>
    </article>
  );
};
