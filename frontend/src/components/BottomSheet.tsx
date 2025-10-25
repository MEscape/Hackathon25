import React, { forwardRef, useCallback, useMemo } from 'react';
import {TextStyle, View, ViewStyle} from 'react-native';
import BottomSheetModal, {
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

import { Text } from './Text';
import { Button, ButtonPresets } from './Button';
import {Icon, IconTypes} from './Icon';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

export interface BottomSheetAction {
  text: string;
  onPress: () => void;
  preset?: ButtonPresets;
  icon?: IconTypes;
  destructive?: boolean;
}

export interface BottomSheetRef {
  expand: () => void;
  close: () => void;
}

export interface BottomSheetProps {
  title?: string;
  message?: string;
  actions?: BottomSheetAction[];
  children?: React.ReactNode;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
  enableDismissOnClose?: boolean;
}

const CustomBackdrop = (props: BottomSheetBackdropProps) => {
  const { themed } = useAppTheme();

  return (
      <BottomSheetBackdrop
          {...props}
          style={themed($backdrop)}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
      />
  );
};

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
    (
        {
          title,
          message,
          actions = [],
          children,
          snapPoints = ['25%', '50%'],
          enablePanDownToClose = true,
          enableDismissOnClose = true,
        },
        ref
    ) => {
      const { themed, theme } = useAppTheme();
      const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

      const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

      const handleSheetChanges = useCallback((index: number) => {
        if (index === -1 && enableDismissOnClose) {
          // Sheet was dismissed
        }
      }, [enableDismissOnClose]);

      React.useImperativeHandle(ref, () => ({
        expand: () => bottomSheetModalRef.current?.expand(),
        close: () => bottomSheetModalRef.current?.close(),
      }));

      const renderContent = () => {
        if (children) {
          return children;
        }

        return (
            <View style={themed($content)}>
              {title && (
                  <View style={themed($header)}>
                    <Text preset="subheading" text={title} style={themed($title)} />
                  </View>
              )}

              {message && (
                  <View style={themed($messageContainer)}>
                    <Text preset="default" text={message} style={themed($message)} />
                  </View>
              )}

              {actions.length > 0 && (
                  <View style={themed($actionsContainer)}>
                    {actions.map((action, index) => (
                        <Button
                            key={index}
                            preset={action.preset}
                            text={action.text}
                            onPress={() => {
                              action.onPress();
                              bottomSheetModalRef.current?.close();
                            }}
                            style={themed($actionButton)}
                            LeftAccessory={action.icon ? () => (
                                <Icon
                                    icon={action.icon!}
                                    size={16}
                                    color={
                                      action.destructive
                                          ? theme.colors.error
                                          : action.preset === 'primary'
                                              ? theme.colors.palette.neutral100
                                              : theme.colors.text
                                    }
                                />
                            ) : undefined}
                        />
                    ))}
                  </View>
              )}
            </View>
        );
      };

      return (
          <BottomSheetModal
              ref={bottomSheetModalRef}
              index={-1}
              snapPoints={snapPointsMemo}
              onChange={handleSheetChanges}
              enablePanDownToClose={enablePanDownToClose}
              backdropComponent={CustomBackdrop}
              backgroundStyle={themed($bottomSheetBackground)}
              handleIndicatorStyle={themed($handleIndicator)}
              style={themed($bottomSheet)}
          >
            <BottomSheetView style={themed($container)}>
              {renderContent()}
            </BottomSheetView>
          </BottomSheetModal>
      );
    }
);

BottomSheet.displayName = 'BottomSheet';

// Provider component to wrap the app
export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BottomSheetModalProvider>{children}</BottomSheetModalProvider>;
};

// Styles
const $backdrop: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral900,
});

const $bottomSheet: ThemedStyle<ViewStyle> = () => ({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: -4,
  },
  shadowOpacity: 0.1,
  shadowRadius: 16,
  elevation: 16,
});

const $bottomSheetBackground: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
});

const $handleIndicator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.border,
  width: 36,
  height: 4,
  borderRadius: 2,
});

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.lg,
});

const $content: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
});

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: 'center',
  paddingVertical: spacing.sm,
  marginBottom: spacing.xs,
});

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
  textAlign: 'center',
  fontWeight: '600',
});

const $messageContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
});

const $message: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  textAlign: 'center',
  lineHeight: 20,
  paddingHorizontal: spacing.sm,
});

const $actionsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
});

const $actionButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
});