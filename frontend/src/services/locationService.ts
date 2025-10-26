import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import Toast from 'react-native-toast-message';

import { translate } from '@/i18n';
import { store } from '@/store';
import { locationApi } from '@/store/api/locationApi';
import { updateCurrentLocation } from '@/store/slices/locationSlice';

// Background task name
const LOCATION_TASK_NAME = 'background-location-task';

// Location tracking configuration
const LOCATION_CONFIG: Location.LocationTaskOptions = {
  accuracy: Location.Accuracy.Balanced,
  timeInterval: 30000, // 30 seconds
  distanceInterval: 0, // 0 meters
  deferredUpdatesInterval: 60000, // 1 minute
  foregroundService: {
    notificationTitle: translate('location:tracking.backgroundTitle'),
    notificationBody: translate('location:tracking.backgroundBody'),
    notificationColor: '#007AFF',
  },
  pausesUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: true,
};

export interface LocationPermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
  status: Location.PermissionStatus;
}

export interface LocationServiceState {
  isTracking: boolean;
  hasPermission: boolean;
  lastLocation: Location.LocationObject | null;
  error: string | null;
}

class LocationService {
  private static instance: LocationService;
  private state: LocationServiceState = {
    isTracking: false,
    hasPermission: false,
    lastLocation: null,
    error: null,
  };

