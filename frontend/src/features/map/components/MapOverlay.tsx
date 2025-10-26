import React from 'react';
import { View, ViewStyle, TouchableOpacity, TextStyle } from 'react-native';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';
import { latLonToTile } from '../utils/map';
import * as Location from 'expo-location';
import { UserLocationDto } from '@/store/api/locationApi';

interface MapOverlayProps {
    center: { lat: number; lon: number };
    zoom: number;
    offset: { x: number; y: number };
    displayTileSize: number;
    bufferTiles: number;
    viewportSize: number; // Add explicit viewport size
    userLocation?: Location.LocationObject | null;
    friendsLocations?: UserLocationDto[];
    onFriendPress?: (friend: UserLocationDto) => void;
}

export function MapOverlay({
    center,
    zoom,
    offset,
    displayTileSize,
    bufferTiles,
    viewportSize,
    userLocation,
    friendsLocations = [],
    onFriendPress
}: MapOverlayProps) {
    const { themed, theme } = useAppTheme();

    // Fixed: Convert lat/lon to pixel position relative to viewport
    const coordsToPixel = (lat: number, lon: number) => {
        const centerTile = latLonToTile(center.lat, center.lon, zoom);
        const targetTile = latLonToTile(lat, lon, zoom);

        // Calculate tile offset
        const tileOffsetX = targetTile.xTile - centerTile.xTile;
        const tileOffsetY = targetTile.yTile - centerTile.yTile;

        // Convert to pixels and add pan offset
        const pixelX = tileOffsetX * displayTileSize + offset.x;
        const pixelY = tileOffsetY * displayTileSize + offset.y;

        // Center in viewport
        const centerX = viewportSize / 2;
        const centerY = viewportSize / 2;

        return {
            x: centerX + pixelX,
            y: centerY + pixelY
        };
    };

    // Check if visible with proper viewport bounds
    const isPositionVisible = (pixelPos: { x: number; y: number }) => {
        const margin = 40; // Buffer for partial visibility
        return pixelPos.x >= -margin && 
               pixelPos.x <= viewportSize + margin &&
               pixelPos.y >= -margin && 
               pixelPos.y <= viewportSize + margin;
    };

    return (
        <View style={{ 
            position: 'absolute', 
            width: viewportSize, 
            height: viewportSize,
            pointerEvents: 'box-none' // Allow touches to pass through
        }}>
            {/* User location marker */}
            {userLocation && (() => {
                const userPixelPos = coordsToPixel(
                    userLocation.coords.latitude,
                    userLocation.coords.longitude
                );

                if (!isPositionVisible(userPixelPos)) return null;

                return (
                    <View
                        pointerEvents="none"
                        style={[
                            themed($markerWrapper),
                            {
                                left: userPixelPos.x - 16,
                                top: userPixelPos.y - 16,
                            }
                        ]}
                    >
                        <View style={themed($userMarker)}>
                            <Icon icon="location" size={20} color={theme.colors.background} />
                        </View>
                        <View style={themed($pulseOuter)} />
                    </View>
                );
            })()}

            {/* Friends location markers */}
            {friendsLocations.map((friend) => {
                const friendPixelPos = coordsToPixel(friend.latitude, friend.longitude);

                if (!isPositionVisible(friendPixelPos)) return null;

                return (
                    <TouchableOpacity
                        key={`friend-${friend.id}-${friend.userId}`}
                        style={[
                            themed($markerWrapper),
                            {
                                left: friendPixelPos.x - 16,
                                top: friendPixelPos.y - 16,
                            }
                        ]}
                        onPress={() => onFriendPress?.(friend)}
                        activeOpacity={0.7}
                    >
                        <View style={themed($friendMarker)}>
                            <Icon icon="person" size={18} color={theme.colors.background} />
                        </View>
                        <View style={themed($friendLabel)}>
                            <Text style={themed($friendLabelText)}>
                                {friend.userId.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const $markerWrapper: ThemedStyle<ViewStyle> = () => ({
    position: 'absolute',
    width: 32,
    height: 32,
    zIndex: 5,
});

const $userMarker: ThemedStyle<ViewStyle> = (theme) => ({
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.tint,
    borderWidth: 3,
    borderColor: theme.colors.background,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
});

const $pulseOuter: ThemedStyle<ViewStyle> = (theme) => ({
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.tint + '30',
    opacity: 0.3,
});

const $friendMarker: ThemedStyle<ViewStyle> = (theme) => ({
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: theme.colors.background,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
});

const $friendLabel: ThemedStyle<ViewStyle> = (theme) => ({
    position: 'absolute',
    top: -8,
    right: -8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: theme.colors.tint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background,
});

const $friendLabelText: ThemedStyle<TextStyle> = (theme) => ({
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.background,
});