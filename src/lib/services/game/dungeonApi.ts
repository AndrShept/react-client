import { Dungeon, DungeonSession } from '@/lib/types/game.types';

import { api } from '../api';

export const dungeonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDungeons: builder.query<Dungeon[], void>({
      query: () => ({
        url: '/dungeons',
        method: 'GET',
      }),
    }),
    getDungeonsSessionById: builder.query<DungeonSession, string >({
      query: (dungeonId) => ({
        url: `/dungeons-session/${dungeonId}`,
        method: 'GET',
      }),
    }),
    createDungSession: builder.mutation<DungeonSession, { dungeonId: string }>({
      query: (data) => ({
        url: '/dungeons-session',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetDungeonsQuery, useLazyGetDungeonsQuery ,useCreateDungSessionMutation, useGetDungeonsSessionByIdQuery } = dungeonApi;

export const {} = dungeonApi.endpoints;
