import { Message } from '../types';
import { api } from './api';

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addMessage: builder.mutation<Message, Partial<Message>>({
      query: (messageData) => ({
        url: '/messages',
        method: 'POST',
        body: messageData,
      }),
    }),
    editMessage: builder.mutation<
      Message,
      { messageId: string; messageData: Partial<Message> }
    >({
      query: ({ messageId, messageData }) => ({
        url: `/messages/${messageId}`,
        method: 'PUT',
        body: messageData,
      }),
    }),

    deleteMessage: builder.mutation<Message, string>({
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
