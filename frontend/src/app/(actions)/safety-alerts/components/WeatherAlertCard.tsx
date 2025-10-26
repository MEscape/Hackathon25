import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import { WeatherAlert } from '@/features/safetyAlerts/schemas/weatherAlerts.schema';
import { 
  $alertCard,
  $alertHeader,
  $alertIcon,
  $alertContent,
  $alertTitle,
  $alertMeta,
  $severityBadge,
  $severityText,
  $alertDescription,
  $alertDate,
} from '../styles';
import { getAwarenessLevelColor } from '../utils/alertColors';

export type WeatherAlertCardProps = {
  alert: WeatherAlert;
};

export function WeatherAlertCard({ alert }: WeatherAlertCardProps) {
  const { themed, theme } = useAppTheme();
  const color = getAwarenessLevelColor(theme, alert.awarenessLevel);

  return (
    <View style={themed($alertCard)}>
      <View style={themed($alertHeader)}>
        <View style={[themed($alertIcon), { backgroundColor: color + '15' }]}>
          <Icon icon="cloud" size={20} color={color} />
        </View>
        <View style={themed($alertContent)}>
          <Text preset="default" weight="semiBold" style={themed($alertTitle)}>
            {alert.region || alert.title}
          </Text>
          <View style={themed($alertMeta)}>
            <View style={[themed($severityBadge), { backgroundColor: color + '15' }]}>
              <Text preset="formHelper" weight="semiBold" style={[themed($severityText), { color }] }>
                LEVEL {alert.awarenessLevel}
              </Text>
            </View>
          </View>
          <Text preset="formHelper" style={themed($alertDescription)}>
            {alert.description}
          </Text>
          <Text preset="formHelper" style={themed($alertDate)}>
            {new Date(alert.validFrom).toLocaleString()} - {new Date(alert.validUntil).toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
}