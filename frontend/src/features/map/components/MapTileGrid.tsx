import React from 'react';

import { View } from 'react-native';

import { MapTile } from './MapTile';
import { TileData } from '../hooks/useMapTiles';

interface MapTileGridProps {
  tiles: TileData[];
  displayTileSize: number;
  bufferTiles: number;
  offset: { x: number; y: number };
  headers: Record<string, string>;
}

export function MapTileGrid({
  tiles,
  displayTileSize,
  bufferTiles,
  offset,
  headers,
}: MapTileGridProps) {
  const gridSize = (bufferTiles * 2 + 1) * displayTileSize;

  return (
    <View
      style={{
        position: 'absolute',
        left: -displayTileSize * bufferTiles + offset.x,
        top: -displayTileSize * bufferTiles + offset.y,
        width: gridSize,
        height: gridSize,
      }}
    >
      {tiles.map(tile => (
        <MapTile
          key={tile.key}
          url={tile.url}
          x={tile.gridX * displayTileSize}
          y={tile.gridY * displayTileSize}
          size={displayTileSize}
          headers={headers}
        />
      ))}
    </View>
  );
}
