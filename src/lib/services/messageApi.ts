import { Message } from '../types';
import { api } from './api';

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addMessage: builder.mutation<
      Message,
      { conversationId: string; content: string; authorId: string }
    >({
      query: (messageData) => ({
        url: '/messages',
        method: 'POST',
        body: messageData,
      }),
    }),
    editMessage: builder.mutation<Message, Partial<Message>>({
      query: (messageData) => ({
        url: '/messages',
        method: 'PUT',
        body: messageData,
      }),
    }),
    deleteMessage: builder.mutation<{ message: string }, string>({
      query: (messageId) => ({
        url: `/messages/${messageId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddMessageMutation,
  useDeleteMessageMutation,
  useEditMessageMutation,
} = messageApi;
export const { addMessage, deleteMessage, editMessage } = messageApi.endpoints;
