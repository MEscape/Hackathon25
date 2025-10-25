import React from 'react';

import { View, Text, TouchableOpacity, Platform } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const RootErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <View style={$container}>
      <View style={$card}>
        {/* Error Icon */}
        <View style={$iconContainer}>
          <View style={$iconCircle}>
            <Text style={$iconText}>!</Text>
          </View>
        </View>

        {/* Error Title */}
        <Text style={$title}>Something went wrong</Text>

        {/* Error Description */}
        <Text style={$description}>
          We encountered an unexpected error during app initialization. Please
          try restarting the app.
        </Text>

        {/* Error Details */}
        <View style={$errorDetailsContainer}>
          <Text style={$errorDetailsTitle}>Technical Details</Text>
          <View style={$errorDetailsBox}>
            <Text style={$errorDetailsText} numberOfLines={6}>
              {error.message}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={$buttonsContainer}>
          <TouchableOpacity style={$button} onPress={resetErrorBoundary}>
            <Text style={$buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

interface RootErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
}

export const RootErrorBoundary: React.FC<RootErrorBoundaryProps> = ({
  children,
  onError,
  onReset,
}) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={RootErrorFallback}
      onError={onError}
      onReset={onReset}
    >
      {children}
    </ReactErrorBoundary>
  );
};

// Styles without theme context
const $container: ViewStyle = {
  flex: 1,
  backgroundColor: '#ffffff',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 24,
};

const $card: ViewStyle = {
  backgroundColor: '#f5f5f5',
  borderRadius: 16,
  padding: 32,
  maxWidth: 480,
  width: '100%',
  ...Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 25,
    },
    android: {
      elevation: 8,
    },
    web: {
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    },
  }),
  borderWidth: 1,
  borderColor: '#e0e0e0',
};

const $iconContainer: ViewStyle = {
  alignItems: 'center',
  marginBottom: 24,
};

const $iconCircle: ViewStyle = {
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: '#ffebee',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 3,
  borderColor: '#f44336',
};

const $iconText: TextStyle = {
  fontSize: 48,
  fontWeight: '700',
  color: '#f44336',
};

const $title: TextStyle = {
  fontSize: 28,
  fontWeight: '700',
  color: '#212121',
  textAlign: 'center',
  marginBottom: 8,
  letterSpacing: -0.5,
};

const $description: TextStyle = {
  fontSize: 16,
  color: '#757575',
  textAlign: 'center',
  marginBottom: 24,
  lineHeight: 24,
};

const $errorDetailsContainer: ViewStyle = {
  width: '100%',
  marginBottom: 24,
};

const $errorDetailsTitle: TextStyle = {
  fontSize: 12,
  fontWeight: '600',
  color: '#757575',
  marginBottom: 8,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
};

const $errorDetailsBox: ViewStyle = {
  backgroundColor: '#eeeeee',
  borderRadius: 8,
  padding: 16,
  borderWidth: 1,
  borderColor: '#e0e0e0',
};

const $errorDetailsText: TextStyle = {
  fontSize: 13,
  color: '#424242',
  lineHeight: 20,
};

const $buttonsContainer: ViewStyle = {
  width: '100%',
  gap: 12,
};

const $button: ViewStyle = {
  backgroundColor: '#2196f3',
  borderRadius: 8,
  paddingVertical: 16,
  paddingHorizontal: 24,
  alignItems: 'center',
};

const $buttonText: TextStyle = {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '600',
};
