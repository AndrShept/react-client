import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { heroApi } from '../services/game/heroApi';
import { Hero, InventoryItem, Modifier } from '../types/game.types';

interface ISysMessages {
  message: string;
  data: InventoryItem;
  success: boolean
  createdAt: Date
}

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

export const { setHeroModifier, setSysMessages } = heroSlice.actions;

export default heroSlice.reducer;
