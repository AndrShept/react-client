import { User } from '../types';
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
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    getUserByUsername: builder.query<User, string>({
      query: (username) => ({
        url: `/users/${username}`,
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation<User, { id: string; userData: FormData }>({
      query: ({ id, userData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
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
