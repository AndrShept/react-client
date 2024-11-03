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
import { useEquipItem } from '@/hooks/useEquipItem';
import { setGameItem } from '@/lib/redux/gameItemSlice';
import { deleteItem, drinkPotion, setSysMessages } from '@/lib/redux/heroSlice';
import {
  useDeleteItemServerMutation,
  useDrinkPotionServerMutation,
} from '@/lib/services/game/heroApi';
import { GameItem, InventoryItem } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { ConfirmPopover } from './ConfirmPopover';
import { ItemCardInfo } from './ItemCardInfo';

interface Props {
  inventoryItem: InventoryItem;
  inventoryItemId: string;
  setHeroItem?: (gameItem: GameItem) => void;
  isSelected?: boolean;
  classname?: string;
  isContextMenuShow?: boolean;
  isCanEquipped: boolean;
  isDoubleCLick: boolean;
  isCanDrink: boolean;
}

export const GameItemCard = ({
  setHeroItem,
  isSelected,
  classname,
  isContextMenuShow = true,
  isDoubleCLick,
  isCanEquipped,
  isCanDrink,
  inventoryItem,
  inventoryItemId,
}: Props) => {
  const [isShow, setIsShow] = useState(false);
  const hero = useAppSelector((state) => state.hero.hero);
  const dispatch = useDispatch();
  const [deleteItemServer] = useDeleteItemServerMutation();
  const [drinkPotionServer] = useDrinkPotionServerMutation();
  const { onEquip } = useEquipItem({
    hero,
    inventoryItem,
    inventoryItemId,
  });
  const isSelf = inventoryItem?.heroId === hero?.id;

  const onMouseEnter = () => {
    dispatch(setGameItem(inventoryItem.gameItem));
  };

  const onClick = () => {
    setHeroItem && setHeroItem(inventoryItem.gameItem);
  };

  const onDrink = () => {
    dispatch(drinkPotion(inventoryItem));
    try {
      drinkPotionServer({ inventoryItemId });
    } catch (error) {
      toast('Something went wrong');
    }
  };
  const onDelete = async () => {
    try {
      await deleteItemServer({ id: inventoryItemId });
      dispatch(deleteItem(inventoryItem));
    } catch (error) {
      dispatch(
        setSysMessages({
          success: false,
          message: 'Delete item error',
          createdAt: Date.now(),
        }),
      );
    }
  };

  const onDoubleClick = async () => {
    if (!isDoubleCLick || !isCanEquipped) return;
    setTimeout(() => {
      onEquip();
    }, 300);
  };
  return (
    <>
      <HoverCard openDelay={0} closeDelay={0}>
        <ContextMenu modal={false} onOpenChange={(data) => setIsShow(data)}>
          <div className="relative">
            <ContextMenuTrigger>
              <HoverCardTrigger className="relative">
                <img
                  onDoubleClick={onDoubleClick}
                  onClick={onClick}
                  onMouseEnter={onMouseEnter}
                  key={inventoryItem.id}
                  className={cn(
                    ' hover:opacity-100 transition-opacity opacity-75 border  shadow cursor-pointer size-full  ',
                    classname,
                    {
                      'border-primary': isSelected,
                    },
                  )}
                  src={inventoryItem.gameItem?.imageUrl}
                  alt="weapon-image"
                />
                {!!inventoryItem.quantity && inventoryItem.quantity > 1 && (
                  <div className="size-4 absolute -right-0 -bottom-0 flex  rounded-full  border bg-background">
                    <p className=" text-[9px] m-auto">
                      {inventoryItem.quantity}
                    </p>
                  </div>
                )}
              </HoverCardTrigger>
            </ContextMenuTrigger>
          </div>

          {isContextMenuShow && isSelf && isShow && (
            <ContextMenuContent>
              {!inventoryItem.isEquipped && isCanEquipped && (
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

              <ContextMenuItem asChild>
                <ConfirmPopover setIsShow={setIsShow} onConfirm={onDelete}>
                  <ConfirmPopover.Trigger className="w-full group">
                    <Button
                      className="w-full rounded-sm h-8 justify-start text-xs px-2 py-1.5 cursor-default space-x-1 group-hover:text-red-500"
                      size={'icon'}
                      variant={'ghost'}
                    >
                      <X className="size-5" />
                      <span>Delete</span>
                    </Button>
                  </ConfirmPopover.Trigger>
                  <ConfirmPopover.Content>
                    <ConfirmPopover.Title>
                      Are you sure you want to delete item?
                    </ConfirmPopover.Title>
                    <ConfirmPopover.Message className="text-red-500">
                      {inventoryItem.gameItem.name}
                      {inventoryItem.quantity > 1 && (
                        <span className="ml-1 text-primary">
                          [x{inventoryItem.quantity}]
                        </span>
                      )}
                    </ConfirmPopover.Message>
                  </ConfirmPopover.Content>
                </ConfirmPopover>
              </ContextMenuItem>
            </ContextMenuContent>
          )}
        </ContextMenu>

        <HoverCardContent sideOffset={10} className="p-0 border-none  ">
          <ItemCardInfo item={inventoryItem.gameItem} />
        </HoverCardContent>
      </HoverCard>
    </>
  );
};
