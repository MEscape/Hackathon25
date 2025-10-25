import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

const MOCK_LAT = 52.52;
const MOCK_LON = 13.405;

export default function ShareLocationScreen() {
  const { themed } = useAppTheme();

  return (
    <Screen preset="scroll" contentContainerStyle={themed($container)}>
      <Text preset="heading" weight="bold" tx="actions:shareLocation.title" />
      <Text preset="formHelper" tx="actions:shareLocation.subtitle" />

      <View style={themed($box)}>
        <Text preset="default" weight="semiBold" text={`Latitude: ${MOCK_LAT.toFixed(4)}`} />
        <Text preset="default" weight="semiBold" text={`Longitude: ${MOCK_LON.toFixed(4)}`} />
      </View>

      <Button preset="primary" text="Copy Coordinates" onPress={() => {}} />
    </Screen>
  );
}

const $container: ThemedStyle<ViewStyle> = theme => ({
  padding: theme.spacing.lg,
  gap: theme.spacing.md,
});

const $box: ThemedStyle<ViewStyle> = theme => ({
  padding: theme.spacing.lg,
  borderWidth: 1,
  borderColor: theme.colors.border,
  borderRadius: 12,
  gap: theme.spacing.xxs,
});