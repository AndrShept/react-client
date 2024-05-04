import { createSlice } from '@reduxjs/toolkit';

import { conversationApi } from '../services/conversationApi';
import { Conversation } from '../types';

interface initialState {
  conversation: Conversation | null;
}

// Define the initial state using that type
const initialState: initialState = {
  conversation: null,
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    getConversation: (state, action) => {
      state.conversation = action.payload;
    },
    addConversationState: (state, action) => {
      if (!state.conversation) return;
      state.conversation.messages = [
        ...state.conversation.messages,
        action.payload,
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      conversationApi.endpoints.getConversationById.matchFulfilled,
      (state, action) => {
        state.conversation = action.payload;
      },
    );
  },
});

export const { getConversation, addConversationState } =
  conversationSlice.actions;

export default conversationSlice.reducer;
