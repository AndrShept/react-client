import { GameItem } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import React from 'react';

import { getRarity } from '../utils';
import { ItemModifiers } from './ItemModifiers';
import { BuyIcon } from './game-icons/BuyIcon';
import { GoldIcon } from './game-icons/GoldIcon';

interface Props {
  item: GameItem;
  isShowBuyButton?: boolean;
}

export const ItemCardInfo = ({ item, isShowBuyButton = false }: Props) => {
  return (
    <article
      className={cn('flex flex-col p-4 border rounded gap-4 text-sm ', {
        ...getRarity(item),
      })}
    >
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
          {isShowBuyButton && (
            <div className="ml-auto">
              <BuyIcon gameItemId={item.id} />
            </div>
          )}
        </div>
      </section>
    </article>
  );
};
