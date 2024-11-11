import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { dungeonApi } from '../services/game/dungeonApi';
import '../types/game.types';
import { DungeonSession } from '../types/game.types';
import { stat } from 'fs';

interface initialState {
  dungeonSession: DungeonSession | null;
}

const initialState: initialState = {
  dungeonSession: null,
};

export const dungeonSessionSlice = createSlice({
  name: 'dungeonSession',
  initialState,
  reducers: {
    clearDungSession: (state) => {
      if (state.dungeonSession) {
        state.dungeonSession = null
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      dungeonApi.endpoints.getDungeonsSessionById.matchFulfilled,
      (state, action) => {
        state.dungeonSession = action.payload;
      },
    );
  },
});

export const {clearDungSession} = dungeonSessionSlice.actions;

export default dungeonSessionSlice.reducer;
