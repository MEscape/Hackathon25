import { ViewStyle, TextStyle } from 'react-native';

import type { ThemedStyle } from './types';

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  row: { flexDirection: 'row' } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexWrap: { flexWrap: 'wrap' } as ViewStyle,
};

/* Generic Card Base */
export const $cardBase: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.card,
  borderRadius: 14,
  padding: theme.spacing.md,
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: theme.colors.border,
  shadowColor: theme.colors.shadowColor,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 1,
});

/* Error Card */
export const $errorContainer: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.xs,
  paddingVertical: theme.spacing.sm,
  paddingHorizontal: theme.spacing.md,
  backgroundColor: theme.colors.errorBackground,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: theme.colors.error,
  width: '100%',
});

export const $errorText: ThemedStyle<TextStyle> = theme => ({
  color: theme.colors.error,
  flex: 1,
  fontSize: 13,
});

/* Info Card */
export const $infoContainer: ThemedStyle<ViewStyle> = theme => ({
  paddingHorizontal: theme.spacing.lg,
  paddingBottom: theme.spacing.md,
});

export const $infoCard: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.isDark
    ? 'rgba(61, 148, 255, 0.08)'
    : 'rgba(0, 122, 255, 0.06)',
  borderRadius: 14,
  padding: theme.spacing.md,
  borderWidth: 1,
  borderColor: theme.isDark
    ? 'rgba(61, 148, 255, 0.15)'
    : 'rgba(0, 122, 255, 0.12)',
  gap: theme.spacing.sm,
});

export const $infoHeader: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.xs,
});

export const $infoTitle: ThemedStyle<TextStyle> = theme => ({
  fontSize: 15,
  color: theme.colors.text,
});

export const $infoText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 13,
  color: theme.colors.textDim,
  lineHeight: 18,
});

/* Common Card Content Styles */
export const $cardContent: ThemedStyle<ViewStyle> = theme => ({
  flex: 1,
  gap: theme.spacing.xxxs,
});

export const $cardTitle: ThemedStyle<TextStyle> = theme => ({
  fontSize: 15,
  color: theme.colors.text,
  letterSpacing: -0.2,
});

export const $cardSubtitle: ThemedStyle<TextStyle> = theme => ({
  fontSize: 13,
  color: theme.colors.textMuted,
});

/* Settings/Profile Card Style */
export const $settingsCard: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.palette.neutral100,
  borderRadius: theme.spacing.sm,
  padding: theme.spacing.lg,
  marginBottom: theme.spacing.lg,
});

/* Section Title Style */
export const $sectionTitle: ThemedStyle<TextStyle> = theme => ({
  fontSize: 20,
  color: theme.colors.text,
  letterSpacing: -0.3,
});

/* Action Button Container Style */
export const $actionButtonStyle: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
});

/* Common Icon Container Styles */
export const $iconContainer: ThemedStyle<ViewStyle> = theme => ({
  width: 44,
  height: 44,
  borderRadius: 11,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: theme.spacing.md,
});

export const $actionIconContainer: ThemedStyle<ViewStyle> = theme => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing.xs,
});

export const $featureIconContainer: ThemedStyle<ViewStyle> = theme => ({
  width: 40,
  height: 40,
  borderRadius: 10,
  backgroundColor: theme.isDark
    ? 'rgba(61, 148, 255, 0.12)'
    : 'rgba(0, 122, 255, 0.08)',
  alignItems: 'center',
  justifyContent: 'center',
});

export const $errorIconContainer: ThemedStyle<ViewStyle> = theme => ({
  alignItems: 'center',
  marginBottom: theme.spacing.lg,
});

export const $errorIconCircle: ThemedStyle<ViewStyle> = theme => ({
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: theme.colors.errorBackground,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 3,
  borderColor: theme.colors.error,
});

/* Common Shadow Styles */
export const $lightShadow: ThemedStyle<ViewStyle> = theme => ({
  shadowColor: theme.colors.shadowColor,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 1,
});

export const $mediumShadow: ThemedStyle<ViewStyle> = theme => ({
  shadowColor: theme.colors.palette.overlay20,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
});

export const $heavyShadow: ThemedStyle<ViewStyle> = theme => ({
  shadowColor: theme.colors.palette.neutral900,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: theme.isDark ? 0.3 : 0.1,
  shadowRadius: 25,
  elevation: 8,
});

export const $primaryButtonShadow: ThemedStyle<ViewStyle> = theme => ({
  shadowColor: theme.colors.tint,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: theme.isDark ? 0.3 : 0.2,
  shadowRadius: 12,
  elevation: 4,
});

export const $dangerButtonShadow: ThemedStyle<ViewStyle> = theme => ({
  shadowColor: theme.colors.error,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: theme.isDark ? 0.3 : 0.2,
  shadowRadius: 12,
  elevation: 4,
});

/* Common Button Container Styles */
export const $buttonContainer: ThemedStyle<ViewStyle> = () => ({
  width: '100%',
  alignItems: 'center',
  marginBottom: 24,
});

export const $buttonsContainer: ThemedStyle<ViewStyle> = theme => ({
  width: '100%',
  gap: theme.spacing.sm,
  marginBottom: theme.spacing.lg,
});
