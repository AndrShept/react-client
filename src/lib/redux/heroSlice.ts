import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { heroApi } from '../services/game/heroApi';
import {
  Buff,
  Equipment,
  Hero,
  InventoryItem,
  Modifier,
} from '../types/game.types';
import {
  addModifiers,
  calculateHpAndMana,
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
        state.hero.health = Math.min(
          state.hero.health,
          state.hero.modifier.maxHealth!,
        );
        state.hero.mana = Math.min(
          state.hero.mana,
          state.hero.modifier.maxMana!,
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

        state.hero.health = Math.min(
          state.hero.health,
          state.hero.modifier.maxHealth!,
        );
        state.hero.mana = Math.min(
          state.hero.mana,
          state.hero.modifier.maxMana!,
        );
      }
    },
    drinkPotion: (state, action: PayloadAction<InventoryItem>) => {
      if (state.hero) {
        const { maxHealth, maxMana, duration } =
          action.payload.gameItem.modifier;
        const isHealthFull =
          state.hero.health === state.hero.modifier.maxHealth;
        const isManaFull = state.hero.mana === state.hero.modifier.maxMana;
        console.log();
        if (
          (isHealthFull && !maxMana && !duration) ||
          (isManaFull && !maxHealth && !duration)
        ) {
          state.sysMessages = [
            ...state.sysMessages,
            {
              success: false,
              message: `Your ${maxMana ? 'mana' : 'health'} is already full. Nothing to restore.`,
              createdAt: Date.now(),
            },
          ];
          return;
        }
        if (!action.payload.gameItem.modifier.duration) {
          state.hero.health = Math.min(
            state.hero.health + (maxHealth ?? 0),
            state.hero.modifier.maxHealth!,
          );
          state.hero.mana = Math.min(
            state.hero.mana + (maxMana ?? 0),
            state.hero.modifier.maxMana!,
          );
        }
        const findExistBuff = state.hero.buffs.find(
          (buff) => buff.gameItemId === action.payload.gameItemId,
        );
        console.log(findExistBuff);

        if (action.payload.gameItem.modifier.duration && !findExistBuff) {
          state.hero.buffs = [
            ...state.hero.buffs,
            {
              id: nanoid(),
              name: action.payload.gameItem.name,
              duration: action.payload.gameItem.modifier.duration,
              imageUrl: action.payload.gameItem.imageUrl,
              modifier: action.payload.gameItem.modifier,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              gameItemId: action.payload.gameItemId,
              timeRemaining: action.payload.gameItem.modifier.duration
            },
          ];
          const validHeroModifier = filterModifierFields(state.hero.modifier);
          const validItemModifier = filterModifierFields(
            action.payload.gameItem.modifier,
          );
          state.hero.modifier = addModifiers(
            validHeroModifier,
            validItemModifier,
          );
        }

        if (findExistBuff) {
          state.hero.buffs = state.hero.buffs.filter(
            (buff) => buff.gameItemId !== action.payload.gameItemId,
          );
          state.hero.buffs = [
            ...state.hero.buffs,
            {
              id: nanoid(),
              name: action.payload.gameItem.name,
              duration: action.payload.gameItem.modifier.duration!,
              imageUrl: action.payload.gameItem.imageUrl,
              modifier: action.payload.gameItem.modifier,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              gameItemId: action.payload.gameItemId,
              timeRemaining: action.payload.gameItem.modifier.duration!
            },
          ];
        }

        if (action.payload.quantity > 1) {
          state.hero.inventorys = state.hero.inventorys.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );
        } else {
          state.hero.inventorys = state.hero.inventorys.filter(
            (item) => item.id !== action.payload.id,
          );
        }

        state.sysMessages = [
          ...state.sysMessages,
          {
            success: true,
            message: `You successfully drank `,
            createdAt: Date.now(),
            data: action.payload,
          },
        ];
      }
    },
    removeBuff: (state, action: PayloadAction<{ buff: Buff }>) => {
      if (state.hero) {
        const validHeroModifier = filterModifierFields(state.hero.modifier);
        const validBuffModifier = filterModifierFields(
          action.payload.buff.modifier,
        );

        state.hero.buffs = state.hero.buffs.filter(
          (buff) => buff.id !== action.payload.buff.id,
        );
        state.hero.modifier = subtractModifiers(
          validHeroModifier,
          validBuffModifier,
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
  drinkPotion,
  removeBuff,
} = heroSlice.actions;

export default heroSlice.reducer;
