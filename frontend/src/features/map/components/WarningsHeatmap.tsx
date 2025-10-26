import React, { JSX, useMemo } from 'react';

import { View } from 'react-native';

import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

import {
  DEFAULT_HEATMAP_CONFIG,
  getScaledRadius,
  getScaledIntensity,
} from '../config/heatmap';
import { Warning } from '../types/warnings';
import { latLonToTile } from '../utils/map';

interface WarningsHeatmapProps {
  warnings: Warning[];
  zoom: number;
  center: { lat: number; lon: number };
  offset: { x: number; y: number };
  displayTileSize: number;
  viewportSize: number;
}

interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  radius: number;
}

// Heat intensity colors for authentic heatmap look
const HEAT_COLORS = {
  LOW: ['#0000FF', '#00FFFF', '#00FF00', '#FFFF00'], // Blue to Yellow
  MEDIUM: ['#00FFFF', '#00FF00', '#FFFF00', '#FF8000'], // Cyan to Orange
  HIGH: ['#00FF00', '#FFFF00', '#FF8000', '#FF4000'], // Green to Red-Orange
  CRITICAL: ['#FFFF00', '#FF8000', '#FF4000', '#FF0000'], // Yellow to Red
};

export function WarningsHeatmap({
  warnings,
  zoom,
  center,
  offset,
  displayTileSize,
  viewportSize,
}: WarningsHeatmapProps) {
  // Convert warnings to screen coordinates with intensity
  const heatmapPoints = useMemo((): HeatmapPoint[] => {
    if (!warnings || warnings.length === 0) return [];

    const centerTile = latLonToTile(center.lat, center.lon, zoom);
    const centerX = viewportSize / 2;
    const centerY = viewportSize / 2;

    return warnings
      .map(warning => {
        // Convert warning coordinates to screen position
        const targetTile = latLonToTile(warning.lat, warning.lon, zoom);

        const tileOffsetX = targetTile.xTile - centerTile.xTile;
        const tileOffsetY = targetTile.yTile - centerTile.yTile;

        const pixelX = tileOffsetX * displayTileSize + offset.x;
        const pixelY = tileOffsetY * displayTileSize + offset.y;

        const screenX = centerX + pixelX;
        const screenY = centerY + pixelY;

        // Get config for this severity level
        const severityKey =
          warning.severity.toLowerCase() as keyof typeof DEFAULT_HEATMAP_CONFIG;
        const config = DEFAULT_HEATMAP_CONFIG[severityKey];

        // Calculate intensity and radius based on severity and zoom
        const baseIntensity = config.intensity;
        const scaledIntensity = getScaledIntensity(baseIntensity, zoom);
        const scaledRadius = getScaledRadius(config.radius, zoom);

        return {
          x: screenX,
          y: screenY,
          intensity: scaledIntensity,
          severity: warning.severity,
          radius: scaledRadius,
        };
      })
      .filter(point => {
        // Only render points that are visible or close to the viewport
        const margin = 200; // Extra margin for smooth transitions
        return (
          point.x >= -margin &&
          point.x <= viewportSize + margin &&
          point.y >= -margin &&
          point.y <= viewportSize + margin
        );
      });
  }, [warnings, zoom, center, offset, displayTileSize, viewportSize]);

  // Create gradient definitions for each heat point with multiple layers
  const gradientDefs = useMemo(() => {
    const gradients: JSX.Element[] = [];

    heatmapPoints.forEach((point, index) => {
      const colors = HEAT_COLORS[point.severity];

      // Create multiple gradient layers for better heat distribution
      // Core gradient (intense center)
      const coreGradientId = `heatCore-${index}`;
      gradients.push(
        <RadialGradient
          key={coreGradientId}
          id={coreGradientId}
          cx="50%"
          cy="50%"
          r="30%"
        >
          <Stop
            offset="0%"
            stopColor={colors[3]}
            stopOpacity={point.intensity * 0.9}
          />
          <Stop
            offset="50%"
            stopColor={colors[2]}
            stopOpacity={point.intensity * 0.7}
          />
          <Stop
            offset="100%"
            stopColor={colors[1]}
            stopOpacity={point.intensity * 0.4}
          />
        </RadialGradient>
      );

      // Mid gradient (medium spread)
      const midGradientId = `heatMid-${index}`;
      gradients.push(
        <RadialGradient
          key={midGradientId}
          id={midGradientId}
          cx="50%"
          cy="50%"
          r="70%"
        >
          <Stop
            offset="0%"
            stopColor={colors[2]}
            stopOpacity={point.intensity * 0.5}
          />
          <Stop
            offset="40%"
            stopColor={colors[1]}
            stopOpacity={point.intensity * 0.3}
          />
          <Stop
            offset="80%"
            stopColor={colors[0]}
            stopOpacity={point.intensity * 0.15}
          />
          <Stop offset="100%" stopColor={colors[0]} stopOpacity={0} />
        </RadialGradient>
      );

      // Outer gradient (wide spread)
      const outerGradientId = `heatOuter-${index}`;
      gradients.push(
        <RadialGradient
          key={outerGradientId}
          id={outerGradientId}
          cx="50%"
          cy="50%"
          r="100%"
        >
          <Stop
            offset="0%"
            stopColor={colors[1]}
            stopOpacity={point.intensity * 0.3}
          />
          <Stop
            offset="60%"
            stopColor={colors[0]}
            stopOpacity={point.intensity * 0.1}
          />
          <Stop offset="100%" stopColor={colors[0]} stopOpacity={0} />
        </RadialGradient>
      );
    });

    return gradients;
  }, [heatmapPoints]);

  if (warnings.length === 0) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: viewportSize,
        height: viewportSize,
        pointerEvents: 'none',
      }}
    >
      <Svg
        width={viewportSize}
        height={viewportSize}
        style={{ position: 'absolute' }}
      >
        <Defs>{gradientDefs}</Defs>

        {heatmapPoints.map((point, index) => (
          <React.Fragment key={index}>
            {/* Outer layer - widest spread */}
            <Circle
              cx={point.x}
              cy={point.y}
              r={point.radius * 1.2}
              fill={`url(#heatOuter-${index})`}
              opacity={0.6}
            />

            {/* Mid layer - medium spread */}
            <Circle
              cx={point.x}
              cy={point.y}
              r={point.radius * 0.8}
              fill={`url(#heatMid-${index})`}
              opacity={0.7}
            />

            {/* Core layer - intense center */}
            <Circle
              cx={point.x}
              cy={point.y}
              r={point.radius * 0.4}
              fill={`url(#heatCore-${index})`}
              opacity={0.9}
            />
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
}
