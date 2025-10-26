import React, { memo } from 'react';

import { View } from 'react-native';

import { Image } from 'expo-image';

interface MapTileProps {
  url: string;
  x: number;
  y: number;
  size: number;
  headers: Record<string, string>;
}

export const MapTile = memo(
  ({ url, x, y, size, headers }: MapTileProps) => {
    return (
      <View
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          backgroundColor: '#e8e8e8',
        }}
      >
        <Image
          source={{ uri: url, headers }}
          style={{
            width: size,
            height: size,
          }}
          contentFit="cover"
          cachePolicy="memory-disk"
          priority="high"
          recyclingKey={url}
          placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
          transition={100}
          allowDownscaling={false}
        />
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.url === nextProps.url &&
      prevProps.x === nextProps.x &&
      prevProps.y === nextProps.y &&
      prevProps.size === nextProps.size
    );
  }
);
