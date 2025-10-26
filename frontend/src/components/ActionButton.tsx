import React, { useRef, useState } from 'react';

import {
  TouchableOpacity,
  View,
  Platform,
  StyleProp,
  ViewStyle,
  Animated,
} from 'react-native';
import type { TextStyle } from 'react-native';

import { Icon, IconTypes } from '@/components/Icon';
import { IconContainer } from '@/components/IconContainer';
import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import {
  $primaryButtonShadow,
  $dangerButtonShadow,
  $mediumShadow,
} from '@/theme/styles';
import type { ThemedStyle, ThemedStyleArray } from '@/theme/types';

type ActionButtonVariants =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'simple'
  | 'icon';
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
  /**
   * Enable hold functionality
   */
  holdEnabled?: boolean;
  /**
   * Duration in milliseconds to hold before triggering
   */
  pressHoldDurationMs?: number;
  /**
   * Colors for hold progress indicator [start, end]
   */
  holdProgressColors?: [string, string];
  /**
   * Called when hold is completed
   */
  onHoldComplete?: () => void;
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
  holdEnabled = false,
  pressHoldDurationMs = 3000,
  holdProgressColors = ['#FFFFFF', '#ff6b6b'],
  onHoldComplete,
}) => {
  const { themed } = useAppTheme();
  const [isHolding, setIsHolding] = useState(false);
  const holdProgress = useRef(new Animated.Value(0)).current;
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (!holdEnabled || disabled) return;

    setIsHolding(true);
    holdProgress.setValue(0);

    Animated.timing(holdProgress, {
      toValue: 1,
      duration: pressHoldDurationMs,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        onHoldComplete?.();
        resetHold();
      }
    });
  };

  const resetHold = () => {
    setIsHolding(false);
    holdProgress.setValue(0);
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const handlePressIn = () => {
    if (holdEnabled) {
      startHold();
    }
  };

  const handlePressOut = () => {
    if (holdEnabled) {
      resetHold();
    }
  };

  const handlePress = () => {
    if (!holdEnabled && onPress) {
      onPress();
    }
  };

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

    if (
      icon &&
      (variant === 'primary' || variant === 'secondary' || variant === 'danger')
    ) {
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

  const progressWidth = holdProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const progressColor = holdProgress.interpolate({
    inputRange: [0, 1],
    outputRange: holdProgressColors,
  });

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={activeOpacity}
    >
      {holdEnabled && isHolding && (
        <Animated.View
          style={[
            themed($holdProgressBar),
            {
              width: progressWidth,
              backgroundColor: progressColor,
            },
          ]}
        />
      )}
      {renderContent()}
    </TouchableOpacity>
  );
};

// Helper functions
const getSizeIconSize = (size: ActionButtonSizes): number => {
  switch (size) {
    case 'small':
      return 18;
    case 'medium':
      return 24;
    case 'large':
      return 26;
    default:
      return 24;
  }
};

const getSizeIconContainerSize = (
  size: ActionButtonSizes
): 'small' | 'medium' | 'large' => {
  switch (size) {
    case 'small':
      return 'small';
    case 'medium':
      return 'medium';
    case 'large':
      return 'large';
    default:
      return 'medium';
  }
};

// Base styles
const $baseButton: ThemedStyle<ViewStyle> = theme => ({
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 12,
  overflow: 'hidden',
  position: 'relative',
  ...Platform.select({
    web: {
      transition: 'all 0.2s ease',
    },
  }),
});

const $holdProgressBar: ThemedStyle<ViewStyle> = theme => ({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  opacity: 0.3,
  zIndex: 0,
});

const $baseButtonText: ThemedStyle<TextStyle> = theme => ({
  fontFamily: theme.typography.primary.semiBold,
  letterSpacing: -0.2,
  zIndex: 1,
});

const $baseSubtitleText: ThemedStyle<TextStyle> = theme => ({
  fontFamily: theme.typography.primary.normal,
  fontSize: 12,
  opacity: 0.8,
  zIndex: 1,
});

const $quickActionContent: ThemedStyle<ViewStyle> = theme => ({
  alignItems: 'center',
  gap: theme.spacing.xs,
  zIndex: 1,
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

const $sizeTextStyles: Record<
  ActionButtonSizes,
  ThemedStyleArray<TextStyle>
> = {
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
const $variantStyles: Record<
  ActionButtonVariants,
  ThemedStyleArray<ViewStyle>
> = {
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

const $variantTextStyles: Record<
  ActionButtonVariants,
  ThemedStyleArray<TextStyle>
> = {
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

const $variantSubtitleStyles: Record<
  ActionButtonVariants,
  ThemedStyleArray<TextStyle>
> = {
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
