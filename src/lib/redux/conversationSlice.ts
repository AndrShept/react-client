import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { conversationApi } from '../services/conversationApi';
import { Conversation } from '../types';

interface initialState {
  conversation: Conversation | null;
  allConversations: Conversation[];
  sumNotReadMessageCount: number;
}

// Define the initial state using that type
const initialState: initialState = {
  conversation: null,
  allConversations: [],
  sumNotReadMessageCount: 0,
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    getConversation: (state, action) => {
      state.conversation = action.payload;
    },
    addConversationMessage: (state, action) => {
      if (!state.conversation) return;
      state.conversation.messages = [
        ...state.conversation.messages,
        action.payload,
      ];
    },
    editConversationMessage: (state, action) => {
      if (!state.conversation) return;
      state.conversation.messages = state.conversation?.messages.map(
        (message) =>
          message.id === action.payload.id ? action.payload : message,
      );
    },
    deleteConversationMessage: (state, action) => {
      if (!state.conversation) return;
      state.conversation.messages = state.conversation?.messages.filter(
        (message) => message.id !== action.payload,
      );
    },
    incrementNotReadCount: (
      state,
      action: PayloadAction<{ conversationId: string }>,
    ) => {
      state.allConversations = state.allConversations.map((conversation) =>
        conversation.id === action.payload.conversationId
          ? {
              ...conversation,
              newMessagesCount: conversation.newMessagesCount + 1,
            }
          : conversation,
      );
      state.sumNotReadMessageCount = state.allConversations.reduce(
        (acc, item) => acc + item.newMessagesCount,
        0,
      );
    },
    decrementNotReadCount: (
      state,
      action: PayloadAction<{ conversationId: string }>,
    ) => {
      state.allConversations = state.allConversations.map((conversation) =>
        conversation.id === action.payload.conversationId
          ? {
              ...conversation,
              newMessagesCount: conversation.newMessagesCount - 1,
            }
          : conversation,
      );
      state.sumNotReadMessageCount = state.allConversations.reduce(
        (acc, item) => acc + item.newMessagesCount,
        0,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      conversationApi.endpoints.getConversationById.matchFulfilled,
      (state, action) => {
        state.conversation = action.payload;
      },
    );
    builder.addMatcher(
      conversationApi.endpoints.getAllConversation.matchFulfilled,
      (state, action) => {
        state.allConversations = action.payload;
        state.sumNotReadMessageCount = action.payload.reduce(
          (acc, item) => acc + item.newMessagesCount,
          0,
        );
      },
    );
  },
});

export const {
  getConversation,
  addConversationMessage,
  editConversationMessage,
  deleteConversationMessage,
  decrementNotReadCount,
  incrementNotReadCount,
} = conversationSlice.actions;

export default conversationSlice.reducer;
