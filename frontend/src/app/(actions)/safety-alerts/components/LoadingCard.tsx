import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '@/theme/context';
import { $loadingCard, $loadingSkeleton, $loadingContent } from '../styles';

export function LoadingCard() {
  const { themed } = useAppTheme();
  return (
    <View style={themed($loadingCard)}>
      <View style={themed($loadingSkeleton)} />
      <View style={themed($loadingContent)}>
        <View style={[themed($loadingSkeleton), { width: '70%', height: 16 }]} />
        <View style={[themed($loadingSkeleton), { width: '50%', height: 12, marginTop: 8 }]} />
      </View>
    </View>
  );
}