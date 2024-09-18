import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useAppSelector } from '@/hooks/store';
import { setGameItem } from '@/lib/redux/gameItemSlice';
import { GameItem, InventoryItem } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import React, { Fragment, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getModifiers } from '../utils';

interface InventoryItemCardProps {
  item: GameItem;
  setHeroItem?: (gameItem: GameItem) => void;
  isSelected?: boolean;
  classname?: string;
}

export const GameItemCard = ({
  item,
  setHeroItem,
  isSelected,
  classname,
}: InventoryItemCardProps) => {
  const dispatch = useDispatch();
  const gameItem = useAppSelector((state) => state.gameItem.gameItem);
  const onMouseEnter = () => {
    dispatch(setGameItem(item));
  };
  const modifiersArr = getModifiers(gameItem);
  return (
    <>
      <HoverCard openDelay={0} closeDelay={0}>
        <div className="relative">
       
           
              <HoverCardTrigger>
                <img
                  onClick={() => setHeroItem && setHeroItem(item)}
                  onMouseEnter={onMouseEnter}
                  key={item.id}
                  className={cn(
                    ' hover:opacity-100 transition-opacity opacity-75 border  shadow cursor-pointer  ',
                    classname,
                    {
                      'border-primary': isSelected,
                    },
                  )}
                  src={item.imageUrl}
                  alt="weapon-image"
                />
              </HoverCardTrigger>
         

        
        </div>

        <HoverCardContent className="w-fit text-[15px]">
          <section className="flex gap-4">
            <img
              className="object-cover shrink-0  lg:size-16 size-14 border  shadow rounded "
              src={gameItem?.imageUrl}
              alt="weapon-image"
            />

            <div className="flex flex-col">
              <h3 className="font-medium text-base mb-2">{gameItem?.name}</h3>
              <div className="">
                {gameItem?.modifier?.minDamage &&
                  gameItem?.modifier?.maxDamage && (
                    <p className="text-yellow-100">
                      damage <span>{gameItem?.modifier?.minDamage}</span> -
                      <span> {gameItem?.modifier?.maxDamage}</span>
                    </p>
                  )}

                {modifiersArr.map((modifier) => (
                  <Fragment key={modifier.name}>
                    {modifier.value && (
                      <p className="text-primary ">
                        +{modifier.value}
                        <span
                          className={cn(
                            'text-muted-foreground ml-2',
                            modifier.color,
                          )}
                        >
                          {modifier.name}
                        </span>
                      </p>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </section>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};
