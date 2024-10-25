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
import { GameItem, InventoryItem } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import { useDispatch } from 'react-redux';

import { ItemCardInfo } from './ItemCardInfo';
import { drinkPotion } from '@/lib/redux/heroSlice';
import { useDrinkPotionServerMutation } from '@/lib/services/game/heroApi';
import { toast } from 'sonner';

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
  const dispatch = useDispatch();
  const hero = useAppSelector((state) => state.hero.hero);
  const [drinkPotionServer] = useDrinkPotionServerMutation()
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
    dispatch(drinkPotion(inventoryItem))
    try {
      
      drinkPotionServer({inventoryItemId})
    } catch (error) {
      toast('Something went wrong')
    }

  };

  const onDoubleClick = async () => {
    if (!isDoubleCLick || !isCanEquipped ) return;
    setTimeout(() => {
      onEquip();
    }, 300);
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

          {isContextMenuShow && isSelf && (
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
            </ContextMenuContent>
          )}
        </ContextMenu>

        <HoverCardContent className="p-0 border-none">
          <ItemCardInfo item={inventoryItem.gameItem} />
        </HoverCardContent>
      </HoverCard>
    </>
  );
};
