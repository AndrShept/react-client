import { Dungeon } from '@/lib/types/game.types';

import { api } from '../api';

export const dungeonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDungeons: builder.query<Dungeon[], void>({
      query: () => ({
        url: '/dungeons',
        method: 'GET',
      }),
    }),
  }),
});

export const {} = dungeonApi;

export const {} = dungeonApi.endpoints;
