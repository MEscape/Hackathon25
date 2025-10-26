import { useMemo } from 'react';
import { latLonToTile, wrapTileX, isValidTileY } from '../utils/map';
import { MAP_CONFIG } from '@/config/config.map';

export interface TileData {
  x: number;
  y: number;
  url: string;
  key: string;
  gridX: number;
  gridY: number;
}

export function useMapTiles(
  center: { lat: number; lon: number },
  zoom: number,
  bufferTiles: number = MAP_CONFIG.BUFFER_TILES
) {
  const tiles = useMemo(() => {
    const centerTile = latLonToTile(center.lat, center.lon, zoom);
    const baseTileX = Math.floor(centerTile.xTile);
    const baseTileY = Math.floor(centerTile.yTile);
    
    const items: TileData[] = [];

    // Generate grid of tiles
    for (let dy = -bufferTiles; dy <= bufferTiles; dy++) {
      for (let dx = -bufferTiles; dx <= bufferTiles; dx++) {
        const x = baseTileX + dx;
        const y = baseTileY + dy;

        // Wrap X for horizontal wrapping
        const wrappedX = wrapTileX(x, zoom);

        // Skip invalid Y coordinates
        if (!isValidTileY(y, zoom)) continue;

        // Select subdomain for load balancing
        const subdomainIndex = (wrappedX + y) % MAP_CONFIG.OSM_SUBDOMAINS.length;
        const subdomain = MAP_CONFIG.OSM_SUBDOMAINS[subdomainIndex];
        
        const url = `https://${subdomain}.tile.openstreetmap.org/${zoom}/${wrappedX}/${y}.png`;

        items.push({
          x: wrappedX,
          y,
          url,
          key: `${wrappedX}-${y}-${zoom}`,
          gridX: dx + bufferTiles,
          gridY: dy + bufferTiles,
        });
      }
    }

    return items;
  }, [center.lat, center.lon, zoom, bufferTiles]);

  return tiles;
}