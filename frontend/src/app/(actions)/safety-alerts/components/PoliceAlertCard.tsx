import React from 'react';

import { View } from 'react-native';

import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { PoliceAlert } from '@/features/safetyAlerts/schemas/safetyAlerts.schema';
import { useAppTheme } from '@/theme/context';

import {
  $alertCard,
  $alertHeader,
  $alertIcon,
  $alertContent,
  $alertTitle,
  $alertMeta,
  $severityBadge,
  $severityText,
  $alertType,
  $alertDate,
} from '../styles';
import { getSeverityColor } from '../utils/alertColors';

export type PoliceAlertCardProps = {
  alert: PoliceAlert;
};

export function PoliceAlertCard({ alert }: PoliceAlertCardProps) {
  const { themed, theme } = useAppTheme();
  const color = getSeverityColor(theme, alert.severity);

  return (
    <View style={themed($alertCard)}>
      <View style={themed($alertHeader)}>
        <View style={[themed($alertIcon), { backgroundColor: color + '15' }]}>
          <Icon icon="shield" size={20} color={color} />
        </View>
        <View style={themed($alertContent)}>
          <Text preset="default" weight="semiBold" style={themed($alertTitle)}>
            {alert.i18nTitleDe}
          </Text>
          <View style={themed($alertMeta)}>
            <View
              style={[
                themed($severityBadge),
                { backgroundColor: color + '15' },
              ]}
            >
              <Text
                preset="formHelper"
                weight="semiBold"
                style={[themed($severityText), { color }]}
              >
                {alert.severity?.toUpperCase()}
              </Text>
            </View>
            <Text preset="formHelper" style={themed($alertType)}>
              {alert.type}
            </Text>
          </View>
          <Text preset="formHelper" style={themed($alertDate)}>
            {new Date(alert.startDate).toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
}
