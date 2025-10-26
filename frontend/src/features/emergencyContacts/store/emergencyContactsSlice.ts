import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  DiscoverableUser,
  EmergencyContact,
} from '../schemas/emergency.schema';

export interface EmergencyContactsState {
  contacts: EmergencyContact[];
  discoverableUsers: DiscoverableUser[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EmergencyContactsState = {
  contacts: [],
  discoverableUsers: [],
  isLoading: false,
  error: null,
};

export const emergencyContactsSlice = createSlice({
  name: 'emergencyContacts',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<EmergencyContact[]>) => {
      state.contacts = action.payload;
      state.error = null;
    },
    setDiscoverableUsers: (
      state,
      action: PayloadAction<DiscoverableUser[]>
    ) => {
      state.discoverableUsers = action.payload;
      state.error = null;
    },
    // Handle friend request acceptance - move user from discoverable to contacts
    acceptFriendRequest: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const user = state.discoverableUsers.find(u => u.id === userId);
      if (user && user.requestStatus === 'received') {
        // Update user status to friends
        user.requestStatus = 'friends';

        // Add to contacts if not already there
        const existingContact = state.contacts.find(c => c.id === userId);
        if (!existingContact) {
          const newContact: EmergencyContact = {
            id: user.id,
            firstName: '', // Will be updated when data refreshes
            lastName: '',
            username: user.username,
            email: user.email,
            status: 'offline',
          };
          state.contacts.push(newContact);
        }
      }
    },
    // Handle friend removal - remove from contacts and update discoverable status
    removeFriend: (state, action: PayloadAction<string>) => {
      const userId = action.payload;

      // Remove from contacts
      state.contacts = state.contacts.filter(c => c.id !== userId);

      // Update discoverable user status to 'none'
      const user = state.discoverableUsers.find(u => u.id === userId);
      if (user) {
        user.requestStatus = 'none';
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: state => {
      state.error = null;
    },
  },
});

export const {
  setContacts,
  setDiscoverableUsers,
  acceptFriendRequest,
  removeFriend,
  setLoading,
  setError,
  clearError,
} = emergencyContactsSlice.actions;

// Base Selectors
export const selectEmergencyContacts = (state: {
  emergencyContacts: EmergencyContactsState;
}) => state.emergencyContacts.contacts;

export const selectDiscoverableUsers = (state: {
  emergencyContacts: EmergencyContactsState;
}) => state.emergencyContacts.discoverableUsers;

export const selectEmergencyContactsLoading = (state: {
  emergencyContacts: EmergencyContactsState;
}) => state.emergencyContacts.isLoading;

export const selectEmergencyContactsError = (state: {
  emergencyContacts: EmergencyContactsState;
}) => state.emergencyContacts.error;

// Memoized Selectors
export const selectPendingRequests = createSelector(
  [selectDiscoverableUsers],
  users => users.filter(u => u.requestStatus === 'received')
);

export default emergencyContactsSlice.reducer;
