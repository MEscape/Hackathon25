export interface Warning {
  id?: string;
  lat: number;
  lon: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  type: string;
  description?: string;
  timestamp?: string;
  radius?: number;
  source?: string;
}

export interface WarningsQuery {
  lat: number;
  lon: number;
  radiusKm?: number;
}

export interface WarningMarkerProps {
  warning: Warning;
  onPress?: (warning: Warning) => void;
}

export interface WarningsOverlayProps {
  center: { lat: number; lon: number };
  zoom: number;
  offset: { x: number; y: number };
  displayTileSize: number;
  bufferTiles: number;
  viewportSize: number;
  onWarningPress?: (warning: Warning) => void;
}
