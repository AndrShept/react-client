import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { heroApi } from '../services/game/heroApi';
import { Hero, Modifier } from '../types/game.types';

interface initialState {
  hero: Hero | null;
}

const initialState: initialState = {
  hero: null,
};

export const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setHeroModifier: (state, action: PayloadAction<Partial<Modifier>>) => {
      if (state.hero) {
        state.hero.modifier = {...state.hero.modifier, ...action.payload};
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

export const { setHeroModifier } = heroSlice.actions;

export default heroSlice.reducer;
