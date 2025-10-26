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

import type { DiscoverableUser } from '../schemas/emergency.schema';

interface RequestCardProps {
  request: DiscoverableUser;
  onAccept: () => void;
  onDecline: () => void;
}

export function RequestCard({
  request,
  onAccept,
  onDecline,
}: RequestCardProps) {
  const { themed, theme } = useAppTheme();

  return (
    <View style={themed($card)}>
      <View style={themed($content)}>
        {/* Avatar Section with Badge */}
        <View style={themed($avatarContainer)}>
          <View
            style={[
              themed($avatar),
              { backgroundColor: getAvatarColor(request.username) },
            ]}
          >
            <Text style={themed($avatarText)}>
              {request.username.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={themed($badge)}>
            <Icon icon="mail" size={10} color="#FFFFFF" />
          </View>
        </View>

        {/* Info Section */}
        <View style={themed($info)}>
          <Text style={themed($name)} numberOfLines={1}>
            {request.username}
          </Text>
          <Text style={themed($email)} numberOfLines={1}>
            {request.email}
          </Text>

          <View style={themed($requestBadge)}>
            <Text style={themed($requestText)}>
              {translate('emergencyContacts:labels.newRequest' as TxKeyPath)}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={themed($buttonGroup)}>
          <TouchableOpacity
            style={[themed($actionButton), themed($acceptButton)]}
            onPress={onAccept}
            activeOpacity={0.7}
          >
            <Icon icon="checkmark" size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[themed($actionButton), themed($declineButton)]}
            onPress={onDecline}
            activeOpacity={0.7}
          >
            <Icon icon="close" size={18} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const $card: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.background,
  borderRadius: 16,
  padding: theme.spacing.md,
  marginBottom: theme.spacing.sm,
  borderWidth: 1,
  borderColor: theme.colors.border,
  shadowColor: theme.isDark ? '#000' : '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: theme.isDark ? 0.3 : 0.06,
  shadowRadius: 8,
  elevation: 2,
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

const $badge: ThemedStyle<ViewStyle> = theme => ({
  position: 'absolute',
  top: -2,
  right: -2,
  width: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: theme.colors.tint,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
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
});

const $requestBadge: ThemedStyle<ViewStyle> = theme => ({
  marginTop: 4,
  paddingHorizontal: 8,
  paddingVertical: 3,
  backgroundColor: theme.isDark
    ? 'rgba(99, 102, 241, 0.15)'
    : 'rgba(99, 102, 241, 0.1)',
  borderRadius: 8,
  alignSelf: 'flex-start',
});

const $requestText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 11,
  fontWeight: '600',
  color: theme.colors.tint,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
});

const $buttonGroup: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  gap: 8,
});

const $actionButton: ThemedStyle<ViewStyle> = () => ({
  width: 36,
  height: 36,
  borderRadius: 18,
  alignItems: 'center',
  justifyContent: 'center',
});

const $acceptButton: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.tint,
});

const $declineButton: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.isDark
    ? 'rgba(239, 68, 68, 0.15)'
    : 'rgba(239, 68, 68, 0.1)',
});
