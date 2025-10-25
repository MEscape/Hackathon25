import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  useGetEmergencyContactsQuery,
  useGetDiscoverableUsersQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useRemoveEmergencyContactMutation,
} from '../store/emergencyContactsApi';
import {
  selectEmergencyContacts,
  selectDiscoverableUsers,
  selectPendingRequests,
  selectEmergencyContactsLoading,
  selectEmergencyContactsError,
  setContacts,
  setDiscoverableUsers,
  setLoading,
  setError,
  clearError,
} from '../store/emergencyContactsSlice';

export const useEmergencyContacts = () => {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(selectEmergencyContacts);
  const discoverableUsers = useAppSelector(selectDiscoverableUsers);
  const pendingRequests = useAppSelector(selectPendingRequests);
  const isLoading = useAppSelector(selectEmergencyContactsLoading);
  const error = useAppSelector(selectEmergencyContactsError);

  // Queries
  const {
    data: contactsData,
    isLoading: isLoadingContacts,
    refetch: refetchContacts,
  } = useGetEmergencyContactsQuery();

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = useGetDiscoverableUsersQuery();

  // Mutations
  const [sendRequestMutation, { isLoading: isSending }] = useSendFriendRequestMutation();
  const [acceptRequestMutation, { isLoading: isAccepting }] = useAcceptFriendRequestMutation();
  const [declineRequestMutation, { isLoading: isDeclining }] = useDeclineFriendRequestMutation();
  const [removeContactMutation, { isLoading: isRemoving }] = useRemoveEmergencyContactMutation();

  // Sync store when data updates
  useEffect(() => {
    if (contactsData) {
      dispatch(setContacts(contactsData));
    }
  }, [contactsData, dispatch]);

  useEffect(() => {
    if (usersData) {
      dispatch(setDiscoverableUsers(usersData));
    }
  }, [usersData, dispatch]);

  const sendFriendRequest = useCallback(
      async (userId: string) => {
        dispatch(setLoading(true));
        dispatch(clearError());

        try {
          const response = await sendRequestMutation(userId).unwrap();
          return { success: true, data: response };
        } catch (error: any) {
          console.error('Send friend request error:', error);
          const errorMessage = error?.data?.message || error?.message || error?.error || 'Failed to send friend request';
          dispatch(setError(errorMessage));
          return { success: false, error: errorMessage };
        } finally {
          dispatch(setLoading(false));
        }
      },
      [sendRequestMutation, dispatch]
  );

  const acceptFriendRequest = useCallback(
      async (userId: string) => {
        dispatch(setLoading(true));
        dispatch(clearError());

        try {
          const response = await acceptRequestMutation(userId).unwrap();
          return { success: true, data: response };
        } catch (error: any) {
          console.error('Accept friend request error:', error);
          const errorMessage = error?.data?.message || error?.message || error?.error || 'Failed to accept friend request';
          dispatch(setError(errorMessage));
          return { success: false, error: errorMessage };
        } finally {
          dispatch(setLoading(false));
        }
      },
      [acceptRequestMutation, dispatch]
  );

  const declineFriendRequest = useCallback(
      async (userId: string) => {
        dispatch(setLoading(true));
        dispatch(clearError());

        try {
          const response = await declineRequestMutation(userId).unwrap();
          return { success: true, data: response };
        } catch (error: any) {
          console.error('Decline friend request error:', error);
          const errorMessage = error?.data?.message || error?.message || error?.error || 'Failed to decline friend request';
          dispatch(setError(errorMessage));
          return { success: false, error: errorMessage };
        } finally {
          dispatch(setLoading(false));
        }
      },
      [declineRequestMutation, dispatch]
  );

  const removeEmergencyContact = useCallback(
      async (userId: string) => {
        dispatch(setLoading(true));
        dispatch(clearError());

        try {
          const response = await removeContactMutation(userId).unwrap();
          return { success: true, data: response };
        } catch (error: any) {
          console.error('Remove contact error:', error);
          const errorMessage = error?.data?.message || error?.message || error?.error || 'Failed to remove contact';
          dispatch(setError(errorMessage));
          return { success: false, error: errorMessage };
        } finally {
          dispatch(setLoading(false));
        }
      },
      [removeContactMutation, dispatch]
  );

  return {
    contacts,
    discoverableUsers,
    pendingRequests,
    isLoading: isLoading || isLoadingContacts || isLoadingUsers || isSending || isAccepting || isDeclining || isRemoving,
    error,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeEmergencyContact,
    refetchContacts,
    refetchUsers,
  };
};