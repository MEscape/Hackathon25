import { ViewStyle, TextStyle } from 'react-native';
import { ThemedStyle } from '@/theme/types';
import { $mediumShadow, $lightShadow } from '@/theme/styles';

// Container and Layout Styles
export const $container: ThemedStyle<ViewStyle> = theme => ({
  padding: theme.spacing.lg,
  gap: theme.spacing.xl,
});

export const $header: ThemedStyle<ViewStyle> = theme => ({
  gap: theme.spacing.xs,
});

export const $subtitle: ThemedStyle<TextStyle> = theme => ({
  color: theme.colors.textDim,
  lineHeight: 20,
});

// Search Input Styles
export const $searchInputContainer: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 0,
});

export const $searchInputWrapper: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.backgroundElevated,
  borderColor: theme.colors.border,
  borderRadius: 12,
  borderWidth: 1,
  paddingHorizontal: theme.spacing.sm,
  minHeight: 48,
  ...$lightShadow(theme),
});

export const $searchInputText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 16,
  color: theme.colors.text,
  marginHorizontal: theme.spacing.xs,
});

export const $clearButton: ThemedStyle<ViewStyle> = () => ({
  alignItems: 'center',
  justifyContent: 'center',
});

export const $clearButtonInner: ThemedStyle<ViewStyle> = theme => ({
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: theme.colors.backgroundMuted,
  alignItems: 'center',
  justifyContent: 'center',
});

// Section Styles
export const $section: ThemedStyle<ViewStyle> = theme => ({
  gap: theme.spacing.md,
});

export const $sectionHeader: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.sm,
  paddingHorizontal: theme.spacing.xs,
});

export const $sectionIconContainer: ThemedStyle<ViewStyle> = theme => ({
  width: 32,
  height: 32,
  borderRadius: 8,
  backgroundColor: theme.colors.tint + '15',
  alignItems: 'center',
  justifyContent: 'center',
});

export const $sectionTitle: ThemedStyle<TextStyle> = theme => ({
  fontSize: 18,
  color: theme.colors.text,
  letterSpacing: -0.3,
  flex: 1,
});

export const $searchResultsBadge: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.tint + '15',
  paddingHorizontal: theme.spacing.sm,
  paddingVertical: theme.spacing.xxxs,
  borderRadius: 12,
});

export const $searchResultsText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 12,
  color: theme.colors.tint,
  fontWeight: '600',
});

export const $alertsList: ThemedStyle<ViewStyle> = theme => ({
  gap: theme.spacing.sm,
});

// Alert Card Styles
export const $alertCard: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.backgroundElevated,
  borderRadius: 16,
  padding: theme.spacing.md,
  borderWidth: 1,
  borderColor: theme.colors.border,
  ...$mediumShadow(theme),
});

export const $alertHeader: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  gap: theme.spacing.sm,
});

export const $alertIcon: ThemedStyle<ViewStyle> = theme => ({
  width: 40,
  height: 40,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 2,
});

export const $alertContent: ThemedStyle<ViewStyle> = theme => ({
  flex: 1,
  gap: theme.spacing.xs,
});

export const $alertTitle: ThemedStyle<TextStyle> = theme => ({
  fontSize: 16,
  color: theme.colors.text,
  letterSpacing: -0.2,
  lineHeight: 22,
});

export const $alertMeta: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.sm,
  flexWrap: 'wrap',
});

export const $severityBadge: ThemedStyle<ViewStyle> = theme => ({
  paddingHorizontal: theme.spacing.sm,
  paddingVertical: theme.spacing.xxxs,
  borderRadius: 8,
});

export const $severityText: ThemedStyle<TextStyle> = () => ({
  fontSize: 11,
  fontWeight: '700',
  letterSpacing: 0.5,
});

export const $alertType: ThemedStyle<TextStyle> = theme => ({
  fontSize: 13,
  color: theme.colors.textMuted,
  fontWeight: '500',
});

export const $alertDescription: ThemedStyle<TextStyle> = theme => ({
  fontSize: 14,
  color: theme.colors.textDim,
  lineHeight: 20,
});

export const $alertDate: ThemedStyle<TextStyle> = theme => ({
  fontSize: 12,
  color: theme.colors.textMuted,
  fontWeight: '500',
});

// Loading and Empty States
export const $loadingCard: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.backgroundElevated,
  borderRadius: 16,
  padding: theme.spacing.md,
  borderWidth: 1,
  borderColor: theme.colors.border,
  flexDirection: 'row',
  gap: theme.spacing.sm,
});

export const $loadingSkeleton: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.backgroundMuted,
  borderRadius: 8,
  width: 40,
  height: 40,
});

export const $loadingContent: ThemedStyle<ViewStyle> = theme => ({
  flex: 1,
});

export const $emptyState: ThemedStyle<ViewStyle> = theme => ({
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing.xl,
  gap: theme.spacing.sm,
});

export const $emptyIcon: ThemedStyle<ViewStyle> = theme => ({
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: theme.colors.backgroundMuted,
  alignItems: 'center',
  justifyContent: 'center',
});

export const $emptyText: ThemedStyle<TextStyle> = theme => ({
  textAlign: 'center',
  color: theme.colors.textMuted,
  fontSize: 14,
});