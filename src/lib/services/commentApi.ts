import { Comment } from '../types';
import { api } from './api';

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation<Comment, Partial<Comment>>({
      query: (commentData) => ({
        url: '/comments',
        method: 'POST',
        body: commentData,
      }),
    }),
    deleteComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
    }),
    editComment: builder.mutation<
      Comment,
      { id: string; commentData: Partial<Comment> }
    >({
      query: ({ id, commentData }) => ({
        url: `/comment/${id}`,
        method: 'PUT',
        body: commentData,
      }),
    }),
  }),
});

export const {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} = commentApi;

export const { addComment, deleteComment, editComment } = commentApi.endpoints;