  private constructor() {
    this.setupBackgroundTask();
  }

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  /**
   * Setup the background location task
   */
  private setupBackgroundTask(): void {
    TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
      if (error) {
        console.error('Background location task error:', error);
        return;
      }

      if (data) {
        const { locations } = data as { locations: Location.LocationObject[] };
        const location = locations[0];

        if (location) {
          this.state.lastLocation = location;

          // Update Redux store with new location
          store.dispatch(updateCurrentLocation(location));

          // Send location to backend
          await this.sendLocationToBackend(location);
        }
      }
    });
  }

  /**
   * Request location permissions
   */
  public async requestPermissions(): Promise<LocationPermissionStatus> {
    try {
      // Request foreground permissions first
      const foregroundPermission =
        await Location.requestForegroundPermissionsAsync();

      if (foregroundPermission.status !== 'granted') {
        this.state.hasPermission = false;
        this.state.error = translate('location:permissionDenied');

        return {
          granted: false,
          canAskAgain: foregroundPermission.canAskAgain,
          status: foregroundPermission.status,
        };
      }

      // Request background permissions for continuous tracking
      const backgroundPermission =
        await Location.requestBackgroundPermissionsAsync();

      const granted = backgroundPermission.status === 'granted';
      this.state.hasPermission = granted;

      if (!granted) {
        this.state.error = translate('location:backgroundPermissionDenied');
        Toast.show({
          type: 'info',
          text1: translate('location:backgroundPermissionTitle'),
          text2: translate('location:backgroundPermissionMessage'),
          visibilityTime: 5000,
        });
      } else {
        this.state.error = null;
      }

      return {
        granted,
        canAskAgain: backgroundPermission.canAskAgain,
        status: backgroundPermission.status,
      };
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      this.state.error = translate('location:permissionError');
      this.state.hasPermission = false;

      return {
        granted: false,
        canAskAgain: true,
        status: Location.PermissionStatus.UNDETERMINED,
      };
    }
  }

  /**
   * Check current permission status
   */
  public async checkPermissions(): Promise<LocationPermissionStatus> {
    try {
      const foregroundPermission =
        await Location.getForegroundPermissionsAsync();
      const backgroundPermission =
        await Location.getBackgroundPermissionsAsync();

      const granted =
        foregroundPermission.granted && backgroundPermission.granted;
      this.state.hasPermission = granted;

      return {
        granted,
        canAskAgain:
          foregroundPermission.canAskAgain && backgroundPermission.canAskAgain,
        status: granted
          ? Location.PermissionStatus.GRANTED
          : foregroundPermission.status,
      };
    } catch (error) {
      console.error('Error checking location permissions:', error);
      return {
        granted: false,
        canAskAgain: true,
        status: Location.PermissionStatus.UNDETERMINED,
      };
    }
  }

  /**
   * Start location tracking
   */
  public async startTracking(): Promise<boolean> {
    try {
      if (!this.state.hasPermission) {
        const permissionResult = await this.requestPermissions();
        if (!permissionResult.granted) {
          return false;
        }
      }

      // Check if task is already running
      const isTaskRunning =
        await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
      if (isTaskRunning) {
        console.log('Location tracking already running');
        this.state.isTracking = true;
        return true;
      }

      // Start background location tracking
      await Location.startLocationUpdatesAsync(
        LOCATION_TASK_NAME,
        LOCATION_CONFIG
      );

      this.state.isTracking = true;
      this.state.error = null;

      console.log('Location tracking started successfully');

      Toast.show({
        type: 'success',
        text1: translate('location:tracking.started'),
        text2: translate('location:trackingStartedMessage'),
      });

      return true;
    } catch (error) {
      console.error('Error starting location tracking:', error);
      this.state.error = translate('location:trackingStartError');
      this.state.isTracking = false;

      Toast.show({
        type: 'error',
        text1: translate('location:trackingStartError'),
        text2: error instanceof Error ? error.message : 'Unknown error',
      });

      return false;
    }
  }

  /**
   * Stop location tracking
   */
  public async stopTracking(): Promise<void> {
    try {
      const isTaskRunning =
        await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
      if (isTaskRunning) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      }

      this.state.isTracking = false;
      console.log('Location tracking stopped');

      Toast.show({
        type: 'info',
        text1: translate('location:tracking.stopped'),
      });
    } catch (error) {
      console.error('Error stopping location tracking:', error);
      this.state.error = translate('location:trackingStopError');
    }
  }

  /**
   * Get current location once
   */
  public async getCurrentLocation(): Promise<Location.LocationObject | null> {
    try {
      if (!this.state.hasPermission) {
        const permissionResult = await this.requestPermissions();
        if (!permissionResult.granted) {
          return null;
        }
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      this.state.lastLocation = location;
      await this.sendLocationToBackend(location);

      return location;
    } catch (error) {
      console.error('Error getting current location:', error);
      this.state.error = translate('location:getCurrentLocationError');
      return null;
    }
  }

  /**
   * Send location data to backend
   */
  private async sendLocationToBackend(
    location: Location.LocationObject
  ): Promise<void> {
    try {
      // Get current visibility setting from Redux store
      const state = store.getState();
      const isVisible = state.location.isVisible;

      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        altitude: location.coords.altitude || undefined,
        accuracy: location.coords.accuracy || undefined,
        visibleToFriends: isVisible,
      };

      console.log('Location sent:', locationData);

      // Use RTK Query mutation to send location
      await store
        .dispatch(locationApi.endpoints.updateLocation.initiate(locationData))
        .unwrap();

      console.log('Location sent to backend successfully');
    } catch (error) {
      console.error('Error sending location to backend:', error);
      // Don't show toast for background errors to avoid spam
    }
  }

  /**
   * Get current service state
   */
  public getState(): LocationServiceState {
    return { ...this.state };
  }

  /**
   * Check if location tracking is supported
   */
  public async isLocationAvailable(): Promise<boolean> {
    return await Location.hasServicesEnabledAsync();
  }

  /**
   * Update location visibility setting
   */
  public async updateLocationVisibility(visible: boolean): Promise<boolean> {
    try {
      await store
        .dispatch(
          locationApi.endpoints.updateLocationVisibility.initiate({ visible })
        )
        .unwrap();

      Toast.show({
        type: 'success',
        text1: visible
          ? translate('location:visibility.visible')
          : translate('location:visibility.hidden'),
      });

      return true;
    } catch (error) {
      console.error('Error updating location visibility:', error);
      Toast.show({
        type: 'error',
        text1: translate('location:visibility.error'),
      });
      return false;
    }
  }
}

// Export singleton instance
export const locationService = LocationService.getInstance();
