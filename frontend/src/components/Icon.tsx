import { ComponentProps } from 'react';

import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '@/theme/context';

export type IconTypes = ComponentProps<typeof Ionicons>['name'];

type BaseIconProps = {
  /**
   * The name of the icon from Ionicons
   */
  icon: IconTypes;

  /**
   * An optional tint color for the icon
   */
  color?: string;

  /**
   * An optional size for the icon. Default is 24.
   */
  size?: number;

  /**
   * Style overrides for the icon itself (e.g., transform, opacity)
   */
  style?: StyleProp<TextStyle>;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>;
};

type PressableIconProps = Omit<TouchableOpacityProps, 'style'> & BaseIconProps;
type IconProps = Omit<ViewProps, 'style'> & BaseIconProps;

/**
 * A component to render an Ionicon.
 * It is wrapped in a <TouchableOpacity />
 * @param {PressableIconProps} props - The props for the `PressableIcon` component.
 * @returns {JSX.Element} The rendered `PressableIcon` component.
 */
export function PressableIcon(props: PressableIconProps) {
  const {
    icon,
    color,
    size = 24,
    style: $iconStyleOverride,
    containerStyle: $containerStyleOverride,
    ...pressableProps
  } = props;

  const { theme } = useAppTheme();
  const iconColor = color ?? theme.colors.text;

  return (
    <TouchableOpacity {...pressableProps} style={$containerStyleOverride}>
      <Ionicons
        name={icon}
        size={size}
        color={iconColor}
        style={$iconStyleOverride}
      />
    </TouchableOpacity>
  );
}

/**
 * A component to render an Ionicon.
 * It is wrapped in a <View />, use `PressableIcon` if you want to react to input
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size = 24,
    containerStyle: $containerStyleOverride,
    ...viewProps
  } = props;

  const { theme } = useAppTheme();
  const iconColor = color ?? theme.colors.text;

  return (
    <View {...viewProps} style={$containerStyleOverride}>
      <Ionicons name={icon} size={size} color={iconColor} />
    </View>
  );
}
