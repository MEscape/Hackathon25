import React, { useState } from 'react';

import { View, TextInput, TouchableOpacity, Text } from 'react-native';

import { translate } from '@/i18n';

import { styles } from '../styles/styles';

interface ChatInputProps {
  onSend: (message: string) => void;
  isDisabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isDisabled }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim() || isDisabled) return;

    onSend(inputText.trim());
    setInputText('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder={translate('emergencyAssistant:inputPlaceholder')}
        placeholderTextColor="#999"
        multiline
        maxLength={500}
        editable={!isDisabled}
        returnKeyType="send"
        onSubmitEditing={handleSend}
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          (!inputText.trim() || isDisabled) && styles.sendButtonDisabled,
        ]}
        onPress={handleSend}
        disabled={!inputText.trim() || isDisabled}
        activeOpacity={0.7}
      >
        <Text style={styles.sendButtonText}>{translate('common:send')}</Text>
      </TouchableOpacity>
    </View>
  );
};
