import React, { useState, useCallback } from 'react';
import { View, ViewStyle, TextStyle } from 'react-native';

import { Text } from '@/components/Text';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import { PressableIcon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';
import { translate } from '@/i18n';

interface EditableFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onSave: (value: string) => void;
  isLoading?: boolean;
  multiline?: boolean;
  editable?: boolean;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  placeholder,
  onSave,
  isLoading = false,
  multiline = false,
  editable = true,
}) => {
  const { themed } = useAppTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleEdit = useCallback(() => {
    if (!editable) return;
    setEditValue(value);
    setIsEditing(true);
  }, [value, editable]);

  const handleSave = useCallback(() => {
    onSave(editValue);
    setIsEditing(false);
  }, [editValue, onSave]);

  const handleCancel = useCallback(() => {
    setEditValue(value);
    setIsEditing(false);
  }, [value]);

  if (isEditing) {
    return (
      <View style={themed($container)}>
        <TextField
          label={label}
          value={editValue}
          onChangeText={setEditValue}
          placeholder={placeholder}
          multiline={multiline}
          autoFocus
        />
        <View style={themed($buttonContainer)}>
          <Button
            preset="outline"
            text={translate('common:cancel')}
            onPress={handleCancel}
            style={themed($button)}
            disabled={isLoading}
          />
          <Button
            preset="primary"
            text={translate('common:save')}
            onPress={handleSave}
            style={themed($button)}
            disabled={isLoading || editValue.trim() === ''}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={themed($readOnlyContainer)}>
      <View style={themed($row)}>
        <View style={themed($labelContainer)}>
          <Text preset="default" weight="semiBold" text={label} />
          {editable && (
            <PressableIcon
              icon="pencil"
              size={16}
              onPress={handleEdit}
              containerStyle={themed($editIcon)}
            />
          )}
        </View>
        <Text
          preset="formHelper"
          text={value || placeholder || translate('profile:messages.noData')}
          style={[
            themed($valueText),
            !value && themed($placeholderText),
          ]}
        />
      </View>
    </View>
  );
};

const $container: ThemedStyle<ViewStyle> = theme => ({
  gap: theme.spacing.sm,
});

const $readOnlyContainer: ThemedStyle<ViewStyle> = theme => ({
  padding: theme.spacing.sm,
  borderRadius: 8,
  backgroundColor: theme.colors.palette.neutral100,
  borderWidth: 1,
  borderColor: theme.colors.palette.neutral300,
});

const $row: ThemedStyle<ViewStyle> = () => ({
  gap: 8,
});

const $labelContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
});

const $editIcon: ThemedStyle<ViewStyle> = () => ({
  opacity: 0.6,
});

const $valueText: ThemedStyle<TextStyle> = () => ({
  flex: 1,
});

const $placeholderText: ThemedStyle<TextStyle> = theme => ({
  color: theme.colors.textDim,
});

const $buttonContainer: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  gap: theme.spacing.sm,
  justifyContent: 'flex-end',
});

const $button: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
});