// src/features/map/hooks/useMapState.ts
// Centralized state management for map interactions

import { useState, useCallback, useRef, useEffect } from 'react';

import * as Location from 'expo-location';

import { MAP_CONFIG } from '@/config/config.map';

export interface MapState {
  center: { lat: number; lon: number };
  zoom: number;
  offset: { x: number; y: number };
}

export interface MapActions {
  setCenter: (center: { lat: number; lon: number }) => void;
  setZoom: (zoom: number) => void;
  setOffset: (offset: { x: number; y: number }) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: (userLocation?: Location.LocationObject | null) => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
}

export function useMapState(userLocation?: Location.LocationObject | null) {
  const [center, setCenter] = useState<{ lat: number; lon: number }>(
    MAP_CONFIG.DEFAULT_CENTER
  );
  const [zoom, setZoom] = useState<number>(MAP_CONFIG.ZOOM.INITIAL);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const hasAutoCentered = useRef(false);

  // Auto-center on user location (once)
  useEffect(() => {
    if (userLocation && !hasAutoCentered.current) {
      setCenter({
        lat: userLocation.coords.latitude,
        lon: userLocation.coords.longitude,
      });
      hasAutoCentered.current = true;
    }
  }, [userLocation]);

  // Zoom controls
  const zoomIn = useCallback(() => {
    if (zoom < MAP_CONFIG.ZOOM.MAX) {
      setZoom(z => z + 1);
      setOffset({ x: 0, y: 0 });
    }
  }, [zoom]);

  const zoomOut = useCallback(() => {
    if (zoom > MAP_CONFIG.ZOOM.MIN) {
      setZoom(z => z - 1);
      setOffset({ x: 0, y: 0 });
    }
  }, [zoom]);

  const resetView = useCallback(
    (currentLocation?: Location.LocationObject | null) => {
      if (currentLocation) {
        setCenter({
          lat: currentLocation.coords.latitude,
          lon: currentLocation.coords.longitude,
        });
      } else {
        setCenter(MAP_CONFIG.DEFAULT_CENTER);
      }
      setZoom(MAP_CONFIG.ZOOM.INITIAL);
      setOffset({ x: 0, y: 0 });
    },
    []
  );

  return {
    // State
    center,
    zoom,
    offset,

    // Actions
    setCenter,
    setZoom,
    setOffset,
    zoomIn,
    zoomOut,
    resetView,
    canZoomIn: zoom < MAP_CONFIG.ZOOM.MAX,
    canZoomOut: zoom > MAP_CONFIG.ZOOM.MIN,
  };
}
