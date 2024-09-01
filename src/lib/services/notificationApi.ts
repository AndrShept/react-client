import { Notification } from '../types';
import { api } from './api';

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => ({
        url: '/notifications',
        method: 'GET',
      }),
    }),
    clearAllNotifications: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/notifications',
        method: 'DELETE',
      }),
    }),
    updateNotification: builder.mutation<{ message: string }, string>({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useClearAllNotificationsMutation,
  useLazyGetNotificationsQuery,
  useUpdateNotificationMutation,
} = notificationApi;
export const { getNotifications } = notificationApi.endpoints;
