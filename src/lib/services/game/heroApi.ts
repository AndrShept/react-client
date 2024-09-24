import {
  GameItem,
  Hero,
  InventoryItem,
  Modifier,
} from '@/lib/types/game.types';

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
        modifier: Modifier;
        weapon: GameItem;
        breastplate: GameItem;
      }
    >({
      query: (dataHero) => ({
        url: '/hero',
        method: 'POST',
        body: dataHero,
      }),
    }),
    equipHeroItem: builder.mutation<InventoryItem, Record<string, string>>({
      query: (data) => ({
        url: '/hero-equip',
        method: 'POST',
        body: data,
      }),
    }),
    addHeroItemInventory: builder.mutation<
      InventoryItem,
      { gameItemId: string }
    >({
      query: (gameItemId) => ({
        url: '/add-inventory',
        method: 'POST',
        body: gameItemId,
      }),
    }),
  }),
});

export const {
  useGetMyHeroQuery,
  useLazyGetMyHeroQuery,
  useCreateHeroMutation,
  useEquipHeroItemMutation,
  useAddHeroItemInventoryMutation
} = heroApi;

export const {} = heroApi.endpoints;
