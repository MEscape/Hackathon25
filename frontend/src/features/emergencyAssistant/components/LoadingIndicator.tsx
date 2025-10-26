import React from 'react';

import { View, Text, ActivityIndicator } from 'react-native';

import { translate } from '@/i18n';

import { styles } from '../styles/styles';

export const LoadingIndicator: React.FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#007AFF" />
      <Text style={styles.loadingIndicatorText}>
        {translate('emergencyAssistant:generating')}
      </Text>
    </View>
  );
};
