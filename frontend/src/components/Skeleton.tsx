import React, { useEffect, useRef } from 'react';

import { View, Animated, Easing } from 'react-native';
import type { ViewStyle } from 'react-native';

import { useAppTheme } from '@/theme/context';
import type { ThemedStyle } from '@/theme/types';

interface SkeletonProps {
  width?: number | `${number}%` | 'auto';
  height?: number;
  borderRadius?: number;
  style?: ViewStyle | ViewStyle[];
}

export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}: SkeletonProps) {
  const { themed } = useAppTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      themed($skeleton).backgroundColor as string,
      themed($skeletonHighlight).backgroundColor as string,
    ],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    />
  );
}

const $skeleton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.border,
});

const $skeletonHighlight: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
});
