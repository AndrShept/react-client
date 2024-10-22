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
  Hero,
  InventoryItem,
  ItemType,
  WeaponType,
} from '@/lib/types/game.types';

import { useAppDispatch, useAppSelector } from './store';

interface useEquipItemProps {
  inventoryItem: InventoryItem;
  inventoryItemId: string;
  hero: Hero | null;
}

export const useEquipItem = ({
  inventoryItem,
  inventoryItemId,
  hero,
}: useEquipItemProps) => {
  const dispatch = useAppDispatch();
  const equipments = useAppSelector(
    (state) => state.hero.hero?.equipments ?? [],
  );
  const [equipHero] = useEquipHeroItemMutation();
  const [unEquipHero] = useUnEquipHeroItemMutation();
  const equipItem =async (inventoryItem: InventoryItem, slot: EquipmentSlot) => {
    if (!hero) return;
    dispatch(
      equipItemNew({
        heroId: hero.id,
        inventoryItem,
        inventoryItemId,
        isEquipped: true,
        slot,
      }),
    );
    try {
      equipHero({ inventoryItemId, slot }).unwrap();
      dispatch(
        setSysMessages({
          success: true,
          message: 'You have successfully equipped the item.',
          createdAt: Date.now(),
          data: inventoryItem,
        }),
      );
    } catch (error) {
      dispatch(
        setSysMessages({
          success: false,
          message: 'Failed to equip the item. Please try again.',
          createdAt: Date.now(),
        }),
      );
    }
   
  };

  const unEquipItem = (inventoryItemId: string) => {
    try {
      dispatch(unEquipItemNew({ inventoryItemId }));
      unEquipHero({ inventoryItemId });
    } catch (error) {
      dispatch(
        setSysMessages({
          success: false,
          message: 'Failed to unEquip the item. Please try again.',
          createdAt: Date.now(),
        }),
      );
    }
    
   
  };

  const onEquip = async () => {
    if (!hero) return;

    const findItem = equipments.find(
      // @ts-ignore
      (equip) => equip.slot === inventoryItem.gameItem.type,
    );

    const findRightHand = equipments.find(
      (equip) => equip.slot === EquipmentSlot.RIGHT_HAND,
    );
    const findLeftHand = equipments.find(
      (equip) => equip.slot === EquipmentSlot.LEFT_HAND,
    );
    const findLeftRing = equipments.find(
      (equip) => equip.slot === EquipmentSlot.RING_LEFT,
    );
    const findRightRing = equipments.find(
      (equip) => equip.slot === EquipmentSlot.RING_RIGHT,
    );

    if (
      findItem &&
      inventoryItem.gameItem.weaponType !== WeaponType.ONE_HAND &&
      inventoryItem.gameItem.weaponType !== WeaponType.TWO_HAND &&
      inventoryItem.gameItem.type !== ItemType.SHIELD &&
      inventoryItem.gameItem.type !== ItemType.RING
    ) {
      unEquipItem(findItem.inventoryItemId);
    }

    if (
      inventoryItem.gameItem.weaponType === WeaponType.TWO_HAND &&
      (findRightHand || findLeftHand)
    ) {
      dispatch(
        setSysMessages({
          success: false,
          message:
            'Your hands are occupied. Unequip your current gear to equip the new weapon.',
          createdAt: Date.now(),
        }),
      );
      return;
    }

    if (inventoryItem.gameItem.weaponType === WeaponType.TWO_HAND) {
      equipItem(inventoryItem, EquipmentSlot.RIGHT_HAND);
      return;
    }

    if (
      (inventoryItem.gameItem.weaponType === WeaponType.ONE_HAND &&
        findRightHand &&
        findLeftHand) ||
      (inventoryItem.gameItem.weaponType === WeaponType.ONE_HAND &&
        findRightHand?.inventoryItem.gameItem.weaponType ===
          WeaponType.TWO_HAND) ||
      (inventoryItem.gameItem.type === ItemType.SHIELD &&
        findRightHand?.inventoryItem.gameItem.weaponType ===
          WeaponType.TWO_HAND)
    ) {
      dispatch(
        setSysMessages({
          success: false,
          message:
            'Your hands are occupied. Unequip your current gear to equip the new weapon.',
          createdAt: Date.now(),
        }),
      );
      return;
    }

    if (inventoryItem.gameItem.type === ItemType.SHIELD && findLeftHand) {
      unEquipItem(findLeftHand.inventoryItemId);
      equipItem(inventoryItem, EquipmentSlot.LEFT_HAND);
      return;
    }

    if (inventoryItem.gameItem.type === ItemType.SHIELD) {
      equipItem(inventoryItem, EquipmentSlot.LEFT_HAND);
      return;
    }

    if (inventoryItem.gameItem.type === ItemType.RING) {
      if (findRightRing && findLeftRing) {
        dispatch(
          setSysMessages({
            success: false,
            message:
              'Your ring slots are occupied. Unequip one ring to equip the new one.',
            createdAt: Date.now(),
          }),
        );
        return;
      }
      if (findRightRing) {
        equipItem(inventoryItem, EquipmentSlot.RING_LEFT);
      } else {
        equipItem(inventoryItem, EquipmentSlot.RING_RIGHT);
      }
      return;
    }

    if (inventoryItem.gameItem.weaponType === WeaponType.ONE_HAND) {
      equipItem(
        inventoryItem,
        findRightHand ? EquipmentSlot.LEFT_HAND : EquipmentSlot.RIGHT_HAND,
      );
      return;
    }
    // @ts-ignore
    equipItem(inventoryItem, inventoryItem.gameItem.type);
  };

  return {
    onEquip,
  };
};
