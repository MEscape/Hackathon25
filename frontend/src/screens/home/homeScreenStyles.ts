import { TextStyle, ViewStyle } from 'react-native';

import { ThemedStyle } from '@/theme/types';

export const $screenContent: ThemedStyle<ViewStyle> = theme => ({
  paddingBottom: theme.spacing.xxl,
});

export const $header: ThemedStyle<ViewStyle> = theme => ({
  padding: theme.spacing.lg,
  paddingTop: theme.spacing.xl,
  paddingBottom: theme.spacing.md,
});

export const $welcomeContainer: ThemedStyle<ViewStyle> = theme => ({
  marginBottom: theme.spacing.lg,
  gap: theme.spacing.xxs,
});

export const $greetingText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 14,
  color: theme.colors.textMuted,
  letterSpacing: 0.2,
  textTransform: 'uppercase',
});

export const $userName: ThemedStyle<TextStyle> = theme => ({
  color: theme.colors.text,
  letterSpacing: -0.5,
});

export const $statusCardInner: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const $statusLeft: ThemedStyle<ViewStyle> = theme => ({
  flex: 1,
  gap: theme.spacing.xxs,
});

export const $statusIndicator: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.sm,
});

export const $statusDot: ThemedStyle<ViewStyle> = theme => ({
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.colors.success,
});

export const $statusText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 15,
  color: theme.colors.text,
});

export const $statusTime: ThemedStyle<TextStyle> = theme => ({
  fontSize: 13,
  color: theme.colors.textMuted,
});

export const $statusIconWrapper: ThemedStyle<ViewStyle> = theme => ({
  width: 48,
  height: 48,
  borderRadius: 12,
  backgroundColor: theme.isDark
    ? 'rgba(52, 199, 89, 0.12)'
    : 'rgba(52, 199, 89, 0.08)',
  alignItems: 'center',
  justifyContent: 'center',
});

export const $quickActionsContainer: ThemedStyle<ViewStyle> = theme => ({
  paddingHorizontal: theme.spacing.lg,
  paddingBottom: theme.spacing.md,
  gap: theme.spacing.md,
});

export const $quickActions: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  gap: theme.spacing.md,
});

export const $featuresContainer: ThemedStyle<ViewStyle> = theme => ({
  paddingHorizontal: theme.spacing.lg,
  paddingBottom: theme.spacing.md,
  gap: theme.spacing.md,
});

export const $featuresGrid: ThemedStyle<ViewStyle> = theme => ({
  gap: theme.spacing.sm,
});
