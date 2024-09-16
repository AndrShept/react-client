import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useAppSelector } from '@/hooks/store';
import { setInventoryItem } from '@/lib/redux/inventoryItemSlice';
import { InventoryItem } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';

import { getModifiers } from '../utils';

interface InventoryItemCardProps {
  item: InventoryItem;
  setHeroItem?: (inventoryItem: InventoryItem) => void;
  isSelected?: boolean;
}

export const InventoryItemCard = ({
  item,
  setHeroItem,
  isSelected,
}: InventoryItemCardProps) => {
  const dispatch = useDispatch();
  const inventoryItem = useAppSelector(
    (state) => state.inventoryItem.inventoryItem,
  );
  const onMouseEnter = () => {
    dispatch(setInventoryItem(item));
  };

  const modifiersArr = getModifiers(inventoryItem);

  return (
    <>
      <HoverCard openDelay={200} closeDelay={0}>
        <HoverCardTrigger>
          <img
            onClick={() => setHeroItem && setHeroItem(item)}
            onMouseEnter={onMouseEnter}
            key={item.id}
            className={cn(
              'lg:size-16 size-14 hover:opacity-100 transition-opacity opacity-75 border  shadow rounded cursor-pointer ',
              {
                'border-primary': isSelected,
              },
            )}
            src={item.imageUrl}
            alt="weapon-image"
          />
        </HoverCardTrigger>
        <HoverCardContent className="w-fit">
          <section className="flex gap-4">
            <img
              className="object-cover shrink-0  lg:size-16 size-14 border  shadow rounded "
              src={inventoryItem?.imageUrl}
              alt="weapon-image"
            />

            <div className="flex flex-col">
              <h3 className="font-medium text-base mb-2">
                {inventoryItem?.name}
              </h3>
              <div className="">
                {inventoryItem?.modifier?.minDamage &&
                  inventoryItem?.modifier?.maxDamage && (
                    <p className="text-yellow-300">
                      min: <span>{inventoryItem?.modifier?.minDamage}</span>{' '}
                      max: <span>{inventoryItem?.modifier?.maxDamage}</span>
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
