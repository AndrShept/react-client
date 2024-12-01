import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { nanoid } from 'nanoid';

import { dungeonApi } from '../services/game/dungeonApi';
import '../types/game.types';
import {
  DungeonSession,
  ISocketDungeonMapData,
  Tile,
} from '../types/game.types';

interface initialState {
  dungeonSession: DungeonSession | null;
  mapData: ISocketDungeonMapData | null;
  heroPos: null | { x: number; y: number };
}

const initialState: initialState = {
  dungeonSession: null,
  mapData: null,
  heroPos: null,
};

export const dungeonSessionSlice = createSlice({
  name: 'dungeonSession',
  initialState,
  reducers: {
    clearDungSession: (state) => {
      if (state.dungeonSession) {
        state.dungeonSession = null;
      }
    },

    setDungeonMap: (state, action: PayloadAction<ISocketDungeonMapData>) => {
      state.mapData = action.payload;
      state.heroPos = action.payload.heroPos;
    },
    setHeroPos: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.heroPos = action.payload;
    },
    moveHero: (
      state,
      action: PayloadAction<{ dx: number; dy: number; heroId: string }>,
    ) => {
      if (state.heroPos) {
        const newPosX = state.heroPos.x + action.payload.dx;
        const newPosY = state.heroPos.y + action.payload.dy;
        state.heroPos = {
          ...state.heroPos,
          x: newPosX,
          y: newPosY,
        };
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

export const { clearDungSession, setDungeonMap, moveHero, setHeroPos } =
  dungeonSessionSlice.actions;

export default dungeonSessionSlice.reducer;
