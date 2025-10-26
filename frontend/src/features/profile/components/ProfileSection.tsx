import React from 'react';

import { View, ViewStyle, TextStyle } from 'react-native';

import { Card } from '@/components/Card';
import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

interface ProfileSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  subtitle,
  children,
}) => {
  const { themed } = useAppTheme();

  return (
    <View style={themed($container)}>
      <View style={themed($header)}>
        <Text preset="subheading" weight="semiBold" text={title} />
        {subtitle && (
          <Text preset="formHelper" text={subtitle} style={themed($subtitle)} />
        )}
      </View>
      <Card style={themed($card)}>{children}</Card>
    </View>
  );
};

const $container: ThemedStyle<ViewStyle> = theme => ({
  gap: theme.spacing.sm,
});

const $header: ThemedStyle<ViewStyle> = () => ({
  gap: 4,
});

const $subtitle: ThemedStyle<TextStyle> = theme => ({
  color: theme.colors.textDim,
});

const $card: ThemedStyle<ViewStyle> = theme => ({
  gap: theme.spacing.md,
});
