import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { heroApi } from '../services/game/heroApi';
import { Hero } from '../types/game.types';

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
    // setGameItem: (state, action: PayloadAction<GameItem>) => {
    // },
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

export const {} = heroSlice.actions;

export default heroSlice.reducer;
