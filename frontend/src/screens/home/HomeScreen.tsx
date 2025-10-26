import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Icon, IconTypes } from '@/components/Icon';
import { IconContainer } from '@/components/IconContainer';
import { Card } from '@/components/Card';
import { ActionButton } from '@/components/ActionButton';
import { useAuth } from '@/hooks/useAuth';
import { useAppTheme } from '@/theme/context';
import { translate, TxKeyPath } from '@/i18n';
import { $infoCard, $infoContainer, $infoHeader, $infoText, $infoTitle, $actionButtonStyle, $sectionTitle } from '@/theme/styles';
import {
    $featuresContainer,
    $featuresGrid, $greetingText, $header,
    $quickActions,
    $quickActionsContainer,
    $screenContent,
    $statusCardInner, $statusDot,
    $statusIndicator, $statusLeft, $statusText, $statusTime, $userName, $welcomeContainer
} from './homeScreenStyles';

interface Feature {
    titleTx: TxKeyPath;
    subtitleTx: TxKeyPath;
    icon: IconTypes;
    color: string;
    onPress: () => void;
}

function HomeScreen() {
    const { themed, theme } = useAppTheme();
    const { user } = useAuth();
    const router = useRouter();

    const features: Feature[] = [
        {
            titleTx: 'home:features.emergencyMap.title',
            subtitleTx: 'home:features.emergencyMap.subtitle',
            icon: 'map',
            color: theme.colors.tint,
            onPress: () => router.push('/(tabs)/map'),
        },
        {
            titleTx: 'home:features.emergencyContacts.title',
            subtitleTx: 'home:features.emergencyContacts.subtitle',
            icon: 'call',
            color: theme.colors.tint,
            onPress: () => router.push('/(actions)/emergency-contacts'),
        },
        {
            titleTx: 'home:features.safetyAlerts.title',
            subtitleTx: 'home:features.safetyAlerts.subtitle',
            icon: 'notifications',
            color: theme.colors.tint,
            onPress: () => router.push('/(actions)/safety-alerts'),
        },
        {
            titleTx: 'home:features.profile.title',
            subtitleTx: 'home:features.profile.subtitle',
            icon: 'person-circle',
            color: theme.colors.tint,
            onPress: () => router.push('/(actions)/profile'),
        },
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return translate('home:greeting.morning');
        if (hour < 18) return translate('home:greeting.afternoon');
        return translate('home:greeting.evening');
    };

    const handleEmergencyContact = () => {
        Toast.show({
            type: 'success',
            text1: translate('home:quickActions.emergency.messageSent'),
            position: 'bottom',
            visibilityTime: 3000,
        });
    };

    return (
        <Screen preset="scroll" contentContainerStyle={themed($screenContent)}>
            {/* Subtle gradient background */}
            <View style={StyleSheet.absoluteFill}>
                <LinearGradient
                    colors={
                        theme.isDark
                            ? ['#0a0a0a', '#1a1a1a']
                            : ['#fafaf9', '#f5f5f4']
                    }
                    style={StyleSheet.absoluteFill}
                />
            </View>

            {/* Header Section */}
            <View style={themed($header)}>
                <View style={themed($welcomeContainer)}>
                    <Text preset="formHelper" style={themed($greetingText)}>
                        {getGreeting()}
                    </Text>
                    <Text preset="heading" size="xxl" weight="bold" style={themed($userName)}>
                        {user?.given_name || user?.preferred_username || user?.email?.split('@')[0] || 'User'}
                    </Text>
                </View>

                {/* Status Card with Gradient */}
                <Card>
                    <View style={themed($statusCardInner)}>
                        <View style={themed($statusLeft)}>
                            <View style={themed($statusIndicator)}>
                                <View style={themed($statusDot)} />
                                <Text preset="default" weight="semiBold" style={themed($statusText)} tx="home:status.allNormal" />
                            </View>
                            <Text preset="formHelper" style={themed($statusTime)} tx="home:status.lastUpdated" />
                        </View>
                        <IconContainer
                            icon="shield-checkmark"
                            size="medium"
                            variant="success"
                            iconSize={28}
                        />
                    </View>
                </Card>
            </View>

            {/* Quick Actions */}
            <View style={themed($quickActionsContainer)}>
                <Text preset="subheading" weight="semiBold" style={themed($sectionTitle)} tx="home:quickActions.title" />
                <View style={themed($quickActions)}>
                    <ActionButton
                        variant="danger"
                        size="large"
                        icon="call"
                        iconColor="#FFFFFF"
                        iconSize={26}
                        text={translate("home:features.emergencyContacts.title")}
                        subtitle={translate("home:quickActions.emergency.subtitle")}
                        style={themed($actionButtonStyle)}
                        holdEnabled
                        pressHoldDurationMs={3000}
                        holdProgressColors={['#FFFFFF', '#ff6b6b']}
                        onHoldComplete={handleEmergencyContact}
                    />

                    <ActionButton
                        variant="primary"
                        size="large"
                        icon="location"
                        iconColor="#FFFFFF"
                        iconSize={26}
                        text={translate("home:quickActions.shareLocation.title")}
                        subtitle={translate("home:quickActions.emergencyTips.subtitle")}
                        style={themed($actionButtonStyle)}
                        onPress={() => router.push('/(actions)/emergency-assistant')}
                    />
                </View>
            </View>

            {/* Features Section */}
            <View style={themed($featuresContainer)}>
                <Text preset="subheading" weight="semiBold" style={themed($sectionTitle)} tx="home:features.title" />
                <View style={themed($featuresGrid)}>
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            variant="feature"
                            titleTx={feature.titleTx}
                            subtitleTx={feature.subtitleTx}
                            icon={feature.icon as any}
                            iconColor={feature.color}
                            onPress={feature.onPress}
                        />
                    ))}
                </View>
            </View>

            {/* Safety Tip Card */}
            <View style={themed($infoContainer)}>
                <View style={themed($infoCard)}>
                    <View style={themed($infoHeader)}>
                        <Icon icon="information-circle" size={20} color={theme.colors.tint} />
                        <Text preset="default" weight="semiBold" style={themed($infoTitle)} tx="home:info.title" />
                    </View>
                    <Text preset="formHelper" style={themed($infoText)} tx="home:info.tip" />
                </View>
            </View>
        </Screen>
    );
}

export default HomeScreen;