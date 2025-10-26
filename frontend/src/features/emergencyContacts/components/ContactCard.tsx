import React from 'react';

import { View, TouchableOpacity } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { getAvatarColor } from '@/features/emergencyContacts/utils/avatar';
import { translate } from '@/i18n';
import type { TxKeyPath } from '@/i18n';
import { useAppTheme } from '@/theme/context';
import type { ThemedStyle } from '@/theme/types';

import type { EmergencyContact } from '../schemas/emergency.schema';

interface ContactCardProps {
  contact: EmergencyContact;
  onRemove: () => void;
}

export function ContactCard({ contact, onRemove }: ContactCardProps) {
  const { themed, theme } = useAppTheme();
  const displayName = `${contact.firstName} ${contact.lastName}`;
  const isOnline = contact.status === 'online';

  return (
    <View style={themed($card)}>
      <View style={themed($content)}>
        {/* Avatar Section */}
        <View style={themed($avatarContainer)}>
          <View
            style={[
              themed($avatar),
              { backgroundColor: getAvatarColor(displayName) },
            ]}
          >
            <Text style={themed($avatarText)}>
              {displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View
            style={[
              themed($statusIndicator),
              {
                backgroundColor: isOnline
                  ? theme.colors.success
                  : theme.colors.textDim,
              },
            ]}
          />
        </View>

        {/* Info Section */}
        <View style={themed($info)}>
          <Text style={themed($name)} numberOfLines={1}>
            {displayName}
          </Text>
          <Text style={themed($email)} numberOfLines={1}>
            {contact.email}
          </Text>

          <View style={themed($statusRow)}>
            <View
              style={[
                themed($statusDot),
                {
                  backgroundColor: isOnline
                    ? theme.colors.success
                    : theme.colors.textDim,
                },
              ]}
            />
            <Text style={themed($statusText)}>
              {isOnline
                ? translate('emergencyContacts:status.online' as TxKeyPath)
                : contact.lastSeen ||
                  translate('emergencyContacts:status.offline' as TxKeyPath)}
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={themed($removeButton)}
          onPress={onRemove}
          activeOpacity={0.7}
        >
          <Icon icon="trash" size={18} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const $card: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.background,
  borderRadius: 16,
  padding: theme.spacing.md,
  marginBottom: theme.spacing.sm,
});

const $content: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
});

const $avatarContainer: ThemedStyle<ViewStyle> = () => ({
  position: 'relative',
});

const $avatar: ThemedStyle<ViewStyle> = () => ({
  width: 48,
  height: 48,
  borderRadius: 24,
  alignItems: 'center',
  justifyContent: 'center',
});

const $avatarText: ThemedStyle<TextStyle> = () => ({
  fontSize: 18,
  fontWeight: '700',
  color: '#FFFFFF',
});

const $statusIndicator: ThemedStyle<ViewStyle> = theme => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 14,
  height: 14,
  borderRadius: 7,
  borderWidth: 2.5,
  borderColor: theme.colors.background,
});

const $info: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  gap: 2,
});

const $name: ThemedStyle<TextStyle> = theme => ({
  fontSize: 16,
  fontWeight: '600',
  color: theme.colors.text,
  letterSpacing: -0.2,
});

const $email: ThemedStyle<TextStyle> = theme => ({
  fontSize: 13,
  color: theme.colors.textDim,
  marginBottom: 2,
});

const $statusRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  marginTop: 2,
});

const $statusDot: ThemedStyle<ViewStyle> = () => ({
  width: 6,
  height: 6,
  borderRadius: 3,
});

const $statusText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 12,
  color: theme.colors.textDim,
  fontWeight: '500',
});

const $removeButton: ThemedStyle<ViewStyle> = theme => ({
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: theme.isDark
    ? 'rgba(239, 68, 68, 0.1)'
    : 'rgba(239, 68, 68, 0.08)',
  alignItems: 'center',
  justifyContent: 'center',
});
