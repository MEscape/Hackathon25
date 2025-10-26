import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { UserMetadata } from '../schemas/profile.schema';

export interface ProfileState {
  metadata: UserMetadata;
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
  editingField: string | null;
}

const initialState: ProfileState = {
  metadata: {},
  isLoading: false,
  error: null,
  isEditing: false,
  editingField: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setMetadata: (state, action: PayloadAction<UserMetadata>) => {
      state.metadata = action.payload;
      state.error = null;
    },
    updateMetadataField: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      const { field, value } = action.payload;
      state.metadata[field] = value;
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
    setEditing: (
      state,
      action: PayloadAction<{ isEditing: boolean; field?: string }>
    ) => {
      state.isEditing = action.payload.isEditing;
      state.editingField = action.payload.field || null;
    },
    clearMetadata: state => {
      state.metadata = {};
      state.error = null;
      state.isEditing = false;
      state.editingField = null;
    },
  },
});

export const {
  setMetadata,
  updateMetadataField,
  setLoading,
  setError,
  clearError,
  setEditing,
  clearMetadata,
} = profileSlice.actions;

// Selectors
export const selectProfile = (state: { profile: ProfileState }) =>
  state.profile;
export const selectMetadata = (state: { profile: ProfileState }) =>
  state.profile.metadata;
export const selectProfileLoading = (state: { profile: ProfileState }) =>
  state.profile.isLoading;
export const selectProfileError = (state: { profile: ProfileState }) =>
  state.profile.error;
export const selectIsEditing = (state: { profile: ProfileState }) =>
  state.profile.isEditing;
export const selectEditingField = (state: { profile: ProfileState }) =>
  state.profile.editingField;

// Memoized selectors for specific metadata fields
export const selectBloodType = createSelector([selectMetadata], metadata => {
  const value = metadata.bloodType;
  return typeof value === 'string'
    ? value
    : typeof value === 'object' && value?.bloodType
      ? value.bloodType
      : '';
});

export const selectJob = createSelector([selectMetadata], metadata => {
  const value = metadata.job;
  return typeof value === 'string'
    ? value
    : typeof value === 'object' && value?.job
      ? value.job
      : '';
});

export const selectAllergies = createSelector([selectMetadata], metadata => {
  const value = metadata.allergies;
  return typeof value === 'string'
    ? value
    : typeof value === 'object' && value?.allergies
      ? value.allergies
      : '';
});

export const selectPreExistingConditions = createSelector(
  [selectMetadata],
  metadata => {
    const value = metadata.preExistingConditions;
    return typeof value === 'string'
      ? value
      : typeof value === 'object' && value?.preExistingConditions
        ? value.preExistingConditions
        : '';
  }
);

export const selectMedication = createSelector([selectMetadata], metadata => {
  const value = metadata.medication;
  return typeof value === 'string'
    ? value
    : typeof value === 'object' && value?.medication
      ? value.medication
      : '';
});

export const selectVaccinationStatus = createSelector(
  [selectMetadata],
  metadata => {
    const value = metadata.vaccinationStatus;
    return typeof value === 'string'
      ? value
      : typeof value === 'object' && value?.vaccinationStatus
        ? value.vaccinationStatus
        : '';
  }
);

export default profileSlice.reducer;
