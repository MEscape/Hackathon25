import React from 'react';
import { View } from 'react-native';
import { ContactCardSkeleton } from './CardSkeleton';
import { useAppTheme } from '@/theme/context';
import type { ThemedStyle } from '@/theme/types';
import type { ViewStyle } from 'react-native';

interface SkeletonListProps {
  count?: number;
}

export function SkeletonList({ count = 5 }: SkeletonListProps) {
  const { themed } = useAppTheme();

  return (
    <View style={themed($container)}>
      {Array.from({ length: count }, (_, index) => (
        <ContactCardSkeleton key={index} />
      ))}
    </View>
  );
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
});