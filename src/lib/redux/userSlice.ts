import { createSlice } from '@reduxjs/toolkit';

import { userApi } from '../services/userApi';
import { User } from '../types';

interface initialState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[] | null;
  current: User | null;
  token?: string;
}

// Define the initial state using that type
const initialState: initialState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.current = null;
      state.token = '';
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.current = action.payload;
      })
      .addMatcher(
        userApi.endpoints.updateUser.matchFulfilled,
        (state, action) => {
          state.isAuthenticated = true;
          state.current = action.payload;
        },
      )
      .addMatcher(
        userApi.endpoints.getUserById.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        },
      )
      .addMatcher(
        userApi.endpoints.getUserByUsername.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        },
      )
      .addMatcher(
        userApi.endpoints.getAllUsers.matchFulfilled,
        (state, action) => {
          state.users = action.payload;
        },
      );
  },
});

export const { logout, resetUser } = userSlice.actions;

export default userSlice.reducer;
