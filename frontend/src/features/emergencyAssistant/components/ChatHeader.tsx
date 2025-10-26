import React from 'react';

import { View, Text } from 'react-native';

import { translate } from '@/i18n';

import { styles } from '../styles/styles';

interface ChatHeaderProps {
  isModelReady: boolean;
  modelLoadProgress: number;
  modelLoadStage?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isModelReady,
  modelLoadProgress,
  modelLoadStage,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        {translate('emergencyAssistant:title')}
      </Text>
      {!isModelReady && modelLoadProgress > 0 && (
        <Text style={styles.loadingText}>
          {modelLoadStage
            ? `${modelLoadStage}: ${modelLoadProgress}%`
            : `${translate('emergencyAssistant:modelLoading')}: ${modelLoadProgress}%`}
        </Text>
      )}
    </View>
  );
};
