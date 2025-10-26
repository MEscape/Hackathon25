import React from 'react';

import { View, TouchableOpacity } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

import { Text } from '@/components/Text';
import { TabType } from '@/features/emergencyContacts/screens/EmergencyContactsScreen';
import { translate } from '@/i18n';
import { useAppTheme } from '@/theme/context';
import type { ThemedStyle } from '@/theme/types';

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  contactsCount: number;
  requestsCount: number;
}

export function TabBar({
  activeTab,
  onTabChange,
  contactsCount,
  requestsCount,
}: TabBarProps) {
  const { themed } = useAppTheme();

  const tabs = [
    {
      key: 'contacts' as TabType,
      label: translate('emergencyContacts:tabs.contacts'),
      count: contactsCount,
    },
    {
      key: 'discover' as TabType,
      label: translate('emergencyContacts:tabs.discover'),
      count: 0,
    },
    {
      key: 'requests' as TabType,
      label: translate('emergencyContacts:tabs.requests'),
      count: requestsCount,
    },
  ];

  return (
    <View style={themed($tabBar)}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[themed($tab), activeTab === tab.key && themed($activeTab)]}
          onPress={() => onTabChange(tab.key)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              themed($tabText),
              activeTab === tab.key && themed($activeTabText),
            ]}
          >
            {tab.label}
          </Text>
          {tab.count > 0 && (
            <View
              style={[
                themed($badge),
                activeTab === tab.key && themed($activeBadge),
              ]}
            >
              <Text
                style={[
                  themed($badgeText),
                  activeTab === tab.key && themed($activeBadgeText),
                ]}
              >
                {tab.count}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const $tabBar: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  paddingHorizontal: theme.spacing.lg,
  marginBottom: theme.spacing.md,
  gap: theme.spacing.xxxs,
  backgroundColor: theme.colors.card,
  marginHorizontal: theme.spacing.lg,
  borderRadius: 12,
  padding: theme.spacing.xxs,
  borderWidth: 1,
  borderColor: theme.colors.border,
});

const $tab: ThemedStyle<ViewStyle> = theme => ({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.spacing.sm,
  paddingHorizontal: theme.spacing.xs,
  borderRadius: 10,
  gap: theme.spacing.xs,
});

const $activeTab: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.tint,
});

const $tabText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 14,
  color: theme.colors.textMuted,
  letterSpacing: -0.1,
});

const $activeTabText: ThemedStyle<TextStyle> = () => ({
  color: '#FFFFFF',
});

const $badge: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.backgroundMuted,
  paddingHorizontal: theme.spacing.xs,
  paddingVertical: 2,
  borderRadius: 10,
  minWidth: 20,
  alignItems: 'center',
  justifyContent: 'center',
});

const $activeBadge: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
});

const $badgeText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 11,
  fontWeight: '700',
  color: theme.colors.text,
});

const $activeBadgeText: ThemedStyle<TextStyle> = () => ({
  color: '#FFFFFF',
});
