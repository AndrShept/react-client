import { FavoritePost } from '../types';
import { api } from './api';

export const favoritePostApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addFavoritePost: builder.mutation<FavoritePost, string>({
      query: (postId) => ({
        url: `/favorite-posts/${postId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useAddFavoritePostMutation } = favoritePostApi;
export const { addFavoritePost } = favoritePostApi.endpoints;
