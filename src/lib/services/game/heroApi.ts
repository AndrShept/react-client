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
    equipHeroItem: builder.mutation<
      { success: boolean; message: string; data: InventoryItem },
      { inventoryItemId: string; slot: EquipmentSlot }
    >({
      query: (data) => ({
        url: '/hero-equip',
        method: 'POST',
        body: data,
      }),
    }),
    unEquipHeroItem: builder.mutation<
      { success: boolean; message: string; data: InventoryItem },
      { inventoryItemId: string; slot: EquipmentSlot }
    >({
      query: (data) => ({
        url: '/hero-unEquip',
        method: 'POST',
        body: data,
      }),
    }),
    addHeroItemInventory: builder.mutation<
      InventoryItem,
      { gameItemId: string; heroId?: string }
    >({
      query: (itemData) => ({
        url: '/add-inventory',
        method: 'POST',
        body: itemData,
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
} = heroApi;

export const {} = heroApi.endpoints;