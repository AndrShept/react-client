import { createSlice } from '@reduxjs/toolkit';

import { Message } from '../types';

interface initialState {
  messages: Message[];
}

// Define the initial state using that type
const initialState: initialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
  //         state.token = action.payload.token;
  //         state.isAuthenticated = true;
  //       })

  //   },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
