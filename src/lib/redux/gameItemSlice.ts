import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { itemApi } from '../services/game/ItemApi';
import { GameItem } from '../types/game.types';

interface initialState {
  gameItem: null | GameItem;
  shopItems: null | GameItem[];
}

// Define the initial state using that type
const initialState: initialState = {
  gameItem: null,
  shopItems: null,
};

export const gameItemSlice = createSlice({
  name: 'gameItem',
  initialState,
  reducers: {
    setGameItem: (state, action: PayloadAction<GameItem>) => {
      state.gameItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      itemApi.endpoints.getAllItems.matchFulfilled,
      (state, action) => {
        state.shopItems = action.payload;
      },
    );
  },
});

export const { setGameItem } = gameItemSlice.actions;

export default gameItemSlice.reducer;
