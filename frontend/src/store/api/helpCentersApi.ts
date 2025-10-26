import { apiSlice } from './baseApi';

export interface HelpCenterItem {
  name: string;
  type: string;
  lat: number;
  lon: number;
  tags: string[];
}

export interface HelpCenterResponse {
  items: HelpCenterItem[];
}

export interface HelpCenterQuery {
  lat: number;
  lon: number;
  radius: number;
  type: string;
}

// Define help center types with their display information
export const HELP_CENTER_TYPES = {
  hospital: {
    key: 'hospital',
    icon: 'medical' as const,
    color: '#FF4444',
    priority: 1,
  },
  police: {
    key: 'police',
    icon: 'shield' as const,
    color: '#4444FF',
    priority: 2,
  },
  fire_station: {
    key: 'fire_station',
    icon: 'flame' as const,
    color: '#FF8800',
    priority: 3,
  },
  pharmacy: {
    key: 'pharmacy',
    icon: 'medical-outline' as const,
    color: '#00AA44',
    priority: 4,
  },
  shelter: {
    key: 'shelter',
    icon: 'home' as const,
    color: '#8844FF',
    priority: 5,
  },
} as const;

export type HelpCenterType = keyof typeof HELP_CENTER_TYPES;

export const helpCentersApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getHelpCenters: builder.query<HelpCenterResponse, HelpCenterQuery>({
      query: ({ lat, lon, radius, type }) => ({
        url: '/api/v1/helpcenters',
        params: { lat, lon, radius, type },
      }),
      providesTags: (result, error, { type, lat, lon, radius }) => [
        { type: 'HelpCenter', id: `${type}-${lat}-${lon}-${radius}` },
      ],
    }),

    getMultipleHelpCenters: builder.query<
      Record<HelpCenterType, HelpCenterResponse>,
      Omit<HelpCenterQuery, 'type'> & { types: HelpCenterType[] }
    >({
      queryFn: async ({ lat, lon, radius, types }, { dispatch }) => {
        const promises = types.map(async (type: HelpCenterType) => {
          const result = await dispatch(
            helpCentersApi.endpoints.getHelpCenters.initiate({
              lat,
              lon,
              radius,
              type,
            })
          );
          return { type, result: result.data };
        });

        const results: {
          type: HelpCenterType;
          result: HelpCenterResponse | undefined;
        }[] = await Promise.all(promises);

        const data: Record<HelpCenterType, HelpCenterResponse> = results.reduce(
          (
            acc: Record<HelpCenterType, HelpCenterResponse>,
            {
              type,
              result,
            }: { type: HelpCenterType; result: HelpCenterResponse | undefined }
          ) => {
            acc[type] = result || { items: [] };
            return acc;
          },
          {} as Record<HelpCenterType, HelpCenterResponse>
        );

        return { data };
      },
      providesTags: (result, error, { types, lat, lon, radius }) => [
        ...types.map(type => ({
          type: 'HelpCenter' as const,
          id: `${type}-${lat}-${lon}-${radius}`,
        })),
        { type: 'HelpCenter', id: `multi-${lat}-${lon}-${radius}` },
      ],
    }),
  }),
});

export const {
  useGetHelpCentersQuery,
  useGetMultipleHelpCentersQuery,
  useLazyGetHelpCentersQuery,
  useLazyGetMultipleHelpCentersQuery,
} = helpCentersApi;
