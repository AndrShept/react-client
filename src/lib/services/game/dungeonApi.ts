import { Dungeon, DungeonSession, Status } from '@/lib/types/game.types';

import { api } from '../api';

export const dungeonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDungeons: builder.query<Dungeon[], void>({
      query: () => ({
        url: '/dungeons',
        method: 'GET',
      }),
    }),

    getDungeonsSessionById: builder.query<DungeonSession, string>({
      query: (dungeonSessionId) => ({
        url: `/dungeons-session/${dungeonSessionId}`,
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
    updateDungeonSessionStatus: builder.mutation<
      DungeonSession,
      { status: Status; dungeonSessionId: string }
    >({
      query: (data) => ({
        url: '/dungeons-session-status',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDungeonsQuery,
  useLazyGetDungeonsQuery,
  useCreateDungSessionMutation,
  useGetDungeonsSessionByIdQuery,
  useLazyGetDungeonsSessionByIdQuery,
  useUpdateDungeonSessionStatusMutation,
} = dungeonApi;

export const { getDungeonsSessionById } = dungeonApi.endpoints;
