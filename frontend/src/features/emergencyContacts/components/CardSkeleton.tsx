import React from 'react';

import { View } from 'react-native';
import type { ViewStyle } from 'react-native';

import { Skeleton } from '@/components/Skeleton';
import { useAppTheme } from '@/theme/context';
import type { ThemedStyle } from '@/theme/types';

export function ContactCardSkeleton() {
  const { themed } = useAppTheme();

  return (
    <View style={themed($container)}>
      {/* Avatar skeleton */}
      <Skeleton width={50} height={50} borderRadius={25} />

      {/* Content skeleton */}
      <View style={themed($content)}>
        {/* Name skeleton */}
        <Skeleton width="60%" height={16} style={themed($nameSkeleton)} />

        {/* Email skeleton */}
        <Skeleton width="80%" height={14} style={themed($emailSkeleton)} />
      </View>

      {/* Action button skeleton */}
      <Skeleton width={80} height={32} borderRadius={16} />
    </View>
  );
}

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  padding: spacing.md,
  backgroundColor: colors.background,
  borderRadius: 12,
  marginBottom: spacing.sm,
});

const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  marginLeft: spacing.md,
});

const $nameSkeleton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
});

const $emailSkeleton: ThemedStyle<ViewStyle> = () => ({});
