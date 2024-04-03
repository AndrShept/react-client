import { api } from './api';

export const likePostApi = api.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<{ message: string }, { postId: string }>({
      query: (postId) => ({
        url: `/like-post/${postId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLikePostMutation } = likePostApi;
export const { likePost } = likePostApi.endpoints;
