import React from 'react';
import { View, ViewStyle } from 'react-native';
import { PressableIcon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onReset,
  canZoomIn,
  canZoomOut,
}: MapControlsProps) {
  const { themed } = useAppTheme();

  return (
    <View style={themed($container)}>
      <PressableIcon
        icon="add"
        onPress={onZoomIn}
        containerStyle={themed($button)}
        disabled={!canZoomIn}
      />
      <View style={themed($divider)} />
      <PressableIcon
        icon="remove"
        onPress={onZoomOut}
        containerStyle={themed($button)}
        disabled={!canZoomOut}
      />
      <View style={themed($divider)} />
      <PressableIcon
        icon="navigate"
        onPress={onReset}
        containerStyle={themed($button)}
      />
    </View>
  );
}

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  position: 'absolute',
  top: theme.spacing.md,
  right: theme.spacing.md,
  backgroundColor: theme.colors.background,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: theme.colors.border,
  overflow: 'hidden',
  shadowColor: theme.colors.shadowColor,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: theme.isDark ? 0.3 : 0.1,
  shadowRadius: 8,
  elevation: 4,
  zIndex: 10,
});

const $button: ThemedStyle<ViewStyle> = () => ({
  width: 44,
  height: 44,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
});

const $divider: ThemedStyle<ViewStyle> = (theme) => ({
  height: 1,
  backgroundColor: theme.colors.border,
});