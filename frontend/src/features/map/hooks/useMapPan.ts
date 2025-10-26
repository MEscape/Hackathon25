import { useRef, useMemo } from 'react';

import { PanResponder } from 'react-native';

import { tileToLatLon, latLonToTile } from '../utils/map';

interface UseMapPanProps {
  center: { lat: number; lon: number };
  zoom: number;
  offset: { x: number; y: number };
  displayTileSize: number;
  onCenterChange: (center: { lat: number; lon: number }) => void;
  onOffsetChange: (offset: { x: number; y: number }) => void;
}

export function useMapPan({
  center,
  zoom,
  offset,
  displayTileSize,
  onCenterChange,
  onOffsetChange,
}: UseMapPanProps) {
  const panStateRef = useRef({
    startOffsetX: 0,
    startOffsetY: 0,
    baseTileX: 0,
    baseTileY: 0,
    isDragging: false,
  });

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: () => {
          const centerTile = latLonToTile(center.lat, center.lon, zoom);
          panStateRef.current = {
            startOffsetX: offset.x,
            startOffsetY: offset.y,
            baseTileX: Math.floor(centerTile.xTile),
            baseTileY: Math.floor(centerTile.yTile),
            isDragging: true,
          };
        },

        onPanResponderMove: (_, gestureState) => {
          if (!panStateRef.current.isDragging) return;

          const { dx, dy } = gestureState;
          const newOffsetX = panStateRef.current.startOffsetX + dx;
          const newOffsetY = panStateRef.current.startOffsetY + dy;

          // Use a smaller threshold for more responsive tile shifting
          const threshold = displayTileSize * 0.8;

          // Calculate how many tiles we should shift
          const tileShiftX = Math.floor(
            (newOffsetX + (newOffsetX > 0 ? threshold : -threshold)) /
              displayTileSize
          );
          const tileShiftY = Math.floor(
            (newOffsetY + (newOffsetY > 0 ? threshold : -threshold)) /
              displayTileSize
          );

          if (tileShiftX !== 0 || tileShiftY !== 0) {
            const n = Math.pow(2, zoom);
            const newCenterTileX = panStateRef.current.baseTileX - tileShiftX;
            const newCenterTileY = panStateRef.current.baseTileY - tileShiftY;

            // Wrap X coordinate for seamless horizontal scrolling, clamp Y to valid range
            const wrappedX = ((newCenterTileX % n) + n) % n;
            const clampedY = Math.max(0, Math.min(n - 1, newCenterTileY));

            const newCenter = tileToLatLon(wrappedX, clampedY, zoom);
            onCenterChange(newCenter);

            // Calculate remainder offset after tile shift
            const remainderX = newOffsetX - tileShiftX * displayTileSize;
            const remainderY = newOffsetY - tileShiftY * displayTileSize;
            onOffsetChange({ x: remainderX, y: remainderY });

            // Update reference state for next calculation
            panStateRef.current.baseTileX = wrappedX;
            panStateRef.current.baseTileY = clampedY;
            panStateRef.current.startOffsetX = remainderX;
            panStateRef.current.startOffsetY = remainderY;
          } else {
            // Apply smooth offset update without changing tiles
            onOffsetChange({ x: newOffsetX, y: newOffsetY });
          }
        },

        onPanResponderRelease: () => {
          panStateRef.current.isDragging = false;
        },
      }),
    [center, zoom, offset, displayTileSize, onCenterChange, onOffsetChange]
  );

  return panResponder;
}
