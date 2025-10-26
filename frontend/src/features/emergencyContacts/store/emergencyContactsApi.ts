import { apiSlice } from '@/store/api/baseApi';
import { validateApiResponse } from '@/utils/validation';

import { removeFriend, acceptFriendRequest } from './emergencyContactsSlice';
import {
  EmergencyContact,
  DiscoverableUser,
  EmergencyContactsResponseSchema,
  DiscoverableUsersResponseSchema,
  FriendRequestResponseSchema,
  FriendRequestResponse,
} from '../schemas/emergency.schema';

export const emergencyContactsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    // Get all emergency contacts (friends)
    getEmergencyContacts: builder.query<EmergencyContact[], void>({
      query: () => '/api/v1/emergency-contacts',
      transformResponse: (response: unknown) => {
        const validated = validateApiResponse(
          EmergencyContactsResponseSchema,
          response
        );
        return validated.contacts;
      },
      providesTags: ['EmergencyContacts'],
    }),

    // Get discoverable users
    getDiscoverableUsers: builder.query<DiscoverableUser[], void>({
      query: () => '/api/v1/users/discover',
      transformResponse: (response: unknown) => {
        const validated = validateApiResponse(
          DiscoverableUsersResponseSchema,
          response
        );
        return validated.users;
      },
      providesTags: ['DiscoverableUsers'],
    }),

    // Send friend request
    sendFriendRequest: builder.mutation<FriendRequestResponse, string>({
      query: userId => ({
        url: `/api/v1/users/${userId}/friend-request`,
        method: 'POST',
      }),
      transformResponse: (response: unknown) =>
        validateApiResponse(FriendRequestResponseSchema, response),
      async onQueryStarted(userId, { dispatch, queryFulfilled }) {
        // Optimistic update - update user status to 'sent'
        const patchResult = dispatch(
          emergencyContactsApi.util.updateQueryData(
            'getDiscoverableUsers',
            undefined,
            draft => {
              const user = draft.find(u => u.id === userId);
              if (user) {
                user.requestStatus = 'sent';
              }
              return draft;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error
          patchResult.undo();
        }
      },
      invalidatesTags: ['DiscoverableUsers'],
    }),

    // Accept friend request
    acceptFriendRequest: builder.mutation<FriendRequestResponse, string>({
      query: userId => ({
        url: `/api/v1/users/${userId}/friend-request/accept`,
        method: 'POST',
      }),
      transformResponse: (response: unknown) =>
        validateApiResponse(FriendRequestResponseSchema, response),
      invalidatesTags: ['EmergencyContacts'],
      async onQueryStarted(userId, { dispatch, queryFulfilled }) {
        // Optimistic update using slice action
        dispatch(acceptFriendRequest(userId));

        // Also update the cached queries
        const patchResult = dispatch(
          emergencyContactsApi.util.updateQueryData(
            'getDiscoverableUsers',
            undefined,
            draft => {
              const user = draft.find(u => u.id === userId);
              if (user) {
                user.requestStatus = 'friends';
              }
              return draft;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error
          patchResult.undo();
        }
      },
    }),

    // Decline friend request
    declineFriendRequest: builder.mutation<FriendRequestResponse, string>({
      query: userId => ({
        url: `/api/v1/users/${userId}/friend-request/decline`,
        method: 'POST',
      }),
      transformResponse: (response: unknown) =>
        validateApiResponse(FriendRequestResponseSchema, response),
      async onQueryStarted(userId, { dispatch, queryFulfilled }) {
        // Optimistic update - update user status to 'none'
        const patchResult = dispatch(
          emergencyContactsApi.util.updateQueryData(
            'getDiscoverableUsers',
            undefined,
            draft => {
              const user = draft.find(u => u.id === userId);
              if (user) {
                user.requestStatus = 'none';
              }
              return draft;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error
          patchResult.undo();
        }
      },
      invalidatesTags: ['DiscoverableUsers'],
    }),

    // Remove emergency contact (unfriend)
    removeEmergencyContact: builder.mutation<FriendRequestResponse, string>({
      query: userId => ({
        url: `/api/v1/emergency-contacts/${userId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: unknown) =>
        validateApiResponse(FriendRequestResponseSchema, response),
      async onQueryStarted(userId, { dispatch, queryFulfilled }) {
        // Optimistic update using slice action
        dispatch(removeFriend(userId));

        // Also update the cached queries
        const contactsPatchResult = dispatch(
          emergencyContactsApi.util.updateQueryData(
            'getEmergencyContacts',
            undefined,
            draft => {
              return draft.filter(contact => contact.id !== userId);
            }
          )
        );

        const usersPatchResult = dispatch(
          emergencyContactsApi.util.updateQueryData(
            'getDiscoverableUsers',
            undefined,
            draft => {
              const user = draft.find(u => u.id === userId);
              if (user) {
                user.requestStatus = 'none';
              }
              return draft;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic updates on error
          contactsPatchResult.undo();
          usersPatchResult.undo();
        }
      },
      invalidatesTags: ['EmergencyContacts', 'DiscoverableUsers'],
    }),
  }),
});

export const {
  useGetEmergencyContactsQuery,
  useGetDiscoverableUsersQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useRemoveEmergencyContactMutation,
} = emergencyContactsApi;
