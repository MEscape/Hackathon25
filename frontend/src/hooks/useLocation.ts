import { useEffect, useCallback } from 'react';

import * as Location from 'expo-location';

import { useSelector, useDispatch } from 'react-redux';

import { locationService } from '@/services/locationService';
import { RootState } from '@/store';
import {
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
  initializeFromService,
} from '@/store/slices/locationSlice';

export interface UseLocationReturn {
  // State
  hasPermission: boolean;
  isTracking: boolean;
  isInitialized: boolean;
  currentLocation: Location.LocationObject | null;
  lastUpdateTime: number | null;
  isVisible: boolean;
  trackingEnabled: boolean;
  error: string | null;
  isLoading: boolean;
  hasRequestedPermissions: boolean;

  // Actions
  requestPermissions: () => Promise<boolean>;
  startTracking: () => Promise<boolean>;
  stopTracking: () => Promise<void>;
  getCurrentLocation: () => Promise<Location.LocationObject | null>;
  updateVisibility: (visible: boolean) => Promise<boolean>;
  setTrackingEnabledSetting: (enabled: boolean) => void;
  clearLocationError: () => void;
  initializeLocationService: () => Promise<void>;
}

export const useLocation = (): UseLocationReturn => {
  const dispatch = useDispatch();
  const locationState = useSelector((state: RootState) => state.location);

  // Initialize location service on first use
  const initializeLocationService = useCallback(async () => {
    if (locationState.isInitialized) return;

    dispatch(setLoading(true));

    try {
      // Check current permissions
      const permissionStatus = await locationService.checkPermissions();
      dispatch(
        setPermissionStatus({
          hasPermission: permissionStatus.granted,
          status: permissionStatus.status,
        })
      );

      // Get current service state
      const serviceState = locationService.getState();
      dispatch(initializeFromService(serviceState));

      // If permissions are granted and tracking was enabled, start tracking
      if (permissionStatus.granted && locationState.trackingEnabled) {
        await locationService.startTracking();
        dispatch(setTrackingStatus(true));
      }
    } catch (error) {
      console.error('Error initializing location service:', error);
      dispatch(setError('Failed to initialize location service'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, locationState.isInitialized, locationState.trackingEnabled]);

  // Request location permissions
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const result = await locationService.requestPermissions();

      dispatch(
        setPermissionStatus({
          hasPermission: result.granted,
          status: result.status,
        })
      );

      dispatch(setPermissionsRequested());

      if (result.granted && locationState.trackingEnabled) {
        // Auto-start tracking if permissions granted and tracking is enabled
        await startTracking();
      }

      return result.granted;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      dispatch(setError('Failed to request location permissions'));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, locationState.trackingEnabled]);

  // Start location tracking
  const startTracking = useCallback(async (): Promise<boolean> => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const success = await locationService.startTracking();
      dispatch(setTrackingStatus(success));

      if (success) {
        // Get initial location
        const location = await locationService.getCurrentLocation();
        if (location) {
          dispatch(updateCurrentLocation(location));
        }
      }

      return success;
    } catch (error) {
      console.error('Error starting tracking:', error);
      dispatch(setError('Failed to start location tracking'));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Stop location tracking
  const stopTracking = useCallback(async (): Promise<void> => {
    dispatch(setLoading(true));

    try {
      await locationService.stopTracking();
      dispatch(setTrackingStatus(false));
    } catch (error) {
      console.error('Error stopping tracking:', error);
      dispatch(setError('Failed to stop location tracking'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Get current location once
  const getCurrentLocation =
    useCallback(async (): Promise<Location.LocationObject | null> => {
      dispatch(setLoading(true));
      dispatch(clearError());

      try {
        const location = await locationService.getCurrentLocation();
        if (location) {
          dispatch(updateCurrentLocation(location));
        }
        return location;
      } catch (error) {
        console.error('Error getting current location:', error);
        dispatch(setError('Failed to get current location'));
        return null;
      } finally {
        dispatch(setLoading(false));
      }
    }, [dispatch]);

  // Update location visibility
  const updateVisibility = useCallback(
    async (visible: boolean): Promise<boolean> => {
      dispatch(setLoading(true));

      try {
        const success = await locationService.updateLocationVisibility(visible);
        if (success) {
          dispatch(setLocationVisibility(visible));
        }
        return success;
      } catch (error) {
        console.error('Error updating visibility:', error);
        dispatch(setError('Failed to update location visibility'));
        return false;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  // Set tracking enabled setting
  const setTrackingEnabledSetting = useCallback(
    (enabled: boolean) => {
      dispatch(setTrackingEnabled(enabled));

      // If disabling tracking, stop it
      if (!enabled && locationState.isTracking) {
        stopTracking();
      }
      // If enabling tracking and we have permissions, start it
      else if (
        enabled &&
        locationState.hasPermission &&
        !locationState.isTracking
      ) {
        startTracking();
      }
    },
    [
      dispatch,
      locationState.isTracking,
      locationState.hasPermission,
      stopTracking,
      startTracking,
    ]
  );

  // Clear location error
  const clearLocationError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Auto-initialize on mount
  useEffect(() => {
    if (!locationState.isInitialized) {
      initializeLocationService();
    }
  }, [initializeLocationService, locationState.isInitialized]);

  return {
    // State
    hasPermission: locationState.hasPermission,
    isTracking: locationState.isTracking,
    isInitialized: locationState.isInitialized,
    currentLocation: locationState.currentLocation,
    lastUpdateTime: locationState.lastUpdateTime,
    isVisible: locationState.isVisible,
    trackingEnabled: locationState.trackingEnabled,
    error: locationState.error,
    isLoading: locationState.isLoading,
    hasRequestedPermissions: locationState.hasRequestedPermissions,

    // Actions
    requestPermissions,
    startTracking,
    stopTracking,
    getCurrentLocation,
    updateVisibility,
    setTrackingEnabledSetting,
    clearLocationError,
    initializeLocationService,
  };
};
