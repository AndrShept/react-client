import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { dungeonPartyApi } from '../services/game/dungeonPartyApi';
import '../types/game.types';
import { DungeonParty } from '../types/game.types';

interface initialState {
  party: DungeonParty[] | null;
}

const initialState: initialState = {
  party: null,
};

export const dungeonPartySlice = createSlice({
  name: 'dungeonParty',
  initialState,
  reducers: {
    setDungeonParty: (state, action: PayloadAction<DungeonParty[]>) => {
      state.party = action.payload;
    },
    addPartyMember: (state, action: PayloadAction<DungeonParty>) => {
      if (state.party) {
        state.party = [...state.party, action.payload];
      }
    },
    removePartyMember: (state, action: PayloadAction<{ memberId: string }>) => {
      if (state.party) {
        state.party = state.party.filter(
          (party) => party.memberId !== action.payload.memberId,
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      dungeonPartyApi.endpoints.getDungeonParty.matchFulfilled,
      (state, action) => {
        state.party = action.payload;
      },
    );
  },
});

export const { setDungeonParty, addPartyMember, removePartyMember } =
  dungeonPartySlice.actions;

export default dungeonPartySlice.reducer;
