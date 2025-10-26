import React from 'react';

import { View, ViewStyle } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

import { Icon, IconTypes } from './Icon';

export interface IconContainerProps {
  /**
   * The icon to display
   */
  icon?: IconTypes;

  /**
   * Size variant of the container
   */
  size?: 'small' | 'medium' | 'large' | 'xlarge';

  /**
   * Style variant of the container
   */
  variant?:
    | 'default'
    | 'tinted'
    | 'success'
    | 'error'
    | 'warning'
    | 'transparent';

  /**
   * Custom background color (overrides variant)
   */
  backgroundColor?: string;

  /**
   * Icon color
   */
  iconColor?: string;

  /**
   * Icon size (overrides default size for variant)
   */
  iconSize?: number;

  /**
   * Custom border radius
   */
  borderRadius?: number;

  /**
   * Additional style overrides
   */
  style?: ViewStyle;

  /**
   * Children to render instead of icon
   */
  children?: React.ReactNode;
}

export const IconContainer: React.FC<IconContainerProps> = ({
  icon,
  size = 'medium',
  variant = 'default',
  backgroundColor,
  iconColor,
  iconSize,
  borderRadius,
  style,
  children,
}) => {
  const { themed, theme } = useAppTheme();

  const containerStyle = [
    themed($container),
    themed($sizeVariants[size]),
    themed($variantStyles[variant]),
    backgroundColor && { backgroundColor },
    borderRadius !== undefined && { borderRadius },
    style,
  ];

  const defaultIconSize = iconSize || getSizeConfig(size).iconSize;
  const defaultIconColor = iconColor || getVariantIconColor(variant, theme);

  return (
    <View style={containerStyle}>
      {children ||
        (icon && (
          <Icon icon={icon} size={defaultIconSize} color={defaultIconColor} />
        ))}
    </View>
  );
};

// Helper functions
const getSizeConfig = (size: IconContainerProps['size']) => {
  const configs = {
    small: { containerSize: 32, iconSize: 16, borderRadius: 8 },
    medium: { containerSize: 48, iconSize: 20, borderRadius: 12 },
    large: { containerSize: 64, iconSize: 24, borderRadius: 16 },
    xlarge: { containerSize: 96, iconSize: 32, borderRadius: 24 },
  };
  return configs[size || 'medium'];
};

const getVariantIconColor = (
  variant: IconContainerProps['variant'],
  theme: any
) => {
  const colors = {
    default: theme.colors.text,
    tinted: theme.colors.tint,
    success: theme.colors.success,
    error: theme.colors.error,
    warning: theme.colors.warning,
    transparent: theme.colors.text,
  };
  return colors[variant || 'default'];
};

// Styles
const $container: ThemedStyle<ViewStyle> = () => ({
  alignItems: 'center',
  justifyContent: 'center',
});

const $sizeVariants = {
  small: (() => {
    const config = getSizeConfig('small');
    return () => ({
      width: config.containerSize,
      height: config.containerSize,
      borderRadius: config.borderRadius,
    });
  })(),
  medium: (() => {
    const config = getSizeConfig('medium');
    return () => ({
      width: config.containerSize,
      height: config.containerSize,
      borderRadius: config.borderRadius,
    });
  })(),
  large: (() => {
    const config = getSizeConfig('large');
    return () => ({
      width: config.containerSize,
      height: config.containerSize,
      borderRadius: config.borderRadius,
    });
  })(),
  xlarge: (() => {
    const config = getSizeConfig('xlarge');
    return () => ({
      width: config.containerSize,
      height: config.containerSize,
      borderRadius: config.borderRadius,
    });
  })(),
};

const $variantStyles = {
  default: ((theme: any) => ({
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  })) as ThemedStyle<ViewStyle>,

  tinted: ((theme: any) => ({
    backgroundColor: theme.isDark
      ? 'rgba(61, 148, 255, 0.12)'
      : 'rgba(0, 122, 255, 0.08)',
    borderWidth: 1,
    borderColor: theme.isDark
      ? 'rgba(61, 148, 255, 0.2)'
      : 'rgba(0, 122, 255, 0.12)',
  })) as ThemedStyle<ViewStyle>,

  success: ((theme: any) => ({
    backgroundColor: theme.isDark
      ? 'rgba(52, 199, 89, 0.12)'
      : 'rgba(52, 199, 89, 0.08)',
    borderWidth: 1,
    borderColor: theme.isDark
      ? 'rgba(52, 199, 89, 0.2)'
      : 'rgba(52, 199, 89, 0.12)',
  })) as ThemedStyle<ViewStyle>,

  error: ((theme: any) => ({
    backgroundColor: theme.isDark
      ? 'rgba(255, 69, 58, 0.12)'
      : 'rgba(255, 69, 58, 0.08)',
    borderWidth: 1,
    borderColor: theme.isDark
      ? 'rgba(255, 69, 58, 0.2)'
      : 'rgba(255, 69, 58, 0.12)',
  })) as ThemedStyle<ViewStyle>,

  warning: ((theme: any) => ({
    backgroundColor: theme.isDark
      ? 'rgba(255, 214, 10, 0.12)'
      : 'rgba(255, 214, 10, 0.08)',
    borderWidth: 1,
    borderColor: theme.isDark
      ? 'rgba(255, 214, 10, 0.2)'
      : 'rgba(255, 214, 10, 0.12)',
  })) as ThemedStyle<ViewStyle>,

  transparent: ((theme: any) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  })) as ThemedStyle<ViewStyle>,
};
