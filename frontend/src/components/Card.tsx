import React from 'react';

import { TouchableOpacity, View } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

import { Icon, IconTypes } from '@/components/Icon';
import { Text } from '@/components/Text';
import { TxKeyPath } from '@/i18n';
import { useAppTheme } from '@/theme/context';
import {
  $iconContainer,
  $actionIconContainer,
  $cardContent,
  $cardTitle,
  $cardSubtitle,
  $lightShadow,
  $mediumShadow,
} from '@/theme/styles';
import type { ThemedStyle } from '@/theme/types';

interface BaseCardProps {
  /**
   * Card style variant
   */
  variant?: 'default' | 'feature' | 'action' | 'compact';
  /**
   * Custom style for the card container
   */
  style?: ViewStyle;
  /**
   * Whether the card is pressable
   */
  onPress?: () => void;
  /**
   * Active opacity when pressed
   */
  activeOpacity?: number;
  /**
   * Children to render inside the card
   */
  children?: React.ReactNode;
}

interface FeatureCardProps extends BaseCardProps {
  variant: 'feature';
  /**
   * Translation key for the title
   */
  titleTx?: TxKeyPath;
  /**
   * Direct title text (alternative to titleTx)
   */
  title?: string;
  /**
   * Translation key for the subtitle
   */
  subtitleTx?: TxKeyPath;
  /**
   * Direct subtitle text (alternative to subtitleTx)
   */
  subtitle?: string;
  /**
   * Icon name
   */
  icon?: IconTypes;
  /**
   * Icon color
   */
  iconColor?: string;
  /**
   * Icon background color (will be auto-generated if not provided)
   */
  iconBackgroundColor?: string;
  /**
   * Whether to show chevron arrow
   */
  showChevron?: boolean;
}

interface ActionCardProps extends BaseCardProps {
  variant: 'action';
  /**
   * Translation key for the title
   */
  titleTx?: TxKeyPath;
  /**
   * Direct title text (alternative to titleTx)
   */
  title?: string;
  /**
   * Translation key for the subtitle
   */
  subtitleTx?: TxKeyPath;
  /**
   * Direct subtitle text (alternative to subtitleTx)
   */
  subtitle?: string;
  /**
   * Icon name
   */
  icon?: IconTypes;
  /**
   * Icon color
   */
  iconColor?: string;
  /**
   * Icon background color
   */
  iconBackgroundColor?: string;
}

interface CompactCardProps extends BaseCardProps {
  variant: 'compact';
  /**
   * Icon name
   */
  icon?: IconTypes;
  /**
   * Icon color
   */
  iconColor?: string;
}

type CardProps =
  | BaseCardProps
  | FeatureCardProps
  | ActionCardProps
  | CompactCardProps;

export function Card(props: CardProps) {
  const { themed, theme } = useAppTheme();
  const {
    variant = 'default',
    style,
    onPress,
    activeOpacity = 0.7,
    children,
  } = props;

  const getCardStyle = (): ThemedStyle<ViewStyle> => {
    switch (variant) {
      case 'feature':
        return $featureCard;
      case 'action':
        return $actionCard;
      case 'compact':
        return $compactCard;
      default:
        return $defaultCard;
    }
  };

  const renderContent = () => {
    if (children) {
      return children;
    }

    switch (variant) {
      case 'feature':
        return renderFeatureContent(props as FeatureCardProps);
      case 'action':
        return renderActionContent(props as ActionCardProps);
      case 'compact':
        return renderCompactContent(props as CompactCardProps);
      default:
        return null;
    }
  };

  const renderFeatureContent = (featureProps: FeatureCardProps) => {
    const {
      titleTx,
      title,
      subtitleTx,
      subtitle,
      icon,
      iconColor,
      iconBackgroundColor,
      showChevron = true,
    } = featureProps;

    const autoIconBgColor = iconColor
      ? theme.isDark
        ? iconColor + '20'
        : iconColor + '15'
      : undefined;

    return (
      <>
        {icon && (
          <View
            style={[
              themed($iconContainer),
              { backgroundColor: iconBackgroundColor || autoIconBgColor },
            ]}
          >
            <Icon
              icon={icon}
              size={24}
              color={iconColor || theme.colors.tint}
            />
          </View>
        )}
        <View style={themed($cardContent)}>
          {(titleTx || title) && (
            <Text
              preset="default"
              weight="semiBold"
              style={themed($cardTitle)}
              tx={titleTx}
              text={title}
            />
          )}
          {(subtitleTx || subtitle) && (
            <Text
              preset="formHelper"
              style={themed($cardSubtitle)}
              tx={subtitleTx}
              text={subtitle}
            />
          )}
        </View>
        {showChevron && (
          <Icon
            icon="chevron-forward"
            size={20}
            color={theme.colors.textMuted}
          />
        )}
      </>
    );
  };

  const renderActionContent = (actionProps: ActionCardProps) => {
    const {
      titleTx,
      title,
      subtitleTx,
      subtitle,
      icon,
      iconColor,
      iconBackgroundColor,
    } = actionProps;

    return (
      <>
        {icon && (
          <View
            style={[
              themed($actionIconContainer),
              {
                backgroundColor:
                  iconBackgroundColor || theme.colors.tint + '15',
              },
            ]}
          >
            <Icon
              icon={icon}
              size={20}
              color={iconColor || theme.colors.tint}
            />
          </View>
        )}
        <View style={themed($actionTextContainer)}>
          {(titleTx || title) && (
            <Text style={themed($actionTitle)} tx={titleTx} text={title} />
          )}
          {(subtitleTx || subtitle) && (
            <Text
              style={themed($actionSubtitle)}
              tx={subtitleTx}
              text={subtitle}
            />
          )}
        </View>
      </>
    );
  };

  const renderCompactContent = (compactProps: CompactCardProps) => {
    const { icon, iconColor } = compactProps;

    return (
      <>
        {icon && (
          <Icon icon={icon} size={20} color={iconColor || theme.colors.tint} />
        )}
      </>
    );
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[themed(getCardStyle()), style]}
        onPress={onPress}
        activeOpacity={activeOpacity}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return <View style={[themed(getCardStyle()), style]}>{renderContent()}</View>;
}

// Card variant styles
const $defaultCard: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.card,
  borderRadius: 12,
  padding: theme.spacing.md,
  borderWidth: 1,
  borderColor: theme.colors.border,
  ...$lightShadow(theme),
});

const $featureCard: ThemedStyle<ViewStyle> = theme => ({
  ...$defaultCard(theme),
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 14,
});

const $actionCard: ThemedStyle<ViewStyle> = theme => ({
  ...$defaultCard(theme),
  alignItems: 'center',
  ...$mediumShadow(theme),
});

const $compactCard: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.card,
  borderRadius: 8,
  padding: theme.spacing.sm,
  shadowColor: theme.colors.palette.overlay10,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  justifyContent: 'center',
  alignItems: 'center',
});

// Content styles
const $actionTextContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: 'center',
});

const $actionTitle: ThemedStyle<TextStyle> = () => ({
  fontSize: 12,
  fontWeight: '600',
  textAlign: 'center',
  marginBottom: 2,
});

const $actionSubtitle: ThemedStyle<TextStyle> = theme => ({
  fontSize: 10,
  textAlign: 'center',
  color: theme.colors.textDim,
});
