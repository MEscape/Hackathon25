import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextField } from '@/components/TextField';
import { Icon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import { TxKeyPath } from '@/i18n';
import { 
  $searchInputContainer,
  $searchInputWrapper,
  $searchInputText,
  $clearButton,
  $clearButtonInner
} from '../styles';

export type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholderTx?: TxKeyPath;
};

export function SearchInput({ value, onChangeText, onClear, placeholderTx }: SearchInputProps) {
  const { themed, theme } = useAppTheme();

  const RightAccessory = useCallback(() => (
    value.length > 0 ? (
      <TouchableOpacity
        style={themed($clearButton)}
        onPress={onClear}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={themed($clearButtonInner)}>
          <Icon icon="close" size={14} color={theme.colors.textMuted} />
        </View>
      </TouchableOpacity>
    ) : null
  ), [value.length, themed, onClear, theme.colors.textMuted]);

  return (
    <TextField
      placeholderTx={placeholderTx}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="none"
      autoCorrect={false}
      containerStyle={themed($searchInputContainer)}
      inputWrapperStyle={themed($searchInputWrapper)}
      style={themed($searchInputText)}
      RightAccessory={RightAccessory}
    />
  );
}