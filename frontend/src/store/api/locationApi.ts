import { apiSlice } from './baseApi';

export interface LocationData {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
  visibleToFriends?: boolean;
}

export interface UserLocationDto {
  id: string;
  userId: string;
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
  visibleToFriends: boolean;
  createdAt: string;
  updatedAt: string;
  formattedLocation: string;
  isRecent: boolean;
  isStale: boolean;
}

export const locationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateLocation: builder.mutation<UserLocationDto, LocationData>({
      query: (locationData) => ({
        url: '/api/v1/locations/update',
        method: 'PUT',
        body: locationData,
      }),
      invalidatesTags: ['UserLocation'],
    }),
    
    updateLocationVisibility: builder.mutation<UserLocationDto, { visible: boolean }>({
      query: (visibilityData) => ({
        url: '/api/v1/locations/visibility',
        method: 'PATCH',
        body: visibilityData,
      }),
      invalidatesTags: ['UserLocation'],
    }),
    
    getFriendsLocations: builder.query<UserLocationDto[], void>({
      query: () => '/api/v1/locations/friends',
      providesTags: ['UserLocation'],
    }),
  }),
});

export const {
  useUpdateLocationMutation,
  useUpdateLocationVisibilityMutation,
  useGetFriendsLocationsQuery,
} = locationApi;