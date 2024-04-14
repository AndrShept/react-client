import { api } from './api';

export const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<{ message: string }, string>({
      query: (postId) => ({
        url: `/like-post/${postId}`,
        method: 'POST',
      }),
    }),
    likeComment: builder.mutation<{ message: string }, string>({
      query: (commentId) => ({
        url: `/like-comment/${commentId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLikePostMutation, useLikeCommentMutation } = likeApi;
export const { likePost, likeComment } = likeApi.endpoints;
