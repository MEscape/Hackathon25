import React from 'react';

import { Tabs } from 'expo-router';

import { Icon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import { translate } from '@/i18n';

export default function TabLayout() {
    const { theme } = useAppTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.tint,
                tabBarInactiveTintColor: theme.colors.textDim,
                tabBarStyle: {
                    backgroundColor: theme.colors.background,
                    borderTopColor: theme.colors.border,
                    borderTopWidth: 1,
                },
                headerStyle: {
                    backgroundColor: theme.colors.background,
                },
                headerTintColor: theme.colors.text,
                headerTitleStyle: {
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: translate('home:title'),
                    tabBarIcon: ({ color, size }) => (
                        <Icon icon="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    title: translate('map:title'),
                    tabBarIcon: ({ color, size }) => (
                        <Icon icon="map" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
