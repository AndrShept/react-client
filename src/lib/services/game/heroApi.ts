import { Hero, InventoryItem, Modifier } from '@/lib/types/game.types';

import { api } from '../api';

export const heroApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyHero: builder.query<Hero, void>({
      query: () => ({
        url: '/hero',
        method: 'GET',
      }),
    }),
    createHero: builder.mutation<
      Hero,
      Record<string, unknown> & {
        modifier: Modifier
        weapon: InventoryItem;
        breastplate: InventoryItem;
      }
    >({
      query: (dataHero) => ({
        url: '/hero',
        method: 'POST',
        body: dataHero,
      }),
    }),
  }),
});

export const {
  useGetMyHeroQuery,
  useLazyGetMyHeroQuery,
  useCreateHeroMutation,
} = heroApi;

export const {} = heroApi.endpoints;
