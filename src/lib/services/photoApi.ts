import { Photo } from '../types';
import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPhotosByUsername: builder.query<Photo[], string>({
      query: (username) => ({
        url: `/users-photo/${username}`,
      }),
    }),
    addPhotos: builder.mutation<{ count: number }, FormData>({
      query: (formData) => ({
        url: `/users-photo`,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {
  useAddPhotosMutation,
  useGetPhotosByUsernameQuery,
  useLazyGetPhotosByUsernameQuery,
} = userApi;

export const {} = userApi.endpoints;
