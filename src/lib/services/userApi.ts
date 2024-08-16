import { ErrorMessage, Follows, User, UserWithCount } from '../types';
import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),
    register: builder.mutation<
      { email: string; password: string; username: string },
      { email: string; password: string; username: string }
    >({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    current: builder.query<User, void>({
      query: () => ({
        url: '/current',
        method: 'GET',
      }),
    }),
    getAllUsers: builder.query<User[],  string| undefined>({
      query: (userName) => ({
        url:  `/users/${userName}`,
        method: 'GET',
      }),
    }),
    getAllFollowingUsers: builder.query<User[], void>({
      query: () => ({
        url: '/users-following',
        method: 'GET',
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    getUserByUsername: builder.query<UserWithCount, string>({
      query: (username) => ({
        url: `/users-username/${username}`,
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation<User, { id: string; formData: FormData }>(
      {
        query: ({ id, formData }) => ({
          url: `/users/${id}`,
          method: 'PUT',
          body: formData,
        }),
      },
    ),
    userOnline: builder.mutation<void, void>({
      query: () => ({
        url: '/users-online',
        method: 'PUT',
      }),
    }),
    userOffline: builder.mutation<User, string>({
      query: (userId) => ({
        url: `/users-offline/${userId}`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useGetUserByUsernameQuery,
  useLazyGetUserByUsernameQuery,
  useUserOfflineMutation,
  useUserOnlineMutation,
  useGetAllFollowingUsersQuery,
  useLazyGetAllFollowingUsersQuery,
} = userApi;

export const {
  current,
  getAllUsers,
  getUserById,
  getUserByUsername,
  login,
  register,
  updateUser,
} = userApi.endpoints;
