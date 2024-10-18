import { EquipmentSlot, ItemType, WeaponType } from '@/lib/types/game.types';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './store';

export const useFindSlot = () => {
  const equipments = useAppSelector((hero) => hero.hero.hero?.equipments);
  const dispatch = useAppDispatch();

  const findSlot = (itemType: ItemType, weaponType: WeaponType | undefined) => {
    const find = equipments?.find(
      (item) => item.inventoryItem.gameItem.type === itemType,
    );
    const slots = Object.values(ItemType);
    console.log(equipments?.length);
    if (
      itemType === ItemType.POTION ||
      itemType === ItemType.MISC ||
      itemType === ItemType.BOOK
    )
      return;

    if (itemType === ItemType.SHIELD) {
      return EquipmentSlot.LEFT_HAND;
    }
    if (itemType === ItemType.RING) {
      return EquipmentSlot.RING_LEFT;
    }
    if (weaponType === WeaponType.ONE_HAND) {
      return EquipmentSlot.RIGHT_HAND;
    }
    if (weaponType === WeaponType.TWO_HAND) {
      return EquipmentSlot.RIGHT_HAND;
    }

    return itemType;
  };

  return {
    findSlot,
  };
};
