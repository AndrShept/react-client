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
import { setSysMessages } from '@/lib/redux/heroSlice';
import {
  useEquipHeroItemMutation,
  useGetMyHeroQuery,
  useLazyGetMyHeroQuery,
  useUnEquipHeroItemMutation,
} from '@/lib/services/game/heroApi';
import { GameItem } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { getRarity } from '../utils';
import { ItemCardInfo } from './ItemCardInfo';

interface Props {
  item: GameItem | undefined;
  setHeroItem?: (gameItem: GameItem) => void;
  isSelected?: boolean;
  classname?: string;
  inventoryItemId?: string;
  isContextMenuShow?: boolean;
  isEquipped?: boolean;
}

export const GameItemCard = ({
  item,
  setHeroItem,
  isSelected,
  classname,
  inventoryItemId,
  isEquipped,
  isContextMenuShow = true,
}: Props) => {
  if (!item) {
    return;
  }
  const dispatch = useDispatch();
  const [equipHero] = useEquipHeroItemMutation();
  const [unEquipHero] = useUnEquipHeroItemMutation();
  const [refetchHero] = useLazyGetMyHeroQuery();
  const onMouseEnter = () => {
    dispatch(setGameItem(item));
  };

  const onClick = () => {
    setHeroItem && setHeroItem(item);
  };
  const onEquip = async () => {
    try {
      const res = await equipHero({
        inventoryItemId: inventoryItemId!,
        slot: item.slot,
      }).unwrap();
      console.log(res);
      await refetchHero().unwrap();
      if (res.message) {
        dispatch(setSysMessages({ ...res, createdAt: new Date() }));
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const onUnEquipHero = async () => {
    console.log(item);
    try {
      await unEquipHero({
        inventoryItemId: inventoryItemId!,
        slot: item.slot,
      }).unwrap();
      await refetchHero().unwrap();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  return (
    <>
      <HoverCard openDelay={0} closeDelay={0}>
        <ContextMenu>
          <div className="relative">
            <ContextMenuTrigger>
              <HoverCardTrigger>
                <img
                  onClick={onClick}
                  onMouseEnter={onMouseEnter}
                  key={item.id}
                  className={cn(
                    ' hover:opacity-100 transition-opacity opacity-75 border  shadow cursor-pointer  ',
                    classname,
                    {
                      'border-primary': isSelected,
                    },
                    // {...getRarity(item)}
                  )}
                  src={item.imageUrl}
                  alt="weapon-image"
                />
              </HoverCardTrigger>
            </ContextMenuTrigger>
          </div>

          {isContextMenuShow && (
            <ContextMenuContent>
              {!isEquipped && (
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
