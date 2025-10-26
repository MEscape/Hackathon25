export interface TileCoordinate {
  xTile: number;
  yTile: number;
}

export interface PixelPosition {
  x: number;
  y: number;
}

/**
 * Convert lat/lon to tile coordinates at given zoom level
 */
export function latLonToTile(lat: number, lon: number, zoom: number): TileCoordinate {
  const latRad = (lat * Math.PI) / 180;
  const n = Math.pow(2, zoom);
  const xTile = ((lon + 180) / 360) * n;
  const yTile = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  
  return { xTile, yTile };
}

/**
 * Convert tile coordinates back to lat/lon
 */
export function tileToLatLon(x: number, y: number, zoom: number): { lat: number; lon: number } {
  const n = Math.pow(2, zoom);
  const lon = (x / n) * 360 - 180;
  const latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n)));
  const lat = (latRad * 180) / Math.PI;
  
  return { lat, lon };
}

/**
 * Convert geographic coordinates to pixel position on screen
 */
export function coordsToPixel(
  lat: number,
  lon: number,
  center: { lat: number; lon: number },
  zoom: number,
  displayTileSize: number,
  viewportSize: number
): PixelPosition {
  const centerTile = latLonToTile(center.lat, center.lon, zoom);
  const targetTile = latLonToTile(lat, lon, zoom);

  const tileOffsetX = targetTile.xTile - centerTile.xTile;
  const tileOffsetY = targetTile.yTile - centerTile.yTile;

  const pixelX = tileOffsetX * displayTileSize;
  const pixelY = tileOffsetY * displayTileSize;

  const centerX = viewportSize / 2;
  const centerY = viewportSize / 2;

  return {
    x: centerX + pixelX,
    y: centerY + pixelY,
  };
}

/**
 * Check if a pixel position is visible in viewport
 */
export function isPositionVisible(
  position: PixelPosition,
  viewportSize: number,
  margin: number = 40
): boolean {
  return (
    position.x >= -margin &&
    position.x <= viewportSize + margin &&
    position.y >= -margin &&
    position.y <= viewportSize + margin
  );
}

/**
 * Calculate search radius based on zoom level
 */
export function calculateSearchRadius(zoom: number, baseRadius: number = 5000): number {
  const zoomFactor = Math.max(0.1, Math.min(2, (20 - zoom) / 10));
  return Math.round(baseRadius * zoomFactor);
}

/**
 * Wrap tile X coordinate for seamless horizontal scrolling
 */
export function wrapTileX(x: number, zoom: number): number {
  const tilesPerDimension = Math.pow(2, zoom);
  return ((x % tilesPerDimension) + tilesPerDimension) % tilesPerDimension;
}

/**
 * Check if tile Y coordinate is valid
 */
export function isValidTileY(y: number, zoom: number): boolean {
  const maxTile = Math.pow(2, zoom) - 1;
  return y >= 0 && y <= maxTile;
}