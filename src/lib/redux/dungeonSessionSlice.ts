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
      state.dungeonSessionsForStatus = null;
    },

    updateTile: (state, action: PayloadAction<Tile[]>) => {
      if (!state.mapData) return;
      state.mapData.dungeonMap = state.mapData.dungeonMap.map((dungTile) => {
        const updatedTile = action.payload.find(
          (tile) => tile.id === dungTile.id,
        );
        return updatedTile ? updatedTile : dungTile;
      });
    },

    setDungeonMap: (state, action: PayloadAction<ISocketDungeonMapData>) => {
      state.mapData = action.payload;
      state.heroPos = action.payload.heroPos;

      state.cameraPos = { x: 0, y: 0 };

      
    },
    updateCameraPos: (state) => {
      if (!state.mapData || !state.heroPos) return;
      const tileSize = state.mapData.tileSize;
      const CAMERA_TILE_LEFT_X = 9;
      const CAMERA_TILE_LEFT_Y = 5;

      if (state.heroPos.x >= CAMERA_TILE_LEFT_X && state.cameraPos) {
        state.cameraPos.x = (CAMERA_TILE_LEFT_X - state.heroPos.x) * tileSize;
      }

      if (state.heroPos.y >= CAMERA_TILE_LEFT_Y && state.cameraPos) {
        state.cameraPos.y = (CAMERA_TILE_LEFT_Y - state.heroPos.y) * tileSize;
      }
    },
    setHeroPos: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.heroPos = action.payload;
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
          state.dungeonSession = action.payload[0];
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
  setHeroPos,
  updateTile,
  updateCameraPos,
} = dungeonSessionSlice.actions;

export default dungeonSessionSlice.reducer;
