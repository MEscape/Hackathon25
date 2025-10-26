import React from 'react';

import { Pressable, Platform, StyleProp, ViewStyle, View } from 'react-native';
import type { TextStyle } from 'react-native';

import { Text } from '@/components/Text';
import { TxKeyPath } from '@/i18n';
import { useAppTheme } from '@/theme/context';
import type { ThemedStyle, ThemedStyleArray } from '@/theme/types';

export type ButtonPresets = 'primary' | 'secondary' | 'outline';

export interface ButtonAccessoryProps {
  style?: StyleProp<ViewStyle>;
}

export interface ButtonProps {
  /**
   * The text to display inside the button
   */
  text?: string;
  /**
   * The text to display inside the button (translated)
   */
  tx?: TxKeyPath;
  /**
   * Button preset style
   */
  preset?: ButtonPresets;
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
   * Children components (alternative to text prop)
   */
  children?: React.ReactNode;
  /**
   * Left accessory component
   */
  LeftAccessory?: React.ComponentType<ButtonAccessoryProps>;
  /**
   * Right accessory component
   */
  RightAccessory?: React.ComponentType<ButtonAccessoryProps>;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  tx,
  preset = 'primary',
  style: styleOverride,
  textStyle: textStyleOverride,
  onPress,
  disabled = false,
  children,
  LeftAccessory,
  RightAccessory,
}) => {
  const { themed } = useAppTheme();

  const buttonStyles = [
    themed($baseButton),
    themed($presets[preset]),
    disabled && themed($disabledButton),
    styleOverride,
  ];

  const textStyles = [
    themed($baseButtonText),
    themed($presetTexts[preset]),
    disabled && themed($disabledButtonText),
    textStyleOverride,
  ];

  const content = children || (
    <Text style={textStyles} tx={tx}>
      {text}
    </Text>
  );

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyles,
        pressed && !disabled && themed($pressedButton),
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {LeftAccessory || RightAccessory ? (
        <View style={themed($contentContainer)}>
          {LeftAccessory && <LeftAccessory style={themed($leftAccessory)} />}
          {content}
          {RightAccessory && <RightAccessory style={themed($rightAccessory)} />}
        </View>
      ) : (
        content
      )}
    </Pressable>
  );
};

// Base button styles
const $baseButton: ThemedStyle<ViewStyle> = theme => ({
  paddingVertical: theme.spacing.md,
  paddingHorizontal: theme.spacing.lg,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 48,
  ...Platform.select({
    web: {
      transition: 'all 0.2s ease',
    },
  }),
});

const $baseButtonText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 16,
  fontWeight: '600',
  fontFamily: theme.typography.primary.semiBold,
  letterSpacing: -0.25,
});

const $contentContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});

const $leftAccessory: ThemedStyle<ViewStyle> = theme => ({
  marginRight: theme.spacing.xs,
});

const $rightAccessory: ThemedStyle<ViewStyle> = theme => ({
  marginLeft: theme.spacing.xs,
});

// Button presets
const $presets: Record<ButtonPresets, ThemedStyleArray<ViewStyle>> = {
  primary: [
    theme => ({
      backgroundColor: theme.colors.tint,
    }),
  ],
  secondary: [
    theme => ({
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.colors.border,
    }),
  ],
  outline: [
    theme => ({
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.tint,
    }),
  ],
};

const $presetTexts: Record<ButtonPresets, ThemedStyleArray<TextStyle>> = {
  primary: [
    theme => ({
      color: theme.colors.palette.neutral100,
    }),
  ],
  secondary: [
    theme => ({
      color: theme.colors.text,
    }),
  ],
  outline: [
    theme => ({
      color: theme.colors.tint,
    }),
  ],
};

// State styles
const $pressedButton: ThemedStyle<ViewStyle> = theme => ({
  opacity: 0.8,
  transform: [{ scale: 0.98 }],
  ...(theme.isDark && {
    backgroundColor: theme.colors.palette.neutral400,
  }),
});

const $disabledButton: ThemedStyle<ViewStyle> = theme => ({
  opacity: 0.5,
  backgroundColor: theme.colors.palette.neutral300,
});

const $disabledButtonText: ThemedStyle<TextStyle> = theme => ({
  color: theme.colors.textDim,
});
