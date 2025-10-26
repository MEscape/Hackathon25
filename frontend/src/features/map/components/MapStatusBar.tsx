import React from 'react';

import { View, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';

import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

interface StatusItemProps {
  icon: string;
  label: string;
  isLoading?: boolean;
  color?: string;
}

function StatusItem({ icon, label, isLoading, color }: StatusItemProps) {
  const { themed, theme } = useAppTheme();
  const iconColor = color || theme.colors.textDim;

  return (
    <View style={themed($item)}>
      {isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.tint} />
      ) : (
        <Icon icon={icon as any} size={16} color={iconColor} />
      )}
      <Text style={themed($itemText)}>{label}</Text>
    </View>
  );
}

interface MapStatusBarProps {
  hasPermission: boolean;
  isTracking: boolean;
  isVisible: boolean;
  friendsCount: number;
  helpCentersCount: number;
  warningsCount: number;
  isLoadingFriends: boolean;
  isLoadingHelpCenters: boolean;
  isLoadingWarnings: boolean;
}

export function MapStatusBar({
  hasPermission,
  isTracking,
  isVisible,
  friendsCount,
  helpCentersCount,
  warningsCount,
  isLoadingFriends,
  isLoadingHelpCenters,
  isLoadingWarnings,
}: MapStatusBarProps) {
  const { themed, theme } = useAppTheme();

  if (!hasPermission || !isTracking) return null;

  return (
    <View style={themed($container)}>
      <StatusItem
        icon={isVisible ? 'location' : 'lock-closed'}
        label={isVisible ? 'Sichtbar' : 'Privat'}
        color={isVisible ? theme.colors.tint : theme.colors.textDim}
      />

      <View style={themed($divider)} />

      <StatusItem
        icon="people"
        label={`${friendsCount}`}
        isLoading={isLoadingFriends}
      />

      {helpCentersCount > 0 && (
        <>
          <View style={themed($divider)} />
          <StatusItem
            icon="medkit"
            label={`${helpCentersCount}`}
            isLoading={isLoadingHelpCenters}
          />
        </>
      )}

      {warningsCount > 0 && (
        <>
          <View style={themed($divider)} />
          <StatusItem
            icon="alert"
            label={`${warningsCount}`}
            isLoading={isLoadingWarnings}
            color={theme.colors.error}
          />
        </>
      )}
    </View>
  );
}

const $container: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing.md,
  marginHorizontal: theme.spacing.lg,
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.sm,
  backgroundColor: theme.colors.background,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: theme.colors.border,
  shadowColor: theme.colors.shadowColor,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: theme.isDark ? 0.3 : 0.1,
  shadowRadius: 6,
  elevation: 3,
});

const $item: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.xxs + 2,
});

const $itemText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 13,
  color: theme.colors.textDim,
  fontWeight: '600',
});

const $divider: ThemedStyle<ViewStyle> = theme => ({
  width: 1,
  height: 16,
  backgroundColor: theme.colors.border,
  marginHorizontal: theme.spacing.sm,
});
