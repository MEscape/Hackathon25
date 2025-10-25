import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { IconContainer } from '@/components/IconContainer';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { useAuth } from '@/hooks/useAuth';
import { useAppTheme } from '@/theme/context';
import { $errorContainer, $errorText } from '@/theme/styles';
import {
  $container,
  $ctaSection,
  $featuresContainer,
  $footerText,
  $heroSection,
  $loginButton,
  $loginButtonText,
  $logoContainer,
  $screenContent,
  $subtitle,
  $title
} from './welcomeScreenStyles';

const WelcomeScreen = () => {
  const { themed, theme } = useAppTheme();
  const { login, isLoading, error } = useAuth();

  const handleLogin = async () => {
    await login();
  };

  return (
    <Screen preset="fixed" contentContainerStyle={themed($screenContent)}>
      {/* Subtle gradient background */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
            colors={
              theme.isDark
                  ? ['#0a0a0a', '#1a1a1a', '#0a0a0a']
                  : ['#fafaf9', '#f5f5f4', '#fafaf9']
            }
            locations={[0, 0.5, 1]}
            style={StyleSheet.absoluteFill}
        />
      </View>

      <View style={themed($container)}>
        {/* Logo/Icon Section */}
        <View style={themed($logoContainer)}>
          <IconContainer
              icon="shield-checkmark"
              size="xlarge"
              variant="tinted"
              iconSize={56}
          />
        </View>

        {/* Hero Section */}
        <View style={themed($heroSection)}>
          <Text preset="heading" size="xxl" weight="bold" style={themed($title)} tx="welcome:title" />

          <Text preset="subheading" size="lg" style={themed($subtitle)} tx="welcome:subtitle" />
        </View>

        {/* Features Section */}
        <View style={themed($featuresContainer)}>
          <Card
              variant="feature"
              icon="location"
              titleTx="welcome:features.evacuation.title"
              subtitleTx="welcome:features.evacuation.description"
              iconColor={theme.colors.tint}
          />
          <Card
              variant="feature"
              icon="people"
              titleTx="welcome:features.status.title"
              subtitleTx="welcome:features.status.description"
              iconColor={theme.colors.tint}
          />
          <Card
              variant="feature"
              icon="notifications"
              titleTx="welcome:features.alerts.title"
              subtitleTx="welcome:features.alerts.description"
              iconColor={theme.colors.tint}
          />
        </View>

        {/* Error Message */}
        {error && (
            <View style={themed($errorContainer)}>
              <Icon icon="alert-circle" size={16} color={theme.colors.error} />
              <Text preset="formHelper" style={themed($errorText)}>
                {error}
              </Text>
            </View>
        )}

        {/* CTA Section */}
        <View style={themed($ctaSection)}>
          <Button
              preset="primary"
              tx={isLoading ? 'welcome:cta.signingIn' : 'welcome:cta.signIn'}
              onPress={handleLogin}
              disabled={isLoading}
              style={themed($loginButton)}
              textStyle={themed($loginButtonText)}
          />

          <Text preset="formHelper" style={themed($footerText)} tx="welcome:cta.footer" />
        </View>
      </View>
    </Screen>
  );
};



export default WelcomeScreen;