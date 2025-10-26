import { apiSlice } from '@/store/api/baseApi';

import { Warning, WarningsQuery } from '../types/warnings';

export const warningsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getWarningsNearby: builder.query<Warning[], WarningsQuery>({
      query: ({ lat, lon, radiusKm = 10 }) => ({
        url: '/api/v1/warnings',
        method: 'GET',
        params: {
          lat,
          lon,
          radiusKm,
        },
      }),
      providesTags: ['Warnings'],
      // Cache for 5 minutes since warnings data changes frequently
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetWarningsNearbyQuery } = warningsApi;
