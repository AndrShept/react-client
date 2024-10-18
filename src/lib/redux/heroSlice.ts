import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { heroApi } from '../services/game/heroApi';
import { Equipment, Hero, InventoryItem, Modifier } from '../types/game.types';
import {
  addModifiers,
  filterModifierFields,
  subtractModifiers,
  sumModifiers,
} from '../utils';

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

    equipItemNew: (state, action: PayloadAction<Equipment>) => {
      if (state.hero) {
        state.hero.equipments = [...state.hero?.equipments, action.payload];
        state.hero.inventorys = state.hero.inventorys.map((item) => {
          if (item.id === action.payload.inventoryItemId) {
            return { ...item, isEquipped: true };
          }

          return { ...item };
        });

        const validHeroModifier = filterModifierFields(state.hero.modifier);
        const validEquipModifier = filterModifierFields(
          action.payload.inventoryItem.gameItem.modifier,
        );
        state.hero.modifier = addModifiers(
          validHeroModifier,
          validEquipModifier,
        );
      }
    },

    unEquipItemNew: (
      state,
      action: PayloadAction<{ inventoryItemId: string }>,
    ) => {
      if (state.hero) {
        const findEquipItem = state.hero.equipments.find(
          (equip) => equip.inventoryItemId === action.payload.inventoryItemId,
        );
        console.log(findEquipItem?.inventoryItemId);
        state.hero.equipments = state.hero.equipments.filter(
          (equip) => equip.inventoryItemId !== findEquipItem?.inventoryItemId,
        );
        state.hero.inventorys = state.hero.inventorys.map((inventoryItem) => {
          if (inventoryItem.id === findEquipItem?.inventoryItemId) {
            return { ...inventoryItem, isEquipped: false };
          }

          return { ...inventoryItem };
        });

        const validHeroModifier = filterModifierFields(state.hero.modifier);
        const validEquipModifier = filterModifierFields(
          findEquipItem?.inventoryItem.gameItem.modifier!,
        );
        state.hero.modifier = subtractModifiers(
          validHeroModifier,
          validEquipModifier,
        );
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
  equipItemNew,
  unEquipItemNew,
} = heroSlice.actions;

export default heroSlice.reducer;
