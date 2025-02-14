import { ServerResponse } from '@/lib/types';
import { DungeonParty, Hero } from '@/lib/types/game.types';

import { api } from '../api';

export const dungeonPartyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDungeonParty: builder.query<DungeonParty[], string>({
      query: (dungeonSessionId) => ({
        url: `/dungeons-party/${dungeonSessionId}`,
        method: 'GET',
      }),
    }),
    getDungeonPartyHeroByTerm: builder.query<Hero[], string | undefined>({
      query: (searchTerm) => ({
        url: `/dungeons-party-search/${searchTerm}`,
        method: 'GET',
      }),
    }),
    createDungeonPartyHero: builder.mutation<
      ServerResponse<DungeonParty>,
      { dungeonSessionId: string; heroId: string }
    >({
      query: (data) => ({
        url: `/dungeons-party`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteDungeonPartyHero: builder.mutation<
      ServerResponse<DungeonParty>,
      string
    >({
      query: (memberId) => ({
        url: `/dungeons-party/${memberId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetDungeonPartyHeroByTermQuery,
  useLazyGetDungeonPartyHeroByTermQuery,
  useCreateDungeonPartyHeroMutation,
  useGetDungeonPartyQuery,
  useDeleteDungeonPartyHeroMutation,
} = dungeonPartyApi;

export const {
  getDungeonPartyHeroByTerm,
  createDungeonPartyHero,
  deleteDungeonPartyHero,
  getDungeonParty,
} = dungeonPartyApi.endpoints;
