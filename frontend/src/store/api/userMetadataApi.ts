import { apiSlice } from './baseApi';

export const userMetadataApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    registerExpoPushToken: builder.mutation<
      string,
      { userId: string; token: string }
    >({
      query: ({ userId, token }) => ({
        url: `/api/v1/users/${userId}/expoPushToken?token=${encodeURIComponent(token)}`,
        method: 'POST',
      }),
      invalidatesTags: ['UserMetadata'],
    }),

    triggerEmergency: builder.mutation<string, { userId: string }>({
      query: ({ userId }) => ({
        url: `/api/v1/users/${userId}/emergency`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useRegisterExpoPushTokenMutation, useTriggerEmergencyMutation } =
  userMetadataApi;
