import React from 'react';

import { View } from 'react-native';
import type { ViewStyle } from 'react-native';

import { KeyboardStickyView } from 'react-native-keyboard-controller';

import { Screen } from '@/components/Screen';
import { useAppTheme } from '@/theme/context';
import type { ThemedStyle } from '@/theme/types';

import { ChatInput } from '../components/ChatInput';
import { MessageList } from '../components/MessageList';
import { useEmergencyAssistant } from '../hooks/useEmergencyAssistant';

export function EmergencyAssistantScreen() {
  const { themed } = useAppTheme();

  const { messages, isProcessing, handleSendMessage } = useEmergencyAssistant();

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={['top']}
      KeyboardAvoidingViewProps={{
        enabled: false,
      }}
      contentContainerStyle={themed($screenContent)}
    >
      <View style={themed($content)}>
        <MessageList messages={messages} isLoading={isProcessing} />
      </View>
      <KeyboardStickyView offset={{ closed: 0, opened: 7 }}>
        <ChatInput onSend={handleSendMessage} isDisabled={isProcessing} />
      </KeyboardStickyView>
    </Screen>
  );
}

const $screenContent: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
});

const $content: ThemedStyle<ViewStyle> = theme => ({
  flex: 1,
  paddingHorizontal: theme.spacing.lg,
  paddingBottom: 80, // Space for the fixed input at bottom
});
