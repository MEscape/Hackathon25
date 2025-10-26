import React from 'react';

import { View, Platform } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import { Button } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { $errorIconContainer, $errorIconCircle } from '@/theme/styles';
import type { ThemedStyle } from '@/theme/types';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const { themed } = useAppTheme();

  return (
    <Screen preset="fixed" contentContainerStyle={themed($screenContent)}>
      <View style={themed($card)}>
        {/* Error Icon */}
        <View style={themed($errorIconContainer)}>
          <View style={themed($errorIconCircle)}>
            <Text style={themed($iconText)}>!</Text>
          </View>
        </View>

        {/* Error Title */}
        <Text
          preset="heading"
          style={themed($title)}
          tx="errorFallback:title"
        />

        {/* Error Description */}
        <Text
          preset="default"
          style={themed($description)}
          tx="errorFallback:description"
        />

        {/* Error Details (collapsible section) */}
        <View style={themed($errorDetailsContainer)}>
          <Text
            preset="formLabel"
            style={themed($errorDetailsTitle)}
            tx="errorFallback:technicalDetails"
          />
          <View style={themed($errorDetailsBox)}>
            <Text style={themed($errorDetailsText)} numberOfLines={6}>
              {error.message}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={themed($buttonsContainer)}>
          <Button
            preset="primary"
            tx="errorFallback:tryAgain"
            onPress={resetErrorBoundary}
            style={themed($buttonSpacing)}
          />

          <Button
            preset="secondary"
            tx="errorFallback:reportIssue"
            onPress={() => {
              // Could add navigation to home or other action
              console.log('Report error pressed');
            }}
            style={themed($buttonSpacing)}
          />
        </View>

        {/* Footer */}
        <View style={themed($footer)}>
          <Text
            preset="formHelper"
            style={themed($footerText)}
            tx="errorFallback:footer"
          />
        </View>
      </View>
    </Screen>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  onError,
  onReset,
  fallback: FallbackComponent,
}) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log to your error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    onError?.(error, errorInfo);
  };

  const handleReset = () => {
    // Clean up any state if needed
    onReset?.();
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={FallbackComponent || ErrorFallback}
      onError={handleError}
      onReset={handleReset}
    >
      {children}
    </ReactErrorBoundary>
  );
};

// Themed Styles
const $screenContent: ThemedStyle<ViewStyle> = theme => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing.lg,
});

const $card: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.isDark
    ? theme.colors.palette.neutral300
    : theme.colors.palette.neutral100,
  borderRadius: 16,
  padding: theme.spacing.xl,
  maxWidth: 480,
  width: '100%',
  ...Platform.select({
    ios: {
      shadowColor: theme.colors.palette.neutral900,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: theme.isDark ? 0.3 : 0.1,
      shadowRadius: 25,
    },
    android: {
      elevation: 8,
    },
    web: {
      boxShadow: theme.isDark
        ? '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
        : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    },
  }),
  borderWidth: 1,
  borderColor: theme.colors.border,
});

const $iconText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 48,
  fontWeight: '700',
  color: theme.colors.error,
  fontFamily: theme.typography.primary.bold,
});

const $title: ThemedStyle<TextStyle> = theme => ({
  fontSize: 28,
  fontWeight: '700',
  color: theme.colors.text,
  textAlign: 'center',
  marginBottom: theme.spacing.sm,
  fontFamily: theme.typography.primary.bold,
  letterSpacing: -0.5,
});

const $description: ThemedStyle<TextStyle> = theme => ({
  fontSize: 16,
  color: theme.colors.textDim,
  textAlign: 'center',
  marginBottom: theme.spacing.lg,
  lineHeight: 24,
  fontFamily: theme.typography.primary.normal,
});

const $errorDetailsContainer: ThemedStyle<ViewStyle> = theme => ({
  width: '100%',
  marginBottom: theme.spacing.lg,
});

const $errorDetailsTitle: ThemedStyle<TextStyle> = theme => ({
  fontSize: 12,
  fontWeight: '600',
  color: theme.colors.textDim,
  marginBottom: theme.spacing.xs,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  fontFamily: theme.typography.primary.semiBold,
});

const $errorDetailsBox: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.isDark
    ? theme.colors.palette.neutral400
    : theme.colors.palette.neutral200,
  borderRadius: 8,
  padding: theme.spacing.md,
  borderWidth: 1,
  borderColor: theme.colors.border,
});

const $errorDetailsText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 13,
  color: theme.colors.text,
  fontFamily: theme.typography.code?.normal || theme.typography.primary.normal,
  lineHeight: 20,
});

const $buttonsContainer: ThemedStyle<ViewStyle> = theme => ({
  width: '100%',
  gap: theme.spacing.sm,
  marginBottom: theme.spacing.lg,
});

const $buttonSpacing: ThemedStyle<ViewStyle> = theme => ({
  marginBottom: theme.spacing.xs,
});

const $footer: ThemedStyle<ViewStyle> = theme => ({
  paddingTop: theme.spacing.lg,
  borderTopWidth: 1,
  borderTopColor: theme.colors.separator,
  width: '100%',
});

const $footerText: ThemedStyle<TextStyle> = theme => ({
  fontSize: 12,
  color: theme.colors.textDim,
  textAlign: 'center',
  fontFamily: theme.typography.primary.normal,
  lineHeight: 18,
});
