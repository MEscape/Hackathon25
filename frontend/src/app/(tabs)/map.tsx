import React, { useMemo, useState, useRef } from 'react';
import {View, Dimensions, ViewStyle, PanResponder, TextStyle} from 'react-native';
import { Image } from 'expo-image';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Icon, PressableIcon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

const TILE_SIZE = 256;
const ZOOM = 13;
const INITIAL_LAT = 52.52; // Berlin
const INITIAL_LON = 13.405; // Berlin
const OSM_SUBDOMAINS = ['a', 'b', 'c'];
const TILE_HEADERS = {
  'User-Agent': 'SafeNet/1.0 (hackathon demo; contact: dev@example.com)',
  Referer: 'https://safenet.local',
};

function latLonToTile(lat: number, lon: number, zoom: number) {
  const latRad = (lat * Math.PI) / 180;
  const n = Math.pow(2, zoom);
  const xTile = ((lon + 180) / 360) * n;
  const yTile = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  return { xTile, yTile };
}

export default function MapScreen() {
  const { themed, theme } = useAppTheme();
  const { width } = Dimensions.get('window');
  const [zoom, setZoom] = useState(ZOOM);
  const [center, setCenter] = useState({ lat: INITIAL_LAT, lon: INITIAL_LON });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  // Calculate display size to fit 3 tiles across (viewport), maintaining aspect ratio
  const maxWidth = width - theme.spacing.lg * 2;
  const displayTileSize = Math.floor(Math.min(maxWidth / 3, TILE_SIZE));
  const viewportSize = displayTileSize * 3;

  const panRef = useRef({ 
    startLat: 0, 
    startLon: 0, 
    startOffsetX: 0, 
    startOffsetY: 0,
    centerTileX: 0,
    centerTileY: 0
  });

  const centerTile = useMemo(() => latLonToTile(center.lat, center.lon, zoom), [center, zoom]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        panRef.current = { 
          startLat: center.lat, 
          startLon: center.lon,
          startOffsetX: offset.x,
          startOffsetY: offset.y,
          centerTileX: centerTile.xTile,
          centerTileY: centerTile.yTile
        };
      },
      onPanResponderMove: (_, gestureState) => {
        const { dx, dy } = gestureState;
        
        // Update offset for smooth dragging
        const newOffsetX = panRef.current.startOffsetX + dx;
        const newOffsetY = panRef.current.startOffsetY + dy;
        
        setOffset({ x: newOffsetX, y: newOffsetY });
        
        // Calculate tile shifts
        const tileShiftX = Math.floor(newOffsetX / displayTileSize);
        const tileShiftY = Math.floor(newOffsetY / displayTileSize);
        
        // Only update center when we've moved enough to shift tiles
        if (tileShiftX !== 0 || tileShiftY !== 0) {
          const n = Math.pow(2, zoom);
          const newCenterTileX = panRef.current.centerTileX - tileShiftX;
          const newCenterTileY = panRef.current.centerTileY - tileShiftY;
          
          // Wrap X
          const wrappedX = ((newCenterTileX % n) + n) % n;
          // Clamp Y
          const clampedY = Math.max(0, Math.min(n - 1, newCenterTileY));
          
          const lon = (wrappedX / n) * 360 - 180;
          const latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * clampedY) / n)));
          const lat = (latRad * 180) / Math.PI;
          
          setCenter({ lat, lon });
          setOffset({ 
            x: newOffsetX % displayTileSize, 
            y: newOffsetY % displayTileSize 
          });
          
          panRef.current.centerTileX = newCenterTileX;
          panRef.current.centerTileY = newCenterTileY;
          panRef.current.startOffsetX = newOffsetX % displayTileSize;
          panRef.current.startOffsetY = newOffsetY % displayTileSize;
        }
      },
      onPanResponderRelease: () => {
        // Keep the offset for smooth continuation
      },
    })
  ).current;

  const tiles = useMemo(() => {
    const items: { x: number; y: number; url: string; key: string }[] = [];
    const maxTile = Math.pow(2, zoom) - 1;
    const baseTileX = Math.floor(centerTile.xTile);
    const baseTileY = Math.floor(centerTile.yTile);
    
    // Render 5x5 grid for smooth panning (2 tiles in each direction)
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        let x = baseTileX + dx;
        const y = baseTileY + dy;
        
        // Wrap X coordinate for continuous horizontal scrolling
        const wrappedX = ((x % Math.pow(2, zoom)) + Math.pow(2, zoom)) % Math.pow(2, zoom);
        
        // Skip tiles outside valid Y range
        if (y < 0 || y > maxTile) continue;
        
        const sub = OSM_SUBDOMAINS[(wrappedX + y) % OSM_SUBDOMAINS.length];
        const url = `https://${sub}.tile.openstreetmap.org/${zoom}/${wrappedX}/${y}.png`;
        items.push({ 
          x: wrappedX, 
          y, 
          url, 
          key: `${wrappedX}-${y}-${zoom}` 
        });
      }
    }
    return items;
  }, [centerTile, zoom]);

  const handleResetView = () => {
    setCenter({ lat: INITIAL_LAT, lon: INITIAL_LON });
    setZoom(ZOOM);
    setOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoom(z => Math.min(18, z + 1));
    setOffset({ x: 0, y: 0 });
  };

  const handleZoomOut = () => {
    setZoom(z => Math.max(3, z - 1));
    setOffset({ x: 0, y: 0 });
  };

  return (
    <Screen preset="fixed" style={themed($container)}>
      <View style={themed($header)}>
        <Text preset="heading" weight="bold" tx="map:title" />
        <Text preset="formHelper">
          {`Lat: ${center.lat.toFixed(4)}, Lon: ${center.lon.toFixed(4)} | Zoom ${zoom}`}
        </Text>
      </View>

      <View style={[themed($mapContainer), { width: viewportSize, height: viewportSize }]}>
        <View 
          {...panResponder.panHandlers}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Tile grid - 5x5 tiles rendered, but only 3x3 visible */}
          <View style={{
            position: 'absolute',
            left: -displayTileSize * 2 + offset.x,
            top: -displayTileSize * 2 + offset.y,
            width: displayTileSize * 5,
            height: displayTileSize * 5,
          }}>
            {tiles.map((tile, idx) => {
              const baseTileX = Math.floor(centerTile.xTile);
              const baseTileY = Math.floor(centerTile.yTile);
              const gridX = tile.x - baseTileX + 2;
              const gridY = tile.y - baseTileY + 2;
              
              // Handle wrapping for display
              let displayGridX = gridX;
              if (gridX < 0) displayGridX = gridX + Math.pow(2, zoom);
              if (gridX >= Math.pow(2, zoom)) displayGridX = gridX - Math.pow(2, zoom);
              
              return (
                <Image
                  key={tile.key}
                  source={{ uri: tile.url, headers: TILE_HEADERS }}
                  style={{
                    position: 'absolute',
                    left: displayGridX * displayTileSize,
                    top: gridY * displayTileSize,
                    width: displayTileSize,
                    height: displayTileSize,
                  }}
                  contentFit="cover"
                  cachePolicy="disk"
                />
              );
            })}
          </View>
        </View>

        {/* Center marker overlay */}
        <View pointerEvents="none" style={themed($markerWrapper)}>
          <View style={themed($marker)}>
            <Icon icon="location" size={18} color={theme.colors.background} />
          </View>
        </View>

        {/* Coordinate badge */}
        <View pointerEvents="none" style={themed($badge)}>
          <Text preset="formHelper" text={`Lat ${center.lat.toFixed(4)} · Lon ${center.lon.toFixed(4)}`} />
        </View>

        {/* Controls */}
        <View style={themed($controls)}>
          <PressableIcon icon="add" onPress={handleZoomIn} containerStyle={themed($controlButton)} />
          <PressableIcon icon="remove" onPress={handleZoomOut} containerStyle={themed($controlButton)} />
          <PressableIcon icon="navigate" onPress={handleResetView} containerStyle={themed($controlButton)} />
        </View>
      </View>

      <Text preset="formHelper" style={themed($disclaimer)}>
        {"Map tiles © OpenStreetMap contributors • Drag to pan"}
      </Text>
    </Screen>
  );
}

