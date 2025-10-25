import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { useAuth } from '@/hooks/useAuth';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

export default function ProfileScreen() {
  const { themed } = useAppTheme();
  const { user } = useAuth();

  return (
    <Screen preset="scroll" contentContainerStyle={themed($container)}>
      <Text preset="heading" weight="bold" tx="actions:profile.title" />
      <Text preset="formHelper" tx="actions:profile.subtitle" />

      <View style={themed($list)}>
        <Card>
          <View style={themed($row)}>
            <Text preset="default" weight="semiBold" text="Name" />
            <Text preset="formHelper" text={user?.given_name || user?.preferred_username || 'Unknown'} />
          </View>
        </Card>
        <Card>
          <View style={themed($row)}>
            <Text preset="default" weight="semiBold" text="Email" />
            <Text preset="formHelper" text={user?.email || 'Unknown'} />
          </View>
        </Card>
      </View>
    </Screen>
  );
}

const $container: ThemedStyle<ViewStyle> = theme => ({
  padding: theme.spacing.lg,
  gap: theme.spacing.md,
});

const $list: ThemedStyle<ViewStyle> = theme => ({
  gap: theme.spacing.sm,
});

const $row: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});