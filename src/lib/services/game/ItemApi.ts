import { GameItem, InventoryItem, Modifier } from '@/lib/types/game.types';

import { api } from '../api';

export const itemApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query<GameItem[], void>({
      query: () => ({
        url: `/items`,
        method: 'GET',
      }),
    }),
    getNoviceItems: builder.query<GameItem[], void>({
      query: () => ({
        url: `/novice-items`,
        method: 'GET',
      }),
    }),
    createItem: builder.mutation<
    GameItem,
      {
        name: string;
        type: string | null;
        weaponType: string | null;
        imageUrl: string;
        tag: string;
        modifier: Partial<Modifier | null>;
      }
    >({
      query: (itemData) => ({
        url: `/create-items`,
        method: 'POST',
        body: itemData,
      }),
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetNoviceItemsQuery,
  useLazyGetAllItemsQuery,
  useLazyGetNoviceItemsQuery,
  useCreateItemMutation,
} = itemApi;

export const {} = itemApi.endpoints;
