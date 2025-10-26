import { apiSlice } from '@/store/api/baseApi';
import { validateApiResponse } from '@/utils/validation';

import {
  PoliceAlert,
  PoliceAlertsResponseSchema,
} from '../schemas/safetyAlerts.schema';

export const safetyAlertsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getPoliceAlerts: builder.query<PoliceAlert[], void>({
      query: () => '/api/v1/nina/police/alerts',
      transformResponse: (response: unknown) => {
        const validated = validateApiResponse(
          PoliceAlertsResponseSchema,
          response
        );
        return validated.items;
      },
      providesTags: ['SafetyAlerts'],
    }),
  }),
});

export const { useGetPoliceAlertsQuery } = safetyAlertsApi;
