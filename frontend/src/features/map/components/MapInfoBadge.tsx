import React from 'react';
import { View, ViewStyle, TextStyle } from 'react-native';
import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

interface MapInfoBadgeProps {
  lat: number;
  lon: number;
  zoom: number;
}

export function MapInfoBadge({ lat, lon, zoom }: MapInfoBadgeProps) {
  const { themed } = useAppTheme();

  return (
    <View style={themed($container)}>
      <Text style={themed($text)}>
        {lat.toFixed(4)}, {lon.toFixed(4)} · Z{zoom}
      </Text>
    </View>
  );
}

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  position: 'absolute',
  top: theme.spacing.md,
  left: theme.spacing.md,
  paddingHorizontal: theme.spacing.sm,
  paddingVertical: theme.spacing.xs,
  borderRadius: 10,
  backgroundColor: theme.colors.background,
  borderWidth: 1,
  borderColor: theme.colors.border,
  shadowColor: theme.colors.shadowColor,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: theme.isDark ? 0.2 : 0.08,
  shadowRadius: 4,
  elevation: 3,
  zIndex: 10,
});

const $text: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 11,
  fontWeight: '600',
  color: theme.colors.textDim,
  letterSpacing: 0.2,
});