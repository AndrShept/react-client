import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { InventoryItem } from '../types/game.types';

interface initialState {
  inventoryItem: null | InventoryItem;
}

// Define the initial state using that type
const initialState: initialState = {
  inventoryItem: null,
};

export const inventoryItemSlice = createSlice({
  name: 'inventoryItem',
  initialState,
  reducers: {
    setInventoryItem: (state, action: PayloadAction<InventoryItem>) => {
      state.inventoryItem = action.payload;
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

export const { setInventoryItem } = inventoryItemSlice.actions;

export default inventoryItemSlice.reducer;
