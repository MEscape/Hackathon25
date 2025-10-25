import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import { translate } from '@/i18n';
import type { ThemedStyle } from '@/theme/types';
import type { ViewStyle, TextStyle } from 'react-native';
import type { DiscoverableUser } from '../schemas/emergency.schema';
import {getAvatarColor} from "@/features/emergencyContacts/utils/avatar";

interface DiscoverCardProps {
    user: DiscoverableUser;
    onSendRequest: () => void;
    onAcceptRequest?: () => void;
    onDeclineRequest?: () => void;
}

export function DiscoverCard({ user, onSendRequest, onAcceptRequest, onDeclineRequest }: DiscoverCardProps) {
    const { themed, theme } = useAppTheme();

    const renderActionButton = () => {
        switch (user.requestStatus) {
            case 'none':
                return (
                    <TouchableOpacity
                        style={[themed($actionButton), themed($addButton)]}
                        onPress={onSendRequest}
                        activeOpacity={0.7}
                    >
                        <Icon icon="add" size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                );

            case 'sent':
                return (
                    <View style={[themed($actionButton), themed($pendingButton)]}>
                        <Icon icon="time" size={18} color={theme.colors.textDim} />
                    </View>
                );

            case 'received':
                return (
                    <View style={themed($buttonGroup)}>
                        <TouchableOpacity
                            style={[themed($actionButton), themed($acceptButton)]}
                            onPress={onAcceptRequest}
                            activeOpacity={0.7}
                        >
                            <Icon icon="checkmark" size={18} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[themed($actionButton), themed($declineButton)]}
                            onPress={onDeclineRequest}
                            activeOpacity={0.7}
                        >
                            <Icon icon="close" size={18} color={theme.colors.error} />
                        </TouchableOpacity>
                    </View>
                );

            case 'friends':
                return (
                    <View style={[themed($actionButton), themed($friendsButton)]}>
                        <Icon icon="checkmark-circle" size={18} color={theme.colors.tint} />
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <View style={themed($card)}>
            <View style={themed($content)}>
                {/* Avatar Section */}
                <View style={[themed($avatar), { backgroundColor: getAvatarColor(user.username) }]}>
                    <Text style={themed($avatarText)}>{user.username.charAt(0).toUpperCase()}</Text>
                </View>

                {/* Info Section */}
                <View style={themed($info)}>
                    <Text style={themed($name)} numberOfLines={1}>{user.username}</Text>
                    <Text style={themed($email)} numberOfLines={1}>{user.email}</Text>

                    {user.mutualFriends > 0 && (
                        <View style={themed($mutualBadge)}>
                            <Icon icon="people" size={12} color={theme.colors.tint} />
                            <Text style={themed($mutualText)}>
                                {user.mutualFriends} {translate('emergencyContacts:mutualFriends', { count: user.mutualFriends })}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Action Button */}
                {renderActionButton()}
            </View>
        </View>
    );
}

const $card: ThemedStyle<ViewStyle> = (theme) => ({
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

const $info: ThemedStyle<ViewStyle> = () => ({
    flex: 1,
    gap: 2,
});

const $name: ThemedStyle<TextStyle> = (theme) => ({
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    letterSpacing: -0.2,
});

const $email: ThemedStyle<TextStyle> = (theme) => ({
    fontSize: 13,
    color: theme.colors.textDim,
});

const $mutualBadge: ThemedStyle<ViewStyle> = (theme) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: theme.isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
    borderRadius: 8,
    alignSelf: 'flex-start',
});

const $mutualText: ThemedStyle<TextStyle> = (theme) => ({
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.tint,
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

const $addButton: ThemedStyle<ViewStyle> = (theme) => ({
    backgroundColor: theme.colors.tint,
});

const $acceptButton: ThemedStyle<ViewStyle> = (theme) => ({
    backgroundColor: theme.colors.tint,
});

const $declineButton: ThemedStyle<ViewStyle> = (theme) => ({
    backgroundColor: theme.isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
});

const $pendingButton: ThemedStyle<ViewStyle> = (theme) => ({
    backgroundColor: theme.isDark ? 'rgba(107, 114, 128, 0.2)' : 'rgba(107, 114, 128, 0.1)',
});

const $friendsButton: ThemedStyle<ViewStyle> = (theme) => ({
    backgroundColor: theme.isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
});