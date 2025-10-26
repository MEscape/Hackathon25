import { TextStyle, ViewStyle } from 'react-native';

import { ThemedStyle } from '@/theme/types';

export const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  padding: spacing.sm,
});

export const $section: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
});

export const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.xs,
  marginLeft: spacing.xs,
  color: colors.textDim,
  fontSize: 13,
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
});

export const $settingGroup: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral100,
  borderRadius: 12,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: colors.border,
});

export const $settingRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  minHeight: 56,
});

export const $settingContent: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  marginRight: 12,
});

export const $settingDescription: ThemedStyle<TextStyle> = ({
  spacing,
  colors,
}) => ({
  marginTop: spacing.xxs,
  color: colors.textDim,
  fontSize: 13,
  lineHeight: 16,
});

export const $separator: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 1,
  backgroundColor: colors.border,
  marginLeft: spacing.md,
});

export const $logoutText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.error,
  fontWeight: '500',
});
