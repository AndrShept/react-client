import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { heroApi } from '../services/game/heroApi';
import { Hero, InventoryItem, Modifier } from '../types/game.types';

interface ISysMessages {
  message: string;
  data: InventoryItem | null;
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
    incrementStat: (state, action: PayloadAction<StatsUnion>) => {
      if (
        state.hero?.modifier &&
        state.hero?.modifier[action.payload] !== undefined &&
        !!state.hero.freeStatsPoints
      ) {
        state.hero.modifier = {
          ...state.hero.modifier,
          [action.payload]: state.hero.modifier[action.payload]! + 1,
        };
        state.hero = {
          ...state.hero,
          freeStatsPoints: state.hero.freeStatsPoints - 1,
        };
      }
    },
    decrementStat: (
      state,
      action: PayloadAction<
      StatsUnion
      >,
    ) => {
      if (!state.hero) return;
      const currentStatValue = state.hero.modifier[action.payload]!;
      const minStatValue = action.payload === 'luck' ? 5 : 10;

      if (currentStatValue > minStatValue) {
        state.hero.modifier = {
          ...state.hero.modifier,
          [action.payload]: state.hero.modifier[action.payload]! - 1,
        };
        state.hero = {
          ...state.hero,
          freeStatsPoints: state.hero.freeStatsPoints + 1,
        };
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

export const { setHeroModifier, setSysMessages, decrementStat, incrementStat } =
  heroSlice.actions;

export default heroSlice.reducer;
