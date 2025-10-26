import { TextStyle, ViewStyle } from 'react-native';

import { $primaryButtonShadow } from '@/theme/styles';
import { ThemedStyle } from '@/theme/types';

export const $screenContent: ThemedStyle<ViewStyle> = theme => ({
  flex: 1,
  justifyContent: 'center',
  paddingHorizontal: theme.spacing.lg,
  paddingVertical: theme.spacing.xxl,
});

export const $container: ThemedStyle<ViewStyle> = theme => ({
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: 440,
  width: '100%',
  alignSelf: 'center',
  gap: theme.spacing.xl,
});

export const $logoContainer: ThemedStyle<ViewStyle> = theme => ({
  alignItems: 'center',
  marginBottom: theme.spacing.xs,
});

export const $iconWrapper: ThemedStyle<ViewStyle> = theme => ({
  width: 96,
  height: 96,
  borderRadius: 24,
  backgroundColor: theme.isDark
    ? 'rgba(61, 148, 255, 0.1)'
    : 'rgba(0, 122, 255, 0.08)',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: theme.isDark
    ? 'rgba(61, 148, 255, 0.2)'
    : 'rgba(0, 122, 255, 0.12)',
});

export const $icon: ThemedStyle<ViewStyle> = () => ({});

export const $heroSection: ThemedStyle<ViewStyle> = theme => ({
  alignItems: 'center',
  gap: theme.spacing.xs,
  marginBottom: theme.spacing.md,
});

export const $title: ThemedStyle<TextStyle> = theme => ({
  textAlign: 'center',
  color: theme.colors.text,
  letterSpacing: -0.5,
});

export const $subtitle: ThemedStyle<TextStyle> = theme => ({
  textAlign: 'center',
  color: theme.colors.textDim,
  letterSpacing: -0.2,
});

export const $featuresContainer: ThemedStyle<ViewStyle> = theme => ({
  width: '100%',
  gap: theme.spacing.sm,
  marginVertical: theme.spacing.md,
});

export const $featureItem: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.md,
  paddingVertical: theme.spacing.sm,
  paddingHorizontal: theme.spacing.md,
  backgroundColor: theme.colors.card,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: theme.colors.border,
});

export const $featureContent: ThemedStyle<ViewStyle> = theme => ({
  flex: 1,
  gap: theme.spacing.xxxs,
});

export const $featureTitle: ThemedStyle<TextStyle> = theme => ({
  color: theme.colors.text,
  fontSize: 15,
  lineHeight: 20,
});

export const $featureDescription: ThemedStyle<TextStyle> = theme => ({
  color: theme.colors.textMuted,
  fontSize: 13,
  lineHeight: 18,
});

export const $ctaSection: ThemedStyle<ViewStyle> = theme => ({
  width: '100%',
  alignItems: 'center',
  gap: theme.spacing.md,
  marginTop: theme.spacing.xs,
});

export const $loginButton: ThemedStyle<ViewStyle> = theme => ({
  width: '100%',
  minHeight: 52,
  backgroundColor: theme.colors.tint,
  borderRadius: 12,
  ...$primaryButtonShadow(theme),
});

export const $loginButtonText: ThemedStyle<TextStyle> = () => ({
  fontSize: 16,
  fontWeight: '600',
  letterSpacing: -0.2,
});

export const $footerText: ThemedStyle<TextStyle> = theme => ({
  textAlign: 'center',
  color: theme.colors.textMuted,
  fontSize: 13,
  lineHeight: 18,
  maxWidth: 300,
});
