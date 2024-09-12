import { Post } from '../types';
import { Hero } from '../types/game.types';
import { api } from './api';

export const heroApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyHero: builder.query<Hero, void>({
      query: () => ({
        url: '/hero',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetMyHeroQuery, useLazyGetMyHeroQuery } = heroApi;

export const {} = heroApi.endpoints;
