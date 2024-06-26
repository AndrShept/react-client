import { listenerMiddleware } from '@/middleware/auth';
import { configureStore } from '@reduxjs/toolkit';

import { api } from '../services/api';
import messagesSlice from './conversationSlice';
import userSlice from './userSlice';
import conversationSlice from './conversationSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    conversation: conversationSlice,
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
