import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

import { heroApi } from '../services/game/heroApi';
import { Hero, InventoryItem, Modifier } from '../types/game.types';
import { subtractModifiers, sumModifiers } from '../utils';

interface ISysMessages {
  message: string;
  data?: InventoryItem | null;
  success: boolean;
  createdAt: number;
}
export type StatsUnion =
  | 'strength'
  | 'dexterity'
  | 'intelligence'
  | 'constitution'
  | 'luck';

interface initialState {
  hero: Hero | null;
  sysMessages: ISysMessages[];
}

const initialState: initialState = {
  hero: null,
  sysMessages: [],
};

export const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setHeroModifier: (state, action: PayloadAction<Partial<Modifier>>) => {
      if (state.hero) {
        state.hero.modifier = { ...state.hero.modifier, ...action.payload };
      }
    },
    setSysMessages: (state, action: PayloadAction<ISysMessages>) => {
      state.sysMessages = [...state.sysMessages, action.payload];
    },
    setRegenHealthMana: (
      state,
      action: PayloadAction<Record<string, number>>,
    ) => {
      if (state.hero) {
        state.hero = { ...state.hero, ...action.payload };
      }
    },
    equipItem: (state, action: PayloadAction<{ id: string; type: string }>) => {
      if (state.hero) {
        const equippedItems = state.hero.inventorys.filter(
          (item) => item.isEquipped,
        );

        // Функція для видалення зайвих полів з модифікатора
        const filterModifierFields = (modifier: Partial<Modifier>) => {
          const { id, buffs, inventoryItems, hero, ...validModifier } =
            modifier;
          return validModifier;
        };

        state.hero.inventorys = state.hero.inventorys.map((item) => {
          const equippedItem = equippedItems.find(
            (equipped) => equipped.gameItem.type === action.payload.type,
          );
          const oneHandCount = equippedItems.filter(
            (equipped) => equipped.gameItem.weaponType === 'ONE_HAND',
          ).length;
          const ringCount = equippedItems.filter(
            (equipped) => equipped.gameItem.type === 'RING',
          ).length;
          if (
            equippedItem &&
            item.id === equippedItem.id &&
            equippedItem.isEquipped &&
            state.hero &&
            equippedItem.gameItem.type !== 'RING' &&
            ringCount < 3 &&
            oneHandCount < 3 &&
            equippedItem.gameItem.weaponType !== 'ONE_HAND'
          ) {
            const validItemModifier = filterModifierFields(
              equippedItem.gameItem.modifier,
            );
            const validHeroModifier = filterModifierFields(state.hero.modifier);
            const subtractedModifier = subtractModifiers(
              validHeroModifier,
              validItemModifier,
            );

            state.hero.modifier = subtractedModifier;

            return { ...item, isEquipped: false };
          }

          // Якщо це новий предмет і слот вільний, одягаємо його
          if (item.id === action.payload.id && !item.isEquipped && state.hero) {
            if (ringCount === 2 && action.payload.type === 'RING') {
              state.sysMessages = [
                ...state.sysMessages,
                { success: false, createdAt: Date.now(), message: 'sdads' },
              ];
              return { ...item };
            }
            if (oneHandCount === 2 && item.gameItem.weaponType === 'ONE_HAND') {
              state.sysMessages = [
                ...state.sysMessages,
                { success: false, createdAt: Date.now(), message: 'sdads' },
              ];
              return { ...item };
            }
            if (item.gameItem.weaponType === 'TWO_HAND') {
              state.sysMessages = [
                ...state.sysMessages,
                {
                  success: false,
                  createdAt: Date.now(),
                  message: 'Realease weapon slots',
                },
              ];
              return { ...item };
            }
            const validItemModifier = filterModifierFields(
              item.gameItem.modifier,
            );
            const validHeroModifier = filterModifierFields(state.hero.modifier);
            const sumModifier = sumModifiers(
              validHeroModifier,
              validItemModifier,
            );
            state.hero.modifier = sumModifier;

            return { ...item, isEquipped: true };
          }
          return { ...item };
        });
      }
    },

    equipItemNew: (
      state,
      action: PayloadAction<{ id: string; type: string }>,
    ) => {
          console.log(state.hero?.equipments)
    },

    unEquipItem: (
      state,
      action: PayloadAction<{ id: string; type: string }>,
    ) => {
      if (state.hero) {
        state.hero.inventorys = state.hero?.inventorys.map((item) => {
          const { id, buffs, inventoryItems, hero, ...validModifier } =
            item.gameItem.modifier;
          if (item.id === action.payload.id && state.hero) {
            const { id, buffs, hero, inventoryItems, ...validHeroModifier } =
              state.hero.modifier;

            const sumModifier = subtractModifiers(
              validHeroModifier,
              validModifier,
            );
            state.hero.modifier = sumModifier;

            return { ...item, isEquipped: false };
          }
          return { ...item };
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      heroApi.endpoints.getMyHero.matchFulfilled,
      (state, action) => {
        state.hero = action.payload;
      },
    );
  },
});

export const {
  setHeroModifier,
  setSysMessages,
  setRegenHealthMana,
  equipItem,
  unEquipItem,
  equipItemNew,
} = heroSlice.actions;

export default heroSlice.reducer;