const $container: ThemedStyle<ViewStyle> = theme => ({
  flex: 1,
  backgroundColor: theme.colors.background,
});

const $header: ThemedStyle<ViewStyle> = theme => ({
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.md,
  paddingBottom: theme.spacing.sm,
  gap: theme.spacing.xxs,
});

const $mapContainer: ThemedStyle<ViewStyle> = theme => ({
  marginHorizontal: theme.spacing.lg,
  borderRadius: 16,
  overflow: 'hidden',
  borderColor: theme.colors.border,
  borderWidth: 1,
  backgroundColor: theme.isDark ? '#0d0d0d' : '#fafafa',
  alignSelf: 'center',
  position: 'relative',
});

const $controls: ThemedStyle<ViewStyle> = theme => ({
  position: 'absolute',
  top: theme.spacing.sm,
  right: theme.spacing.sm,
  gap: theme.spacing.xs,
  zIndex: 10,
});

const $controlButton: ThemedStyle<ViewStyle> = theme => ({
  width: 36,
  height: 36,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.background + 'CC',
  borderColor: theme.colors.border,
  borderWidth: 1,
});

const $badge: ThemedStyle<ViewStyle> = theme => ({
  position: 'absolute',
  top: theme.spacing.sm,
  left: theme.spacing.sm,
  paddingHorizontal: theme.spacing.sm,
  paddingVertical: theme.spacing.xxs,
  borderRadius: 12,
  backgroundColor: theme.colors.background + 'CC',
  borderColor: theme.colors.border,
  borderWidth: 1,
  zIndex: 10,
});

const $markerWrapper: ThemedStyle<ViewStyle> = () => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 5,
});

const $marker: ThemedStyle<ViewStyle> = theme => ({
  width: 28,
  height: 28,
  borderRadius: 14,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.tint,
  shadowColor: '#000',
  shadowOpacity: theme.isDark ? 0.3 : 0.15,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 3,
  elevation: 3,
});

const $disclaimer: ThemedStyle<TextStyle> = theme => ({
  paddingHorizontal: theme.spacing.lg,
  paddingVertical: theme.spacing.sm,
});