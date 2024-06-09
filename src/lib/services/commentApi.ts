import { Comment, Reply } from '../types';
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
    getComments: builder.query<Comment[], string >({
      query: (postId) => ({
        url: `/comments/${postId}`,
        
      }),
    }),
    deleteComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
    }),
    editComment: builder.mutation<
      Comment & {commentId: string },
      { id: string; content: Partial<Comment> }
    >({
      query: ({ id, content }) => ({
        url: `/comments/${id}`,
        method: 'PUT',
        body: content,
      }),
    }),
  }),
});

export const {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useGetCommentsQuery,
  useLazyGetCommentsQuery,
} = commentApi;

export const { addComment, deleteComment, editComment, getComments } =
  commentApi.endpoints;
