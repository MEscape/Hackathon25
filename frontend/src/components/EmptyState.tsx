import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import type { ThemedStyle } from '@/theme/types';
import type { ViewStyle, TextStyle } from 'react-native';

interface EmptyStateProps {
  icon: string;
  message: string;
  description?: string;
  style?: ViewStyle;
}

export function EmptyState({ icon, message, description, style }: EmptyStateProps) {
  const { theme, themed } = useAppTheme();

  return (
    <View style={[themed($emptyState), style]}>
      <View style={themed($emptyIconContainer)}>
        <Icon icon={icon as any} size={48} color={theme.colors.textMuted} style={{ opacity: 0.4 }} />
      </View>
      <Text preset="default" style={themed($emptyText)}>
        {message}
      </Text>
      {description && (
        <Text preset="formHelper" style={themed($emptyDescription)}>
          {description}
        </Text>
      )}
    </View>
  );
}

const $emptyState: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.spacing.xxxl,
  paddingHorizontal: theme.spacing.xl,
  gap: theme.spacing.sm,
});

const $emptyIconContainer: ThemedStyle<ViewStyle> = (theme) => ({
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: theme.colors.backgroundMuted,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing.md,
  opacity: 0.6,
});

const $emptyText: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 16,
  color: theme.colors.text,
  textAlign: 'center',
  lineHeight: 22,
  fontWeight: '600',
  maxWidth: 280,
});

const $emptyDescription: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 14,
  color: theme.colors.textMuted,
  textAlign: 'center',
  lineHeight: 20,
  maxWidth: 320,
});