import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

export default function EmergencyContactsScreen() {
  const { themed, theme } = useAppTheme();

  return (
    <Screen preset="scroll" contentContainerStyle={themed($container)}>
      <Text preset="heading" weight="bold" tx="actions:emergencyContacts.title" />
      <Text preset="formHelper" tx="actions:emergencyContacts.subtitle" />

      <View style={themed($list)}>
        <Card variant="action" onPress={() => {}}>
          <View style={themed($row)}>
            <View style={themed($iconWrapper)}>
              <Icon icon="call" size={20} color={theme.colors.tint} />
            </View>
            <View style={themed($textWrapper)}>
              <Text preset="default" weight="semiBold" text="Police" />
              <Text preset="formHelper" text="110" />
            </View>
          </View>
        </Card>

        <Card variant="action" onPress={() => {}}>
          <View style={themed($row)}>
            <View style={themed($iconWrapper)}>
              <Icon icon="call" size={20} color={theme.colors.tint} />
            </View>
            <View style={themed($textWrapper)}>
              <Text preset="default" weight="semiBold" text="Ambulance" />
              <Text preset="formHelper" text="112" />
            </View>
          </View>
        </Card>

        <Card variant="action" onPress={() => {}}>
          <View style={themed($row)}>
            <View style={themed($iconWrapper)}>
              <Icon icon="call" size={20} color={theme.colors.tint} />
            </View>
            <View style={themed($textWrapper)}>
              <Text preset="default" weight="semiBold" text="Fire Brigade" />
              <Text preset="formHelper" text="112" />
            </View>
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
  gap: theme.spacing.md,
});

const $iconWrapper: ThemedStyle<ViewStyle> = theme => ({
  width: 40,
  height: 40,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.tint + '15',
});

const $textWrapper: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
});