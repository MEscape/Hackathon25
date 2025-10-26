import * as Location from 'expo-location';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LocationState {
  // Permission status
  hasPermission: boolean;
  permissionStatus: Location.PermissionStatus | null;

  // Tracking status
  isTracking: boolean;
  isInitialized: boolean;

  // Current location
  currentLocation: Location.LocationObject | null;
  lastUpdateTime: number | null;

  // Settings
  isVisible: boolean;
  trackingEnabled: boolean;

  // Error handling
  error: string | null;
  isLoading: boolean;

  // First launch tracking
  hasRequestedPermissions: boolean;
}

const initialState: LocationState = {
  hasPermission: false,
  permissionStatus: null,
  isTracking: false,
  isInitialized: false,
  currentLocation: null,
  lastUpdateTime: null,
  isVisible: true,
  trackingEnabled: true,
  error: null,
  isLoading: false,
  hasRequestedPermissions: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    // Permission actions
    setPermissionStatus: (
      state,
      action: PayloadAction<{
        hasPermission: boolean;
        status: Location.PermissionStatus;
      }>
    ) => {
      state.hasPermission = action.payload.hasPermission;
      state.permissionStatus = action.payload.status;
    },

    setPermissionsRequested: state => {
      state.hasRequestedPermissions = true;
    },

    // Tracking actions
    setTrackingStatus: (state, action: PayloadAction<boolean>) => {
      state.isTracking = action.payload;
    },

    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },

    // Location data actions
    updateCurrentLocation: (
      state,
      action: PayloadAction<Location.LocationObject>
    ) => {
      state.currentLocation = action.payload;
      state.lastUpdateTime = Date.now();
      state.error = null;
    },

    // Settings actions
    setLocationVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },

    setTrackingEnabled: (state, action: PayloadAction<boolean>) => {
      state.trackingEnabled = action.payload;
    },

    // Loading and error actions
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearError: state => {
      state.error = null;
    },

    // Reset actions
    resetLocationState: state => {
      state.isTracking = false;
      state.currentLocation = null;
      state.lastUpdateTime = null;
      state.error = null;
      state.isLoading = false;
    },

    // Initialize from service state
    initializeFromService: (
      state,
      action: PayloadAction<{
        hasPermission: boolean;
        isTracking: boolean;
        lastLocation: Location.LocationObject | null;
        error: string | null;
      }>
    ) => {
      const { hasPermission, isTracking, lastLocation, error } = action.payload;
      state.hasPermission = hasPermission;
      state.isTracking = isTracking;
      state.currentLocation = lastLocation;
      state.error = error;
      state.isInitialized = true;
      if (lastLocation) {
        state.lastUpdateTime = Date.now();
      }
    },
  },
});

export const {
  setPermissionStatus,
  setPermissionsRequested,
  setTrackingStatus,
  setInitialized,
  updateCurrentLocation,
  setLocationVisibility,
  setTrackingEnabled,
  setLoading,
  setError,
  clearError,
  resetLocationState,
  initializeFromService,
} = locationSlice.actions;

export default locationSlice.reducer;
