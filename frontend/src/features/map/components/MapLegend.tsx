import React, { useState } from 'react';
import { View, ViewStyle, TextStyle, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';
import type { HelpCenterType } from '@/store/api/helpCentersApi';
import { HELP_CENTER_CONFIG } from '@/config/config.map';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface MapLegendProps {
  enabledTypes: HelpCenterType[];
}

const LEGEND_ITEMS = {
  user: { icon: 'location', color: null, label: 'Dein Standort' },
  friend: { icon: 'person', color: '#10B981', label: 'Freunde' },
  ...HELP_CENTER_CONFIG,
};

export function MapLegend({ enabledTypes }: MapLegendProps) {
  const { themed, theme } = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const visibleItems = ['user', 'friend', ...enabledTypes];

  return (
    <View style={themed($container)}>
      {/* Toggle button */}
      <TouchableOpacity
        style={themed($toggleButton)}
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <Icon
          icon={isExpanded ? 'chevron-down' : 'information-circle'}
          size={18}
          color={theme.colors.text}
        />
        {!isExpanded && (
          <Text style={themed($toggleText)}>Legende</Text>
        )}
      </TouchableOpacity>

      {/* Expanded legend items */}
      {isExpanded && (
        <View style={themed($itemsContainer)}>
          {visibleItems.map((key) => {
            const item = LEGEND_ITEMS[key as keyof typeof LEGEND_ITEMS];
            if (!item) return null;

            const iconColor = item.color || theme.colors.tint;

            return (
              <View key={key} style={themed($legendItem)}>
                <View style={[themed($iconCircle), { backgroundColor: iconColor }]}>
                  <Icon icon={item.icon as any} size={14} color="#FFFFFF" />
                </View>
                <Text style={themed($legendText)}>{item.label}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  position: 'absolute',
  bottom: theme.spacing.md,
  left: theme.spacing.md,
  zIndex: 10,
});

const $toggleButton: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.xs,
  paddingHorizontal: theme.spacing.sm,
  paddingVertical: theme.spacing.xs,
  backgroundColor: theme.colors.background,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: theme.colors.border,
  shadowColor: theme.colors.shadowColor,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: theme.isDark ? 0.3 : 0.1,
  shadowRadius: 6,
  elevation: 3,
});

const $toggleText: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 13,
  fontWeight: '600',
  color: theme.colors.text,
});

const $itemsContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginTop: theme.spacing.xs,
  backgroundColor: theme.colors.background,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: theme.colors.border,
  padding: theme.spacing.sm,
  gap: theme.spacing.xs,
  shadowColor: theme.colors.shadowColor,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: theme.isDark ? 0.3 : 0.1,
  shadowRadius: 6,
  elevation: 3,
  minWidth: 160,
});

const $legendItem: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.xs,
});

const $iconCircle: ThemedStyle<ViewStyle> = (theme) => ({
  width: 24,
  height: 24,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: theme.colors.background,
});

const $legendText: ThemedStyle<TextStyle> = (theme) => ({
  fontSize: 13,
  color: theme.colors.text,
  fontWeight: '500',
});