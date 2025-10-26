import React from 'react';

import { Stack, useRouter } from 'expo-router';

import { Header } from '@/components/Header';
import { useAppTheme } from '@/theme/context';
import { translate } from '@/i18n';

export default function ActionsLayout() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const defaultHeader = (title?: string) => ({
    headerShown: true,
    header: () => (
      <Header
        title={title}
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
        backgroundColor={theme.colors.background}
      />
    ),
  });

  const profileHeader = (title?: string) => ({
    headerShown: true,
    header: () => (
      <Header
        title={title}
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
        rightIcon="settings"
        onRightPress={() => router.push('/settings')}
        backgroundColor={theme.colors.background}
      />
    ),
  });

  return (
    <Stack>
      <Stack.Screen name="index" options={defaultHeader()} />
      <Stack.Screen name="emergency-contacts" options={defaultHeader(translate('emergencyContacts:title'))} />
      <Stack.Screen name="safety-alerts" options={defaultHeader(translate('actions:safetyAlerts.title'))} />
      <Stack.Screen name="share-location" options={defaultHeader(translate('actions:shareLocation.title'))} />
      <Stack.Screen name="emergency-assistant" options={defaultHeader(translate('emergencyAssistant:title'))}/>
      <Stack.Screen name="profile" options={profileHeader(translate('actions:profile.title'))} />
      <Stack.Screen name="settings" options={defaultHeader(translate('actions:settings.title'))} />
    </Stack>
  );
}