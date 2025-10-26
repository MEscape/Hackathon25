import React from 'react';

import { View } from 'react-native';

import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';

import { $emptyState, $emptyIcon, $emptyText } from '../styles';

export type EmptyStateProps = {
  icon: string;
  message: string;
};

export function EmptyState({ icon, message }: EmptyStateProps) {
  const { themed, theme } = useAppTheme();
  return (
    <View style={themed($emptyState)}>
      <View style={themed($emptyIcon)}>
        <Icon icon={icon as any} size={24} color={theme.colors.textMuted} />
      </View>
      <Text preset="formHelper" style={themed($emptyText)}>
        {message}
      </Text>
    </View>
  );
}
