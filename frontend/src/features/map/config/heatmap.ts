export interface HeatmapConfig {
  intensity: number;
  radius: number;
  blur: number;
  maxOpacity: number;
  minOpacity: number;
  gradient: {
    [key: number]: string;
  };
}

export interface SeverityHeatmapConfig {
  low: HeatmapConfig;
  medium: HeatmapConfig;
  high: HeatmapConfig;
  critical: HeatmapConfig;
}

export const DEFAULT_HEATMAP_CONFIG: SeverityHeatmapConfig = {
  low: {
    intensity: 0.3,
    radius: 40,
    blur: 15,
    maxOpacity: 0.6,
    minOpacity: 0.0,
    gradient: {
      0.0: 'rgba(255, 255, 0, 0)',
      0.5: 'rgba(255, 255, 0, 0.3)',
      1.0: 'rgba(255, 255, 0, 0.6)',
    },
  },
  medium: {
    intensity: 0.6,
    radius: 50,
    blur: 20,
    maxOpacity: 0.7,
    minOpacity: 0.0,
    gradient: {
      0.0: 'rgba(255, 165, 0, 0)',
      0.5: 'rgba(255, 165, 0, 0.4)',
      1.0: 'rgba(255, 165, 0, 0.7)',
    },
  },
  high: {
    intensity: 0.8,
    radius: 60,
    blur: 25,
    maxOpacity: 0.8,
    minOpacity: 0.0,
    gradient: {
      0.0: 'rgba(255, 69, 0, 0)',
      0.5: 'rgba(255, 69, 0, 0.5)',
      1.0: 'rgba(255, 69, 0, 0.8)',
    },
  },
  critical: {
    intensity: 1.0,
    radius: 70,
    blur: 30,
    maxOpacity: 0.9,
    minOpacity: 0.0,
    gradient: {
      0.0: 'rgba(255, 0, 0, 0)',
      0.5: 'rgba(255, 0, 0, 0.6)',
      1.0: 'rgba(255, 0, 0, 0.9)',
    },
  },
};

export const HEATMAP_ZOOM_SCALING = {
  // Scale factors for different zoom levels
  minZoom: 8,
  maxZoom: 18,
  radiusScale: {
    8: 0.5,
    10: 0.7,
    12: 1.0,
    14: 1.3,
    16: 1.6,
    18: 2.0,
  },
  intensityScale: {
    8: 0.8,
    10: 0.9,
    12: 1.0,
    14: 1.1,
    16: 1.2,
    18: 1.3,
  },
};

/**
 * Get scaled radius based on zoom level
 */
export function getScaledRadius(baseRadius: number, zoom: number): number {
  const clampedZoom = Math.max(
    HEATMAP_ZOOM_SCALING.minZoom,
    Math.min(HEATMAP_ZOOM_SCALING.maxZoom, zoom)
  );

  // Find the closest zoom levels for interpolation
  const zoomLevels = Object.keys(HEATMAP_ZOOM_SCALING.radiusScale)
    .map(Number)
    .sort((a, b) => a - b);

  let lowerZoom = zoomLevels[0];
  let upperZoom = zoomLevels[zoomLevels.length - 1];

  for (let i = 0; i < zoomLevels.length - 1; i++) {
    if (clampedZoom >= zoomLevels[i] && clampedZoom <= zoomLevels[i + 1]) {
      lowerZoom = zoomLevels[i];
      upperZoom = zoomLevels[i + 1];
      break;
    }
  }

  // Linear interpolation
  const lowerScale =
    HEATMAP_ZOOM_SCALING.radiusScale[
      lowerZoom as keyof typeof HEATMAP_ZOOM_SCALING.radiusScale
    ];
  const upperScale =
    HEATMAP_ZOOM_SCALING.radiusScale[
      upperZoom as keyof typeof HEATMAP_ZOOM_SCALING.radiusScale
    ];

  const t =
    upperZoom === lowerZoom
      ? 0
      : (clampedZoom - lowerZoom) / (upperZoom - lowerZoom);
  const scale = lowerScale + (upperScale - lowerScale) * t;

  return Math.round(baseRadius * scale);
}

/**
 * Get scaled intensity based on zoom level
 */
export function getScaledIntensity(
  baseIntensity: number,
  zoom: number
): number {
  const clampedZoom = Math.max(
    HEATMAP_ZOOM_SCALING.minZoom,
    Math.min(HEATMAP_ZOOM_SCALING.maxZoom, zoom)
  );

  // Find the closest zoom levels for interpolation
  const zoomLevels = Object.keys(HEATMAP_ZOOM_SCALING.intensityScale)
    .map(Number)
    .sort((a, b) => a - b);

  let lowerZoom = zoomLevels[0];
  let upperZoom = zoomLevels[zoomLevels.length - 1];

  for (let i = 0; i < zoomLevels.length - 1; i++) {
    if (clampedZoom >= zoomLevels[i] && clampedZoom <= zoomLevels[i + 1]) {
      lowerZoom = zoomLevels[i];
      upperZoom = zoomLevels[i + 1];
      break;
    }
  }

  // Linear interpolation
  const lowerScale =
    HEATMAP_ZOOM_SCALING.intensityScale[
      lowerZoom as keyof typeof HEATMAP_ZOOM_SCALING.intensityScale
    ];
  const upperScale =
    HEATMAP_ZOOM_SCALING.intensityScale[
      upperZoom as keyof typeof HEATMAP_ZOOM_SCALING.intensityScale
    ];

  const t =
    upperZoom === lowerZoom
      ? 0
      : (clampedZoom - lowerZoom) / (upperZoom - lowerZoom);
  const scale = lowerScale + (upperScale - lowerScale) * t;

  return Math.min(1.0, baseIntensity * scale);
}
