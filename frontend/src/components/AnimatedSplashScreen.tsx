import React, { useEffect } from 'react';

import { View, ViewStyle, useColorScheme, Image } from 'react-native';

import { ImageStyle } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

interface AnimatedSplashScreenProps {
  onComplete: () => void;
}

export function AnimatedSplashScreen({
  onComplete,
}: AnimatedSplashScreenProps) {
  const shimmerX = useSharedValue(-200);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0.95);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    // Shimmer animation - single pass, slower
    shimmerX.value = withDelay(
      400,
      withTiming(400, {
        duration: 1500,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      })
    );

    // Fade out after shimmer completes
    setTimeout(() => {
      opacity.value = withTiming(
        0,
        {
          duration: 400,
          easing: Easing.out(Easing.cubic),
        },
        () => {
          scheduleOnRN(onComplete);
        }
      );
    }, 2200); // 400ms delay + 1500ms shimmer + 300ms buffer
  }, [onComplete, opacity, scale, shimmerX]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerX.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        $container,
        { backgroundColor: isDark ? '#000000' : '#ffffff' },
        containerStyle,
      ]}
    >
      <Animated.View style={[$logoContainer, logoStyle]}>
        {/* Base SafeNet Logo */}
        <View style={$logoWrapper}>
          <Image
            source={
              isDark
                ? require('@assets/images/splash-icon-dark.png')
                : require('@assets/images/splash-icon.png')
            }
            style={$logo}
            resizeMode="contain"
          />
        </View>

        {/* Shimmer gradient overlay */}
        <Animated.View
          style={[$shimmerContainer, shimmerStyle]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={[
              'transparent',
              isDark ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.8)',
              'transparent',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={$shimmer}
          />
        </Animated.View>

        {/* Mask overlay - clips shimmer to logo shape */}
        <Image
          source={
            isDark
              ? require('@assets/images/splash-icon-dark-mask.png')
              : require('@assets/images/splash-icon-mask.png')
          }
          style={$maskOverlay}
          resizeMode="contain"
        />
      </Animated.View>
    </Animated.View>
  );
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const $logoContainer: ViewStyle = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 32,
};

const $logoWrapper: ViewStyle = {
  width: 200,
  height: 200,
  borderRadius: 32,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
};

const $logo: ImageStyle = {
  width: 200,
  height: 200,
};

const $shimmerContainer: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: -100,
  right: -100,
  bottom: 0,
  width: 200,
};

const $shimmer: ViewStyle = {
  flex: 1,
  transform: [{ skewX: '-20deg' }],
};

const $maskOverlay: ImageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 200,
  height: 200,
};
