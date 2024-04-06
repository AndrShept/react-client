import { configureStore } from '@reduxjs/toolkit';

import { api } from '../services/api';
import counterSlice from './counterSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
