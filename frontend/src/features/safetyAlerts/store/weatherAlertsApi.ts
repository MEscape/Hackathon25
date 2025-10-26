import { apiSlice } from '@/store/api/baseApi';
import { validateApiResponse } from '@/utils/validation';
import { WeatherAlertsResponseSchema, WeatherAlert } from '../schemas/weatherAlerts.schema';

export const weatherAlertsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getWeatherAlertsEnglish: builder.query<WeatherAlert[], void>({
      query: () => ({
        url: '/api/weather/alerts/english',
        method: 'GET',
      }),
      transformResponse: (response: unknown): WeatherAlert[] => {
        const validated = validateApiResponse(WeatherAlertsResponseSchema, response);
        return validated.items;
      },
      providesTags: ['WeatherAlerts'],
    }),
  }),
});

export const { useGetWeatherAlertsEnglishQuery } = weatherAlertsApi;