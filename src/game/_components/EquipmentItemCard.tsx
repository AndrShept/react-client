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
import { unEquipItemNew } from '@/lib/redux/heroSlice';
import {
  useEquipHeroItemMutation,
  useLazyGetMyHeroQuery,
  useUnEquipHeroItemMutation,
} from '@/lib/services/game/heroApi';
import { ErrorMessage } from '@/lib/types';
import { Equipment } from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { ItemCardInfo } from './ItemCardInfo';

interface Props {
  equipment: Equipment;
  classname?: string;
  isContextMenuShow: boolean;
  isDoubleCLick: boolean;
}

export const EquipmentItemCard = ({
  classname,
  isContextMenuShow,
  isDoubleCLick,
  equipment,
}: Props) => {
  console.log(equipment);
  const dispatch = useDispatch();
  const heroId = useAppSelector((state) => state.hero.hero?.id);
  const [equipHero] = useEquipHeroItemMutation();
  const [unEquipHero] = useUnEquipHeroItemMutation();
  const [refetchHero] = useLazyGetMyHeroQuery();

  const isSelf = equipment.inventoryItem.heroId === heroId;
  const onMouseEnter = () => {
    dispatch(setGameItem(equipment.inventoryItem.gameItem));
  };

  const onUnEquipHero = async () => {
    dispatch(unEquipItemNew({ inventoryItemId: equipment.inventoryItemId! }));
    try {
       unEquipHero({ inventoryItemId: equipment.inventoryItemId }).unwrap()
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const onDoubleClick = async () => {
    setTimeout(() => {
      onUnEquipHero();
    }, 300);
  };
  const onClick = () => {};
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
                  key={equipment.inventoryItem.id}
                  className={cn(
                    ' hover:opacity-100 transition-opacity opacity-75 border  shadow cursor-pointer size-full  ',
                    classname,
                  )}
                  src={equipment.inventoryItem.gameItem.imageUrl}
                  alt="weapon-image"
                />
              </HoverCardTrigger>
            </ContextMenuTrigger>
          </div>

          {isContextMenuShow && isSelf && (
            <ContextMenuContent>
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
            </ContextMenuContent>
          )}
        </ContextMenu>

        <HoverCardContent className="p-0 border-none">
          <ItemCardInfo item={equipment.inventoryItem.gameItem} />
        </HoverCardContent>
      </HoverCard>
    </>
  );
};
