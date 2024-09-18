import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GameItem } from '../types/game.types';

interface initialState {
  gameItem: null | GameItem;
}

// Define the initial state using that type
const initialState: initialState = {
  gameItem: null,
};

export const gameItemSlice = createSlice({
  name: 'gameItem',
  initialState,
  reducers: {
    setGameItem: (state, action: PayloadAction<GameItem>) => {
      state.gameItem = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
  //       state.token = action.payload.token;
  //       state.isAuthenticated = true;
  //     })

  // },
});

export const { setGameItem } = gameItemSlice.actions;

export default gameItemSlice.reducer;
