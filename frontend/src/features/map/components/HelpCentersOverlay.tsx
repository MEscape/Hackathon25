import React from 'react';
import { View, ViewStyle, TouchableOpacity } from 'react-native';
import { Icon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';
import { latLonToTile } from '../utils/map';
import type { HelpCenterType, HelpCenterResponse, HelpCenterItem } from '@/store/api/helpCentersApi';

type HelpCenter = HelpCenterItem & {
    id: string;
};

interface HelpCentersOverlayProps {
    center: { lat: number; lon: number };
    zoom: number;
    offset: { x: number; y: number };
    displayTileSize: number;
    bufferTiles: number;
    viewportSize: number;
    helpCenters: Record<HelpCenterType, HelpCenterResponse>;
    enabledTypes: HelpCenterType[];
    onHelpCenterPress?: (helpCenter: HelpCenter & { type: HelpCenterType }) => void;
}

const HELP_CENTER_CONFIG: Record<HelpCenterType, { icon: string; color: string }> = {
    hospital: { icon: 'medical', color: '#EF4444' },
    police: { icon: 'shield', color: '#3B82F6' },
    fire_station: { icon: 'flame', color: '#F59E0B' },
    pharmacy: { icon: 'medkit', color: '#10B981' },
    shelter: { icon: 'home', color: '#8B5CF6' },
};

export function HelpCentersOverlay({
    center,
    zoom,
    offset,
    displayTileSize,
    viewportSize,
    helpCenters,
    enabledTypes,
    onHelpCenterPress
}: HelpCentersOverlayProps) {
    const { themed } = useAppTheme();

    const coordsToPixel = (lat: number, lon: number) => {
        const centerTile = latLonToTile(center.lat, center.lon, zoom);
        const targetTile = latLonToTile(lat, lon, zoom);

        const tileOffsetX = targetTile.xTile - centerTile.xTile;
        const tileOffsetY = targetTile.yTile - centerTile.yTile;

        const pixelX = tileOffsetX * displayTileSize + offset.x;
        const pixelY = tileOffsetY * displayTileSize + offset.y;

        const centerX = viewportSize / 2;
        const centerY = viewportSize / 2;

        return {
            x: centerX + pixelX,
            y: centerY + pixelY
        };
    };

    const isPositionVisible = (pixelPos: { x: number; y: number }) => {
        const margin = 40;
        return pixelPos.x >= -margin && 
               pixelPos.x <= viewportSize + margin &&
               pixelPos.y >= -margin && 
               pixelPos.y <= viewportSize + margin;
    };

    const renderHelpCenters = (): React.ReactElement[] => {
        const markers: React.ReactElement[] = [];

        enabledTypes.forEach((type) => {
            const response = helpCenters[type];
            const centers = response?.items || [];
            const config = HELP_CENTER_CONFIG[type];

            centers.forEach((helpCenter: HelpCenterItem) => {
                const pixelPos = coordsToPixel(helpCenter.lat, helpCenter.lon);

                if (!isPositionVisible(pixelPos)) return;

                const uniqueKey = `${type}-${helpCenter.lat}-${helpCenter.lon}`;
                
                markers.push(
                    <TouchableOpacity
                        key={uniqueKey}
                        style={[
                            themed($helpCenterMarker),
                            {
                                left: pixelPos.x - 16,
                                top: pixelPos.y - 16,
                                backgroundColor: config.color,
                            }
                        ]}
                        onPress={() => onHelpCenterPress?.({ ...helpCenter, id: uniqueKey, type })}
                        activeOpacity={0.7}
                    >
                        <Icon
                            icon={config.icon as any}
                            size={16}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>
                );
            });
        });

        return markers;
    };

    return (
        <View style={{ 
            position: 'absolute', 
            width: viewportSize, 
            height: viewportSize,
            pointerEvents: 'box-none'
        }}>
            {renderHelpCenters()}
        </View>
    );
}

const $helpCenterMarker: ThemedStyle<ViewStyle> = (theme) => ({
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: theme.colors.background,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    zIndex: 3,
});