import { Message } from '../types';
import { api } from './api';

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addMessage: builder.mutation<Message, FormData>({
      query: (formData) => ({
        url: '/messages',
        method: 'POST',
        body: formData,
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
    isReadOnceMessage: builder.mutation<Message, string>({
      query: (messageId) => ({
        url: `/messages-isRead/${messageId}`,
        method: 'PUT',
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
  useIsReadOnceMessageMutation,
} = messageApi;
export const { addMessage, deleteMessage, editMessage } = messageApi.endpoints;
