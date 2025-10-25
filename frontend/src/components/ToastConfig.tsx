import React from 'react';
import { View, Text } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';
import { Icon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import type { ViewStyle, TextStyle } from 'react-native';

interface CustomToastProps {
  text1?: string;
  text2?: string;
}

const CustomToast: React.FC<CustomToastProps & { type: 'success' | 'error' | 'info' | 'warning' }> = ({
                                                                                                        text1,
                                                                                                        text2,
                                                                                                        type,
                                                                                                      }) => {
  const { theme, themed } = useAppTheme();

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          iconName: 'checkmark-circle' as const,
          iconColor: theme.colors.success,
        };
      case 'error':
        return {
          iconName: 'close-circle' as const,
          iconColor: theme.colors.error,
        };
      case 'warning':
        return {
          iconName: 'warning' as const,
          iconColor: theme.colors.warning,
        };
      case 'info':
      default:
        return {
          iconName: 'information-circle' as const,
          iconColor: theme.colors.info,
        };
    }
  };

  const config = getToastConfig();

  const $container = themed<ViewStyle>((t) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.colors.card,
    paddingHorizontal: t.spacing.md,
    paddingVertical: t.spacing.sm,
    marginHorizontal: t.spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: t.colors.border,
  }));

  const $textContainer = themed<ViewStyle>((t) => ({
    flex: 1,
    marginLeft: t.spacing.sm,
  }));

  const $title = themed<TextStyle>((t) => ({
    fontSize: 15,
    fontFamily: t.typography.primary.medium,
    color: t.colors.text,
    letterSpacing: -0.2,
  }));

  const $description = themed<TextStyle>((t) => ({
    fontSize: 13,
    fontFamily: t.typography.primary.normal,
    color: t.colors.textDim,
    marginTop: 2,
  }));

  return (
      <View style={$container}>
        <Icon icon={config.iconName} size={20} color={config.iconColor} />
        <View style={$textContainer}>
          {text1 && (
              <Text style={$title} numberOfLines={1}>
                {text1}
              </Text>
          )}
          {text2 && (
              <Text style={$description} numberOfLines={2}>
                {text2}
              </Text>
          )}
        </View>
      </View>
  );
};

export const createToastConfig = (): ToastConfig => ({
  success: (props) => <CustomToast {...props} type="success" />,
  error: (props) => <CustomToast {...props} type="error" />,
  info: (props) => <CustomToast {...props} type="info" />,
  warning: (props) => <CustomToast {...props} type="warning" />,
});