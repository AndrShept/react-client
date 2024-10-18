
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
import { useFindSlot } from '@/hooks/useFindSlot';
import { setGameItem } from '@/lib/redux/gameItemSlice';
import {
  equipItemNew,
  setSysMessages,
  unEquipItemNew,
} from '@/lib/redux/heroSlice';
import {
  useEquipHeroItemMutation,
  useUnEquipHeroItemMutation,
} from '@/lib/services/game/heroApi';

import {
  EquipmentSlot,
  GameItem,
  InventoryItem,
  ItemType,
  WeaponType,
} from '@/lib/types/game.types';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { ItemCardInfo } from './ItemCardInfo';
import { useEquipItem } from '@/hooks/useEquipItem';


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
  const {onEquip} = useEquipItem({
    hero,
    inventoryItem,
    inventoryItemId
  })
  const isSelf = inventoryItem?.heroId === hero?.id;


  const onMouseEnter = () => {
    dispatch(setGameItem(inventoryItem.gameItem));
  };

  const onClick = () => {
    setHeroItem && setHeroItem(inventoryItem.gameItem);
  };
  

  // const onEquip = async () => {
    // if (!hero) return;
    // const findItem = equipments.find(
    //   (equip) => equip.slot === inventoryItem.gameItem.type,
    // );
    // const findRightHand = equipments.find(
    //   (equip) => equip.slot === EquipmentSlot.RIGHT_HAND,
    // );
    // const findLeftHand = equipments.find(
    //   (equip) => equip.slot === EquipmentSlot.LEFT_HAND,
    // );
    // const findLeftRing = equipments.find(
    //   (equip) => equip.slot === EquipmentSlot.RING_LEFT,
    // );
    // const findRightRing = equipments.find(
    //   (equip) => equip.slot === EquipmentSlot.RING_RIGHT,
    // );
    // if (
    //   findItem &&
    //   inventoryItem.gameItem.weaponType !== WeaponType.ONE_HAND &&
    //   inventoryItem.gameItem.weaponType !== WeaponType.TWO_HAND &&
    //   inventoryItem.gameItem.type !== ItemType.SHIELD &&
    //   inventoryItem.gameItem.type !== ItemType.RING
    // ) {
    //   dispatch(unEquipItemNew({ inventoryItemId: findItem.inventoryItemId }));
    //   unEquipHero({ inventoryItemId: findItem.inventoryItemId });
    // }

    // if (
    //   (inventoryItem.gameItem.weaponType === WeaponType.TWO_HAND &&
    //     findRightHand &&
    //     findLeftHand) ||
    //   (inventoryItem.gameItem.weaponType === WeaponType.TWO_HAND &&
    //     findRightHand) ||
    //   (inventoryItem.gameItem.weaponType === WeaponType.TWO_HAND &&
    //     findLeftHand)
    // ) {
    //   dispatch(
    //     setSysMessages({
    //       success: false,
    //       message:
    //         'Your hands are occupied. Unequip your current gear to equip the new weapon',
    //       createdAt: Date.now(),
    //     }),
    //   );
    //   return;
    // }
    // if (
    //   inventoryItem.gameItem.weaponType === WeaponType.TWO_HAND &&
    //   !findRightHand &&
    //   !findLeftHand
    // ) {
    //   dispatch(
    //     equipItemNew({
    //       heroId: hero?.id,
    //       inventoryItem,
    //       inventoryItemId,
    //       isEquipped: true,
    //       slot: EquipmentSlot.RIGHT_HAND,
    //     }),
    //   );
    //   equipHero({ inventoryItemId, slot: EquipmentSlot.RIGHT_HAND }).unwrap();
    //   return;
    // }

    // if (
    //   (inventoryItem.gameItem.weaponType === WeaponType.ONE_HAND &&
    //     findRightHand &&
    //     findLeftHand) ||
    //   (inventoryItem.gameItem.weaponType === WeaponType.ONE_HAND &&
    //     findRightHand?.inventoryItem.gameItem.weaponType ===
    //       WeaponType.TWO_HAND) ||
    //   (inventoryItem.gameItem.type === ItemType.SHIELD &&
    //     findRightHand?.inventoryItem.gameItem.weaponType ===
    //       WeaponType.TWO_HAND)
    // ) {
    //   dispatch(
    //     setSysMessages({
    //       success: false,
    //       message:
    //         'Your hands are occupied. Unequip your current gear to equip the new weapon',
    //       createdAt: Date.now(),
    //     }),
    //   );
    //   return;
    // }
    // if (
    //   (inventoryItem.gameItem.type === ItemType.SHIELD &&
    //     findLeftHand?.inventoryItem.gameItem.type === ItemType.SHIELD) ||
    //   (inventoryItem.gameItem.type === ItemType.SHIELD &&
    //     findLeftHand?.inventoryItem.gameItem.weaponType === WeaponType.ONE_HAND)
    // ) {
    //   dispatch(
    //     unEquipItemNew({ inventoryItemId: findLeftHand.inventoryItemId }),
    //   );
    //   unEquipHero({ inventoryItemId: findLeftHand.inventoryItemId });

    //   dispatch(
    //     equipItemNew({
    //       heroId: hero?.id,
    //       inventoryItem,
    //       inventoryItemId,
    //       isEquipped: true,
    //       slot: EquipmentSlot.LEFT_HAND,
    //     }),
    //   );
    //   equipHero({
    //     inventoryItemId,
    //     slot: EquipmentSlot.LEFT_HAND,
    //   }).unwrap();
    //   dispatch(
    //     setSysMessages({
    //       success: true,
    //       message:
    //         'You have successfully equipped',
    //       createdAt: Date.now(),
    //       data: inventoryItem
    //     }),
    //   );
    //   return;
    // }
    // if (inventoryItem.gameItem.type === ItemType.SHIELD) {
    //   dispatch(
    //     equipItemNew({
    //       heroId: hero?.id,
    //       inventoryItem,
    //       inventoryItemId,
    //       isEquipped: true,
    //       slot: EquipmentSlot.LEFT_HAND,
    //     }),
    //   );
    //   equipHero({
    //     inventoryItemId,
    //     slot: EquipmentSlot.LEFT_HAND,
    //   }).unwrap();
    //   dispatch(
    //     setSysMessages({
    //       success: true,
    //       message:
    //         'You have successfully equipped',
    //       createdAt: Date.now(),
    //       data: inventoryItem
    //     }),
    //   );
    //   return;
    // }

    // if (inventoryItem.gameItem.type === ItemType.RING) {
    //   if (findRightRing && findLeftRing) {
    //     dispatch(
    //       setSysMessages({
    //         success: false,
    //         message:
    //           'Your ring slots occupied. Unequip your one ring to equip the new ',
    //         createdAt: Date.now(),
    //       }),
    //     );
    //     return;
    //   }
    //   if (findRightRing) {

    //     dispatch(
    //       equipItemNew({
    //         heroId: hero?.id,
    //         inventoryItem,
    //         inventoryItemId,
    //         isEquipped: true,
    //         slot: EquipmentSlot.RING_LEFT,
    //       }),
    //     );
    //     equipHero({
    //       inventoryItemId,
    //       slot: EquipmentSlot.RING_LEFT,
    //     }).unwrap();
    //     dispatch(
    //       setSysMessages({
    //         success: true,
    //         message:
    //           'You have successfully equipped',
    //         createdAt: Date.now(),
    //         data: inventoryItem
    //       }),
    //     );
    //     return;
    //   }
    //   dispatch(
    //     equipItemNew({
    //       heroId: hero?.id,
    //       inventoryItem,
    //       inventoryItemId,
    //       isEquipped: true,
    //       slot: EquipmentSlot.RING_RIGHT,
    //     }),
    //   );
    //   equipHero({
    //     inventoryItemId,
    //     slot: EquipmentSlot.RING_RIGHT,
    //   }).unwrap();
    //   dispatch(
    //     setSysMessages({
    //       success: true,
    //       message:
    //         'You have successfully equipped',
    //       createdAt: Date.now(),
    //       data: inventoryItem
    //     }),
    //   );
    //   return;
    // }

    // if (inventoryItem.gameItem.weaponType === WeaponType.ONE_HAND) {
    //   dispatch(
    //     equipItemNew({
    //       heroId: hero?.id,
    //       inventoryItem,
    //       inventoryItemId,
    //       isEquipped: true,
    //       slot: findRightHand
    //         ? EquipmentSlot.LEFT_HAND
    //         : EquipmentSlot.RIGHT_HAND,
    //     }),
    //   );
    //   equipHero({
    //     inventoryItemId,
    //     slot: findRightHand
    //       ? EquipmentSlot.LEFT_HAND
    //       : EquipmentSlot.RIGHT_HAND,
    //   }).unwrap();
    //   dispatch(
    //     setSysMessages({
    //       success: true,
    //       message:
    //         'You have successfully equipped',
    //       createdAt: Date.now(),
    //       data: inventoryItem
    //     }),
    //   );
    //   return;
    // }

    // dispatch(
    //   equipItemNew({
    //     heroId: hero?.id,
    //     inventoryItem,
    //     inventoryItemId,
    //     isEquipped: true,
    //     slot: inventoryItem.gameItem.type,
    //   }),
    // );
    // equipHero({ inventoryItemId, slot: inventoryItem.gameItem.type }).unwrap();
    // dispatch(
    //   setSysMessages({
    //     success: true,
    //     message:
    //       'You have successfully equipped',
    //     createdAt: Date.now(),
    //     data: inventoryItem
    //   }),
    // );
  // };

  const onDrink = () => {
    console.log('DRINKKKKKKKKKKKKKKKKK');
  };

  const onDoubleClick = async () => {
    if (!isDoubleCLick) return;
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
