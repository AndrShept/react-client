import { listenerMiddleware } from '@/middleware/auth';
import { configureStore } from '@reduxjs/toolkit';

import { api } from '../services/api';
import conversationSlice from './conversationSlice';
import photoSlice from './photoSlice';
import searchSlice from './searchSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    conversation: conversationSlice,
    search: searchSlice,
    photo: photoSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
