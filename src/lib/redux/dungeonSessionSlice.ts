import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
  dungeonSessionsForStatus: DungeonSession[] | null;
  mapData: ISocketDungeonMapData | null;
  heroPos: null | { x: number; y: number };
  cameraPos: null | { x: number; y: number };
}

const initialState: initialState = {
  dungeonSession: null,
  dungeonSessionsForStatus: null,
  mapData: null,
  heroPos: null,
  cameraPos: null,
};

export const dungeonSessionSlice = createSlice({
  name: 'dungeonSession',
  initialState,
  reducers: {
    clearDungSession: (state) => {
        state.dungeonSessionsForStatus = null
      
    },

    setDungeonMap: (state, action: PayloadAction<ISocketDungeonMapData>) => {
      state.mapData = action.payload;
      state.heroPos = action.payload.heroPos;

      state.cameraPos = { x: 0, y: 0 };

      const tileSize = state.mapData.tileSize;
      const CAMERA_TILE_LEFT = 5;

      if (state.heroPos.x >= CAMERA_TILE_LEFT) {
        state.cameraPos = {
          ...state.cameraPos,
          x: (CAMERA_TILE_LEFT - state.heroPos.x) * tileSize,
        };
      }

      if (state.heroPos.y >= CAMERA_TILE_LEFT) {
        state.cameraPos = {
          ...state.cameraPos,
          y: (CAMERA_TILE_LEFT - state.heroPos.y) * tileSize,
        };
      }
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
        console.log(action.payload.dx, action.payload.dy);
      }
    },

  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        dungeonApi.endpoints.getDungeonsSessionById.matchFulfilled,
        (state, action) => {
          state.dungeonSession = action.payload;
        },
      )
      .addMatcher(
        dungeonApi.endpoints.getAllDungeonsSessionInStatus.matchFulfilled,
        (state, action) => {
          state.dungeonSessionsForStatus = action.payload;
        },
      );
  },
});

export const {
  clearDungSession,
  setDungeonMap,
  moveHero,
  setHeroPos,

} = dungeonSessionSlice.actions;

export default dungeonSessionSlice.reducer;
