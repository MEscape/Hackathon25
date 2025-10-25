import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

export default function SafetyAlertsScreen() {
  const { themed } = useAppTheme();

  return (
    <Screen preset="scroll" contentContainerStyle={themed($container)}>
      <Text preset="heading" weight="bold" tx="actions:safetyAlerts.title" />
      <Text preset="formHelper" tx="actions:safetyAlerts.subtitle" />

      <View style={themed($list)}>
        <Card>
          <View style={themed($alert)}>
            <Text preset="default" weight="semiBold" text="Citywide Drill" />
            <Text preset="formHelper" text="Emergency drill scheduled tomorrow at 10:00." />
          </View>
        </Card>
        <Card>
          <View style={themed($alert)}>
            <Text preset="default" weight="semiBold" text="Weather Advisory" />
            <Text preset="formHelper" text="Heavy winds expected this evening. Stay safe." />
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

const $alert: ThemedStyle<ViewStyle> = theme => ({
  gap: theme.spacing.xxs,
});