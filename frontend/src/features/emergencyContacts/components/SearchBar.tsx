import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { useAppTheme } from '@/theme/context';
import type { ThemedStyle } from '@/theme/types';
import type { ViewStyle, TextStyle } from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClear: () => void;
}

export function SearchBar({ searchQuery, onSearchChange, onClear }: SearchBarProps) {
  const { themed } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleClear = () => {
    onClear();
    // Keep focus after clearing
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay blur to prevent immediate dismissal
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  const LeftAccessory = () => (
    <View style={themed($leftAccessoryContainer)}>
      <Icon icon="search" size={18} />
    </View>
  );

  const RightAccessory = searchQuery.length > 0 ? () => (
    <View style={themed($rightAccessoryContainer)}>
      <TouchableOpacity onPress={handleClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Icon icon="close-circle" size={18} />
      </TouchableOpacity>
    </View>
  ) : undefined;

  return (
    <TextField
      ref={inputRef}
      inputWrapperStyle={[themed($inputWrapper), isFocused && themed($inputWrapperFocused)]}
      style={themed($input)}
      placeholderTx="emergencyContacts:search.placeholder"
      value={searchQuery}
      onChangeText={onSearchChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      returnKeyType="search"
      autoCapitalize="none"
      autoCorrect={false}
      blurOnSubmit={false}
      LeftAccessory={LeftAccessory}
      RightAccessory={RightAccessory}
    />
  );
}

const $inputWrapper: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.card,
  borderRadius: 12,
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.xxs,
  gap: theme.spacing.sm,
  borderWidth: 1,
  borderColor: theme.colors.border,
  minHeight: 40,
});

const $inputWrapperFocused: ThemedStyle<ViewStyle> = (theme) => ({
  borderColor: theme.colors.tint,
  shadowColor: theme.colors.tint,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 2,
});

const $input: ThemedStyle<TextStyle> = (theme) => ({
  flex: 1,
  fontSize: 14,
  color: theme.colors.text,
  paddingVertical: 0,
  paddingHorizontal: 0,
  margin: 0,
  lineHeight: 20,
});

const $leftAccessoryContainer: ThemedStyle<ViewStyle> = (theme) => ({
  paddingLeft: theme.spacing.xs,
});

const $rightAccessoryContainer: ThemedStyle<ViewStyle> = (theme) => ({
  paddingRight: theme.spacing.xs,
});
