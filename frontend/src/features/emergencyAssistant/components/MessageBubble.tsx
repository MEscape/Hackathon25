import React from 'react';
import { View, Text } from 'react-native';
import type { Message } from '../types';
import { styles } from '../styles/styles';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <View
      style={[
        styles.messageBubble,
        message.role === 'user' ? styles.userBubble : styles.assistantBubble,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          message.role === 'user' ? styles.userText : styles.assistantText,
        ]}
      >
        {message.content}
      </Text>
      <Text style={styles.timestamp}>
        {message.timestamp.toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );
};