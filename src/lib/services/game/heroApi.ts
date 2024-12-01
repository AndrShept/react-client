import { ServerResponse } from '@/lib/types';
import {
  EquipmentSlot,
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
        weapon: GameItem | null;
        breastplate: GameItem | null;
      }
    >({
      query: (dataHero) => ({
        url: '/hero',
        method: 'POST',
        body: dataHero,
      }),
    }),
    updateHero: builder.mutation<Hero, Partial<Hero>>({
      query: (data) => ({
        url: '/hero-update',
        method: 'PUT',
        body: data,
      }),
    }),
    resetStats: builder.mutation<ServerResponse<null>, void>({
      query: () => ({
        url: '/reset-stats',
        method: 'PUT',
      }),
    }),
    equipHeroItem: builder.mutation<
      ServerResponse<InventoryItem>,
      { inventoryItemId: string; slot: EquipmentSlot }
    >({
      query: (data) => ({
        url: '/hero-equip',
        method: 'POST',
        body: data,
      }),
    }),
    unEquipHeroItem: builder.mutation<
      ServerResponse<InventoryItem>,
      { inventoryItemId: string }
    >({
      query: (data) => ({
        url: '/hero-unEquip',
        method: 'POST',
        body: data,
      }),
    }),
    addHeroItemInventory: builder.mutation<
      ServerResponse<InventoryItem>,
      { gameItemId: string; heroId?: string }
    >({
      query: (itemData) => ({
        url: '/add-inventory',
        method: 'POST',
        body: itemData,
      }),
    }),

    drinkPotionServer: builder.mutation<
      ServerResponse<InventoryItem>,
      { inventoryItemId: string; heroId?: string }
    >({
      query: (itemData) => ({
        url: '/drink-potion',
        method: 'POST',
        body: itemData,
      }),
    }),
    removeBuffServer: builder.mutation<{ message: string }, { buffId: string }>(
      {
        query: (buffId) => ({
          url: '/remove-buff',
          method: 'DELETE',
          body: buffId,
        }),
      },
    ),
    deleteItemServer: builder.mutation<{ message: string }, { id: string }>({
      query: (id) => ({
        url: '/delete-item',
        method: 'DELETE',
        body: id,
      }),
    }),
  }),
});

export const {
  useGetMyHeroQuery,
  useLazyGetMyHeroQuery,
  useCreateHeroMutation,
  useEquipHeroItemMutation,
  useAddHeroItemInventoryMutation,
  useUnEquipHeroItemMutation,
  useUpdateHeroMutation,
  useResetStatsMutation,
  useDrinkPotionServerMutation,
  useRemoveBuffServerMutation,
  useDeleteItemServerMutation
} = heroApi;

export const {} = heroApi.endpoints;
