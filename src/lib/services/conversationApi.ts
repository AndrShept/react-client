import { Conversation } from '../types';
import { api } from './api';

export const conversationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addConversation: builder.mutation<Conversation, { receiverId: string }>({
      query: (receiverIdObj) => ({
        url: '/conversations',
        method: 'POST',
        body: receiverIdObj,
      }),
    }),
    getAllConversation: builder.query<Conversation[], void>({
      query: () => ({
        url: '/conversations',
      }),
    }),
    getConversationById: builder.query<Conversation, string>({
      query: (conversationId) => ({
        url: `/conversations/${conversationId}`,
      }),
    }),
    isReadMessages: builder.mutation<Conversation, string>({
      query: (conversationId) => ({
        url: `/conversations/${conversationId}`,
        method: 'PUT',
      }),
    }),
    deleteConversation: builder.mutation<string, void>({
      query: () => ({
        url: '/conversations',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddConversationMutation,
  useGetAllConversationQuery,
  useLazyGetAllConversationQuery,
  useDeleteConversationMutation,
  useGetConversationByIdQuery,
  useLazyGetConversationByIdQuery,
  useIsReadMessagesMutation,
} = conversationApi;
export const {
  addConversation,
  getAllConversation,
  deleteConversation,
  isReadMessages,
  getConversationById,
} = conversationApi.endpoints;
