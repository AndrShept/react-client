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
  }),
});

export const { useAddMessageMutation } = messageApi;
export const { addMessage } = messageApi.endpoints;
