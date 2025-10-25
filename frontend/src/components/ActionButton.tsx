import React from 'react';
import { TouchableOpacity, View, Platform, StyleProp, ViewStyle } from 'react-native';
import type { TextStyle } from 'react-native';

import { Text } from '@/components/Text';
import { Icon, IconTypes } from '@/components/Icon';
import { IconContainer } from '@/components/IconContainer';
import { useAppTheme } from '@/theme/context';
import type { ThemedStyle, ThemedStyleArray } from '@/theme/types';
import { $primaryButtonShadow, $dangerButtonShadow, $mediumShadow } from '@/theme/styles';

type ActionButtonVariants = 'primary' | 'secondary' | 'danger' | 'simple' | 'icon';
type ActionButtonSizes = 'small' | 'medium' | 'large';

export interface ActionButtonProps {
  /**
   * The text to display inside the button
   */
  text?: string;
  /**
   * Button variant style
   */
  variant?: ActionButtonVariants;
  /**
   * Button size
   */
  size?: ActionButtonSizes;
  /**
   * Icon to display
   */
  icon?: IconTypes;
  /**
   * Icon color override
   */
  iconColor?: string;
  /**
   * Icon size override
   */
  iconSize?: number;
  /**
   * Subtitle text (for quick action style)
   */
  subtitle?: string;
  /**
   * An optional style override for the button container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * An optional style override for the button text
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Called when the button is pressed
   */
  onPress?: () => void;
  /**
   * Disable the button
   */
  disabled?: boolean;
  /**
   * Active opacity for press feedback
   */
  activeOpacity?: number;
  /**
   * Children components (alternative to text prop)
   */
  children?: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  variant = 'primary',
  size = 'medium',
  icon,
  iconColor,
  iconSize,
  subtitle,
  style: styleOverride,
  textStyle: textStyleOverride,
  onPress,
  disabled = false,
  activeOpacity = 0.7,
  children,
}) => {
  const { themed } = useAppTheme();

  const buttonStyles = [
    themed($baseButton),
    themed($sizeStyles[size]),
    themed($variantStyles[variant]),
    disabled && themed($disabledButton),
    styleOverride,
  ];

  const textStyles = [
    themed($baseButtonText),
    themed($sizeTextStyles[size]),
    themed($variantTextStyles[variant]),
    disabled && themed($disabledButtonText),
    textStyleOverride,
  ];

  const subtitleStyles = [
    themed($baseSubtitleText),
    themed($variantSubtitleStyles[variant]),
    disabled && themed($disabledButtonText),
  ];

  const renderContent = () => {
    if (children) {
      return children;
    }

    if (variant === 'icon' && icon) {
      return (
        <Icon
          icon={icon}
          color={iconColor}
          size={iconSize || getSizeIconSize(size)}
        />
      );
    }

    if (icon && (variant === 'primary' || variant === 'secondary' || variant === 'danger')) {
      return (
        <View style={themed($quickActionContent)}>
          <IconContainer
            icon={icon}
            size={getSizeIconContainerSize(size)}
            variant="transparent"
            iconColor={iconColor || '#FFFFFF'}
            iconSize={iconSize || getSizeIconSize(size)}
          />
          {text && <Text style={textStyles}>{text}</Text>}
          {subtitle && <Text style={subtitleStyles}>{subtitle}</Text>}
        </View>
      );
    }

    return text ? <Text style={textStyles}>{text}</Text> : null;
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

// Helper functions
const getSizeIconSize = (size: ActionButtonSizes): number => {
  switch (size) {
    case 'small': return 18;
    case 'medium': return 24;
    case 'large': return 26;
    default: return 24;
  }
};

const getSizeIconContainerSize = (size: ActionButtonSizes): 'small' | 'medium' | 'large' => {
  switch (size) {
    case 'small': return 'small';
    case 'medium': return 'medium';
    case 'large': return 'large';
    default: return 'medium';
  }
};

// Base styles
const $baseButton: ThemedStyle<ViewStyle> = theme => ({
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 12,
  ...Platform.select({
    web: {
      transition: 'all 0.2s ease',
    },
  }),
});

const $baseButtonText: ThemedStyle<TextStyle> = theme => ({
  fontFamily: theme.typography.primary.semiBold,
  letterSpacing: -0.2,
});

const $baseSubtitleText: ThemedStyle<TextStyle> = theme => ({
  fontFamily: theme.typography.primary.normal,
  fontSize: 12,
  opacity: 0.8,
});

const $quickActionContent: ThemedStyle<ViewStyle> = theme => ({
  alignItems: 'center',
  gap: theme.spacing.xs,
});

// Size styles
const $sizeStyles: Record<ActionButtonSizes, ThemedStyleArray<ViewStyle>> = {
  small: [
    theme => ({
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      minHeight: 36,
    }),
  ],
  medium: [
    theme => ({
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      minHeight: 48,
    }),
  ],
  large: [
    theme => ({
      padding: theme.spacing.md,
      paddingVertical: theme.spacing.lg,
      minHeight: 64,
    }),
  ],
};

const $sizeTextStyles: Record<ActionButtonSizes, ThemedStyleArray<TextStyle>> = {
  small: [
    () => ({
      fontSize: 14,
      fontWeight: '500',
    }),
  ],
  medium: [
    () => ({
      fontSize: 15,
      fontWeight: '600',
    }),
  ],
  large: [
    () => ({
      fontSize: 15,
      fontWeight: '600',
    }),
  ],
};

// Variant styles
const $variantStyles: Record<ActionButtonVariants, ThemedStyleArray<ViewStyle>> = {
  primary: [
    theme => ({
      backgroundColor: theme.colors.tint,
      borderRadius: 16,
      ...$primaryButtonShadow(theme),
    }),
  ],
  secondary: [
    theme => ({
      backgroundColor: theme.colors.palette.neutral200,
      borderRadius: 16,
      ...$mediumShadow(theme),
    }),
  ],
  danger: [
    theme => ({
      backgroundColor: theme.colors.error,
      borderRadius: 16,
      ...$dangerButtonShadow(theme),
    }),
  ],
  simple: [
    theme => ({
      backgroundColor: theme.colors.tint,
      borderRadius: 8,
    }),
  ],
  icon: [
    theme => ({
      backgroundColor: 'transparent',
      borderRadius: 8,
      padding: theme.spacing.sm,
      minHeight: 'auto',
    }),
  ],
};

const $variantTextStyles: Record<ActionButtonVariants, ThemedStyleArray<TextStyle>> = {
  primary: [
    () => ({
      color: '#FFFFFF',
    }),
  ],
  secondary: [
    theme => ({
      color: theme.colors.text,
    }),
  ],
  danger: [
    () => ({
      color: '#FFFFFF',
    }),
  ],
  simple: [
    () => ({
      color: '#FFFFFF',
    }),
  ],
  icon: [
    theme => ({
      color: theme.colors.text,
    }),
  ],
};

const $variantSubtitleStyles: Record<ActionButtonVariants, ThemedStyleArray<TextStyle>> = {
  primary: [
    () => ({
      color: 'rgba(255, 255, 255, 0.8)',
    }),
  ],
  secondary: [
    theme => ({
      color: theme.colors.textMuted,
    }),
  ],
  danger: [
    () => ({
      color: 'rgba(255, 255, 255, 0.8)',
    }),
  ],
  simple: [
    () => ({
      color: 'rgba(255, 255, 255, 0.8)',
    }),
  ],
  icon: [
    theme => ({
      color: theme.colors.textMuted,
    }),
  ],
};

// State styles
const $disabledButton: ThemedStyle<ViewStyle> = theme => ({
  opacity: 0.5,
  shadowOpacity: 0,
  elevation: 0,
});

const $disabledButtonText: ThemedStyle<TextStyle> = theme => ({
  color: theme.colors.textDim,
});