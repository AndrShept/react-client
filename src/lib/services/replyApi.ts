import { Reply } from '../types';
import { api } from './api';

export const replyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReply: builder.mutation<Reply, { commentId: string; content: string }>({
      query: (replyData) => ({
        url: '/reply',
        method: 'POST',
        body: replyData,
      }),
    }),
    getReplys: builder.query<Reply[], string>({
      query: (commentId) => ({
        url: `/reply/${commentId}`,
        method: 'GET',
      }),
    }),
    deleteReply: builder.mutation<{ message: string, commentId:string }, string>({
      query: (commentId) => ({
        url: `/reply/${commentId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddReplyMutation,
  useGetReplysQuery,
  useLazyGetReplysQuery,
  useDeleteReplyMutation,
} = replyApi;

export const {} = replyApi.endpoints;
