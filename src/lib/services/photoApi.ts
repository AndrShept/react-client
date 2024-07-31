import { PhotoDetail } from '@/components/UploadPhotos';

import { Photo } from '../types';
import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPhotosByUsername: builder.query<
      Photo[],
      { username: string; page: number; search?: string }
    >({
      query: (photoData) => ({
        url: `/users-photo/${photoData.username}?page=${photoData.page}&search=${photoData.search}`,
      }),
    }),
    addPhotos: builder.mutation<{ count: number }, FormData>({
      query: (formData) => ({
        url: `/users-photo`,
        method: 'POST',
        body: formData,
      }),
    }),
    deletePhotos: builder.mutation<{ count: number }, PhotoDetail[]>({
      query: (photoData) => ({
        url: `/delete-photos`,
        method: 'DELETE',
        body: photoData,
      }),
    }),
  }),
});

export const {
  useAddPhotosMutation,
  useGetPhotosByUsernameQuery,
  useLazyGetPhotosByUsernameQuery,
  useDeletePhotosMutation,
} = userApi;

export const {} = userApi.endpoints;
