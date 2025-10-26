import { useMemo } from 'react';

import { useGetMultipleHelpCentersQuery } from '@/store/api/helpCentersApi';
import type {
  HelpCenterType,
  HelpCenterResponse,
} from '@/store/api/helpCentersApi';

interface UseHelpCentersParams {
  center: { lat: number; lon: number };
  zoom: number;
  userLocation?: { lat: number; lon: number } | null;
}

interface UseHelpCentersReturn {
  helpCenters: Record<HelpCenterType, HelpCenterResponse>;
  enabledTypes: HelpCenterType[];
  radius: number;
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

export const useHelpCenters = ({
  center,
  zoom,
  userLocation,
}: UseHelpCentersParams): UseHelpCentersReturn => {
  // Calculate search radius based on zoom level
  const radius = useMemo((): number => {
    // Higher zoom = smaller radius, lower zoom = larger radius
    const baseRadius = 5000; // 5km base
    const zoomFactor = Math.max(0.1, Math.min(2, (20 - zoom) / 10));
    return Math.round(baseRadius * zoomFactor);
  }, [zoom]);

  // Determine which help center types to enable based on zoom level
  const enabledTypes = useMemo((): HelpCenterType[] => {
    if (zoom >= 16) {
      // High zoom: show all types
      return ['hospital', 'police', 'fire_station', 'pharmacy', 'shelter'];
    } else if (zoom >= 14) {
      // Medium zoom: show essential services
      return ['hospital', 'police', 'fire_station'];
    } else if (zoom >= 12) {
      // Lower zoom: show only critical services
      return ['hospital', 'police'];
    } else {
      // Very low zoom: show only hospitals
      return ['hospital'];
    }
  }, [zoom]);

  // Use user location if available, otherwise use map center
  const searchLocation = userLocation || center;

  const {
    data: helpCenters,
    isLoading,
    error,
    refetch,
  } = useGetMultipleHelpCentersQuery({
    lat: searchLocation.lat,
    lon: searchLocation.lon,
    radius,
    types: enabledTypes,
  });

  return {
    helpCenters:
      helpCenters || ({} as Record<HelpCenterType, HelpCenterResponse>),
    enabledTypes,
    radius,
    isLoading,
    error,
    refetch,
  };
};
