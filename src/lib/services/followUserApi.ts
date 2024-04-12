import { api } from './api';

export const followUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation<{ message: string },  string >({
      query: (id) => ({
        url: `/follow/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {useFollowUserMutation} = followUserApi;
export const {followUser} = followUserApi.endpoints


