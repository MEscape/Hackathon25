import React, { useMemo } from 'react';
import { View, Dimensions, ViewStyle } from 'react-native';
import { Screen } from '@/components/Screen';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';
import { useLocation } from '@/hooks/useLocation';
import { useGetFriendsLocationsQuery } from '@/store/api/locationApi';

// Hooks
import { useMapState } from '../hooks/useMapState';
import { useMapTiles } from '../hooks/useMapTiles';
import { useMapPan } from '../hooks/useMapPan';
import { useHelpCenters } from '../hooks/useHelpCenters';

// Components
import { MapTileGrid } from '../components/MapTileGrid';
import { MapControls } from '../components/MapControls';
import { MapInfoBadge } from '../components/MapInfoBadge';
import { MapOverlay } from '../components/MapOverlay';
import { HelpCentersOverlay } from '../components/HelpCentersOverlay';
import { MapStatusBar } from '../components/MapStatusBar';
import { MapLegend } from '../components/MapLegend';

// Config
import {MAP_CONFIG, TILE_HEADERS} from "@/config/config.map";

export default function MapScreen() {
  const { themed, theme } = useAppTheme();
  const { width, height } = Dimensions.get('window');

  // Location data
  const { hasPermission, isTracking, isVisible, currentLocation } = useLocation();
  const { data: friendsLocations, isLoading: friendsLoading } = useGetFriendsLocationsQuery(
      undefined,
      { pollingInterval: 30000 }
  );

  // Map state
  const {
    center,
    zoom,
    offset,
    setCenter,
    setOffset,
    zoomIn,
    zoomOut,
    resetView,
    canZoomIn,
    canZoomOut,
  } = useMapState(currentLocation);

  // Calculate viewport dimensions
  const viewport = useMemo(() => {
    const statusBarHeight = 60;
    const bottomPadding = 100;
    const availableHeight = height - statusBarHeight - bottomPadding;
    const availableWidth = width - theme.spacing.md * 2;
    const mapSize = Math.min(availableWidth, availableHeight);
    const tileSize = Math.floor(mapSize / MAP_CONFIG.VISIBLE_TILES);
    const viewportSize = tileSize * MAP_CONFIG.VISIBLE_TILES;

    return {
      size: viewportSize,
      tileSize,
    };
  }, [width, height, theme.spacing.md]);

  // Map data
  const tiles = useMapTiles(center, zoom, MAP_CONFIG.BUFFER_TILES);

  const userLocationCoords = currentLocation
      ? { lat: currentLocation.coords.latitude, lon: currentLocation.coords.longitude }
      : null;

  const { helpCenters, enabledTypes, isLoading: helpCentersLoading } = useHelpCenters({
    center,
    zoom,
    userLocation: userLocationCoords,
  });

  // Pan handling
  const panResponder = useMapPan({
    center,
    zoom,
    offset,
    displayTileSize: viewport.tileSize,
    onCenterChange: setCenter,
    onOffsetChange: setOffset,
  });

  return (
      <Screen preset="fixed" style={themed($container)}>
        {/* Map viewport */}
        <View
            style={[
              themed($mapViewport),
              {
                width: viewport.size,
                height: viewport.size,
              },
            ]}
        >
          {/* Tile layer with pan gestures */}
          <View {...panResponder.panHandlers} style={{ flex: 1 }}>
            <MapTileGrid
                tiles={tiles}
                displayTileSize={viewport.tileSize}
                bufferTiles={MAP_CONFIG.BUFFER_TILES}
                offset={offset}
                headers={TILE_HEADERS}
            />
          </View>

          {/* User & friends markers */}
          <MapOverlay
              center={center}
              zoom={zoom}
              offset={offset}
              displayTileSize={viewport.tileSize}
              bufferTiles={MAP_CONFIG.BUFFER_TILES}
              viewportSize={viewport.size}
              userLocation={currentLocation}
              friendsLocations={friendsLocations || []}
              onFriendPress={(friend) => console.log('Friend:', friend)}
          />

          {/* Help centers markers */}
          <HelpCentersOverlay
              center={center}
              zoom={zoom}
              offset={offset}
              displayTileSize={viewport.tileSize}
              bufferTiles={MAP_CONFIG.BUFFER_TILES}
              viewportSize={viewport.size}
              helpCenters={helpCenters}
              enabledTypes={enabledTypes}
              onHelpCenterPress={(center) => console.log('Help center:', center)}
          />

          {/* Map controls */}
          <MapControls
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onReset={() => resetView(currentLocation)}
              canZoomIn={canZoomIn}
              canZoomOut={canZoomOut}
          />

          {/* Coordinate info */}
          <MapInfoBadge lat={center.lat} lon={center.lon} zoom={zoom} />

          {/* Legend */}
          <MapLegend enabledTypes={enabledTypes} />
        </View>

        {/* Status bar */}
        <MapStatusBar
            hasPermission={hasPermission}
            isTracking={isTracking}
            isVisible={isVisible}
            friendsCount={friendsLocations?.length || 0}
            helpCentersCount={Object.values(helpCenters).reduce(
                (acc, response) => acc + (response?.items?.length || 0),
                0
            )}
            isLoadingFriends={friendsLoading}
            isLoadingHelpCenters={helpCentersLoading}
        />
      </Screen>
  );
}

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  alignItems: 'center',
  justifyContent: 'center',
});

const $mapViewport: ThemedStyle<ViewStyle> = (theme) => ({
  borderRadius: 20,
  overflow: 'hidden',
  borderWidth: 2,
  borderColor: theme.colors.border,
  backgroundColor: theme.isDark ? '#0a0a0a' : '#f5f5f5',
  shadowColor: theme.colors.shadowColor,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: theme.isDark ? 0.4 : 0.15,
  shadowRadius: 12,
  elevation: 6,
});