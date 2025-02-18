import { Dungeon, DungeonSession, ISocketDungeonMapData, SessionStatus } from '@/lib/types/game.types';

import { api } from '../api';

export const dungeonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDungeons: builder.query<Dungeon[], void>({
      query: () => ({
        url: '/dungeons',
        method: 'GET',
      }),
    }),
    getAllDungeonsSessionInStatus: builder.query<DungeonSession[], SessionStatus>({
      query: (status) => ({
        url: `/dungeons-session-status/${status}`,
        method: 'GET',
      }),
    }),

    getDungeonsSessionById: builder.query<DungeonSession, string>({
      query: (dungeonSessionId) => ({
        url: `/dungeons-session/${dungeonSessionId}`,
        method: 'GET',
      }),
    }),
    getDungeonMap: builder.query<ISocketDungeonMapData, string>({
      query: (dungeonSessionId) => ({
        url: `/dungeon-map/${dungeonSessionId}`,
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
      { status: SessionStatus; dungeonSessionId: string }
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
  useGetAllDungeonsSessionInStatusQuery,
  useLazyGetAllDungeonsSessionInStatusQuery,
  useGetDungeonMapQuery

} = dungeonApi;

export const { getDungeonsSessionById,getAllDungeonsSessionInStatus,getDungeonMap } = dungeonApi.endpoints;
