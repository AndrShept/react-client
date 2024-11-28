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
  heroPos: { x: number; y: number };
}

const initialState: initialState = {
  dungeonSession: null,
  mapData: null,
  heroPos: { x: 0, y: 0 },
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
    },
    moveHero: (
      state,
      action: PayloadAction<{ dx: number; dy: number; heroId: string }>,
    ) => {
      const heroTile = state.mapData?.dungeonMap
        .flat()
        .find((tile) => tile?.heroId === action.payload.heroId);
      const map = state.mapData?.dungeonMap;
      if (heroTile && map) {
        const newX = heroTile.x + action.payload.dx;
        const newY = heroTile.y + action.payload.dy;

        if (newX < 0 || newY < 0 || newX >= map[0].length || newY >= map.length)
          return;
        //КОЛІЗІЯ
        if (map[newY][newX] !== null) {
          return;
        }
        const prevTile = map[heroTile.y][heroTile.x];
        // Оновлюємо карту, якщо герой рухається
        const newMap = state.mapData?.dungeonMap.map((row, y) =>
          row.map((tile, x) => {
            if (x === heroTile.x && y === heroTile.y) {
              return null;
            } // Очищаємо старе місце героя
            if (x === newX && y === newY) {
              state.heroPos = { x: newX, y: newY };
              return { ...prevTile, x: newX, y: newY }; // Ставимо героя на нове місце
            }

            return tile;
          }),
        );
        if (state.mapData) {
          state.mapData.dungeonMap = newMap as Tile[][];
        }
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

export const { clearDungSession, setDungeonMap, moveHero } =
  dungeonSessionSlice.actions;

export default dungeonSessionSlice.reducer;
