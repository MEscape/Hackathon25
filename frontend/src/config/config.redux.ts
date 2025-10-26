import { PersistConfig } from 'redux-persist';

import { EmergencyContactsState } from '@/features/emergencyContacts/store/emergencyContactsSlice';
import { ProfileState } from '@/features/profile/store/profileSlice';
import { RootState } from '@/store';
import { AuthState } from '@/store/slices/authSlice';
import { reduxStorage } from '@/utils/storage';

export const root: PersistConfig<RootState> = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['auth', 'emergencyContacts', 'profile'],
  blacklist: ['api'],
  version: 1,
  timeout: 1000,
};

export const auth: PersistConfig<AuthState> = {
  key: 'auth',
  storage: reduxStorage,
  blacklist: ['isLoading', 'error'],
};

export const emergencyContacts: PersistConfig<EmergencyContactsState> = {
  key: 'emergencyContacts',
  storage: reduxStorage,
  blacklist: ['isLoading', 'error'],
};

export const profile: PersistConfig<ProfileState> = {
  key: 'profile',
  storage: reduxStorage,
  blacklist: ['isLoading', 'error', 'isEditing', 'editingField'],
};
