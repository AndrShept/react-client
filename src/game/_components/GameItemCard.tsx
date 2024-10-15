import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useAppSelector } from '@/hooks/store';
import { setGameItem } from '@/lib/redux/gameItemSlice';
import { equipItem, equipItemNew, setSysMessages, unEquipItem } from '@/lib/redux/heroSlice';
import {
  useEquipHeroItemMutation,
  useGetMyHeroQuery,
  useLazyGetMyHeroQuery,
  useUnEquipHeroItemMutation,
} from '@/lib/services/game/heroApi';
import { ErrorMessage } from '@/lib/types';
import { GameItem } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { getRarity } from '../utils';
import { ItemCardInfo } from './ItemCardInfo';

interface Props {
  item: GameItem | undefined;
  setHeroItem?: (gameItem: GameItem) => void;
  isSelected?: boolean;
  classname?: string;
  inventoryItemId: string;
  equipmentHeroId: string;
  quantity?: number | undefined;
  isContextMenuShow?: boolean;
  isEquipped: boolean;
  isCanEquipped: boolean;
  isDoubleCLick: boolean;
  isCanDrink: boolean;
}

export const GameItemCard = ({
  item,
  setHeroItem,
  isSelected,
  classname,
  inventoryItemId,
  equipmentHeroId,
  isEquipped,
  isContextMenuShow = true,
  isDoubleCLick,
  isCanEquipped,
  isCanDrink,
  quantity,
}: Props) => {
  if (!item) {
    return;
  }
  const dispatch = useDispatch();
  const heroId = useAppSelector((state) => state.hero.hero?.id);
  const [equipHero] = useEquipHeroItemMutation();
  const [unEquipHero] = useUnEquipHeroItemMutation();
  const [refetchHero] = useLazyGetMyHeroQuery();

  const isSelf = equipmentHeroId === heroId;
  const onMouseEnter = () => {
    dispatch(setGameItem(item));
  };

  const onClick = () => {
    setHeroItem && setHeroItem(item);
  };
  const onEquip = async () => {
    dispatch(equipItemNew({ id: inventoryItemId, type: item.type }));
    // dispatch(equipItem({ id: inventoryItemId, type: item.type }));
  };

  const onUnEquipHero = async () => {
    dispatch(unEquipItem({ id: inventoryItemId, type: item.type }));
  };

  const onDrink = () => {
    console.log('DRINKKKKKKKKKKKKKKKKK');
  };

  const onDoubleClick = async () => {
    const canEquip = isDoubleCLick && isSelf && isCanEquipped && !isEquipped;
    const canUnEquip = isDoubleCLick && isSelf && isEquipped;

    if (canEquip) {
    }
    if (canUnEquip) {
    }
  };

  return (
    <>
      <HoverCard openDelay={0} closeDelay={0}>
        <ContextMenu>
          <div className="relative">
            <ContextMenuTrigger>
              <HoverCardTrigger className="relative">
                <img
                  onDoubleClick={onDoubleClick}
                  onClick={onClick}
                  onMouseEnter={onMouseEnter}
                  key={item.id}
                  className={cn(
                    ' hover:opacity-100 transition-opacity opacity-75 border  shadow cursor-pointer size-full  ',
                    classname,
                    {
                      'border-primary': isSelected,
                    },
                    // {...getRarity(item)}
                  )}
                  src={item.imageUrl}
                  alt="weapon-image"
                />
                {!!quantity && quantity > 1 && (
                  <div className="size-4 absolute -right-0 -bottom-0 flex  rounded-full  border bg-background">
                    <p className=" text-[9px] m-auto">{quantity}</p>
                  </div>
                )}
              </HoverCardTrigger>
            </ContextMenuTrigger>
          </div>

          {isContextMenuShow && isSelf && (
            <ContextMenuContent>
              {!isEquipped && isCanEquipped && (
                <ContextMenuItem
                  onClick={onEquip}
                  className="text-xs space-x-1"
                >
                  <img
                    className="size-5"
                    src={'/sprites/icons/equip.png'}
                    alt="equip-image"
                  />
                  <span>Equip</span>
                </ContextMenuItem>
              )}
              {isCanDrink && (
                <ContextMenuItem
                  onClick={onDrink}
                  className="text-xs space-x-1"
                >
                  <img
                    className="size-5"
                    src={'/sprites/icons/health-potion.png'}
                    alt="equip-image"
                  />
                  <span>Drink</span>
                </ContextMenuItem>
              )}

              {isEquipped && (
                <ContextMenuItem
                  onClick={onUnEquipHero}
                  className="text-xs space-x-1"
                >
                  <img
                    className="size-5"
                    src={'/sprites/icons/equip.png'}
                    alt="equip-image"
                  />
                  <span className="text-yellow-200">Unequip </span>
                </ContextMenuItem>
              )}
            </ContextMenuContent>
          )}
        </ContextMenu>

        <HoverCardContent className="p-0 border-none">
          <ItemCardInfo item={item} />
        </HoverCardContent>
      </HoverCard>
    </>
  );
};
