import { api } from './api';

export const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addLike: builder.mutation<{ message: string }, {id:string, type: 'post' | 'comment' | 'photo' }>({
      query: (likeData) => ({
        url: `/like/${likeData.id}`,
        method: 'POST',
        body: likeData
      }),
    }),

  }),
});

export const { useAddLikeMutation,  } = likeApi;
export const { addLike } = likeApi.endpoints;
