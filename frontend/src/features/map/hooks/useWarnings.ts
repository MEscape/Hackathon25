import { useMemo } from 'react';

import { useGetWarningsNearbyQuery } from '../api/warningsApi';
import { Warning } from '../types/warnings';

interface UseWarningsProps {
  center: { lat: number; lon: number };
  radiusKm?: number;
  useMockData?: boolean;
}

/**
 * Hook to fetch warnings data
 * Set useMockData=true to use mock data for testing
 * Set useMockData=false to use real API data
 */
export function useWarnings({
  center,
  radiusKm = 10,
  useMockData = true,
}: UseWarningsProps) {
  // Mock data for testing
  const mockWarnings: Warning[] = useMemo(() => {
    if (!useMockData) return [];

    const warnings: Warning[] = [];
    const baseId = Date.now();

    const severities: ('LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL')[] = [
      'LOW',
      'MEDIUM',
      'HIGH',
      'CRITICAL',
    ];
    const types = ['flood', 'storm', 'fire', 'earthquake', 'traffic'];

    // Generate 30 warnings scattered around the center
    for (let i = 0; i < 30; i++) {
      // Random offset within radius
      const latOffset = (Math.random() - 0.5) * 0.15;
      const lonOffset = (Math.random() - 0.5) * 0.15;

      warnings.push({
        id: `mock-${baseId}-${i}`,
        lat: center.lat + latOffset,
        lon: center.lon + lonOffset,
        severity: severities[Math.floor(Math.random() * severities.length)],
        type: types[Math.floor(Math.random() * types.length)],
        description: `Mock warning ${i + 1}`,
        timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        radius: 500 + Math.random() * 1500,
        source: 'mock-data',
      });
    }

    return warnings;
  }, [center.lat, center.lon, useMockData]);

  // Real API call
  const { data, isLoading, error } = useGetWarningsNearbyQuery(
    {
      lat: center.lat,
      lon: center.lon,
      radiusKm,
    },
    {
      skip: useMockData,
    }
  );

  if (useMockData) {
    return {
      warnings: mockWarnings,
      isLoading: false,
      error: null,
    };
  }

  // Return real API data
  return {
    warnings: data || [],
    isLoading,
    error,
  };
}
