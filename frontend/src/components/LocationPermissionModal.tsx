import React, { useState } from 'react';

import {
  View,
  Modal,
  Alert,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { useLocation } from '@/hooks/useLocation';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

interface LocationPermissionModalProps {
  visible: boolean;
  onComplete: () => void;
}

export function LocationPermissionModal({
  visible,
  onComplete,
}: LocationPermissionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { requestPermissions } = useLocation();
  const { themed } = useAppTheme();

  const handleAllowLocation = async () => {
    setIsLoading(true);
    try {
      await requestPermissions();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Location Access',
      'You can enable location access later in settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Skip', onPress: onComplete },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={themed($overlay)}>
        <View style={themed($container)}>
          <View style={themed($iconContainer)}>
            <Ionicons
              name="location"
              size={48}
              color={themed($iconColor).color}
            />
          </View>

          <Text
            preset="heading"
            size="lg"
            tx="location:permission.title"
            style={themed($title)}
          />
          <Text
            preset="default"
            tx="location:permission.description"
            style={themed($description)}
          />

          <View style={themed($featureList)}>
            <View style={themed($featureItem)}>
              <Ionicons
                name="shield-checkmark"
                size={20}
                color={themed($iconColor).color}
              />
              <Text
                preset="default"
                tx="location:permission.features.emergencyResponse"
                style={themed($featureText)}
              />
            </View>
            <View style={themed($featureItem)}>
              <Ionicons
                name="people"
                size={20}
                color={themed($iconColor).color}
              />
              <Text
                preset="default"
                tx="location:permission.features.friendsLocation"
                style={themed($featureText)}
              />
            </View>
            <View style={themed($featureItem)}>
              <Ionicons
                name="notifications"
                size={20}
                color={themed($iconColor).color}
              />
              <Text
                preset="default"
                tx="location:permission.features.safetyAlerts"
                style={themed($featureText)}
              />
            </View>
          </View>

          <View style={themed($buttonContainer)}>
            <Button
              preset="primary"
              tx="location:permission.buttons.allow"
              onPress={handleAllowLocation}
              disabled={isLoading}
              LeftAccessory={
                isLoading
                  ? () => <ActivityIndicator color="white" size="small" />
                  : () => <Ionicons name="checkmark" size={20} color="white" />
              }
            />

            <Button
              preset="secondary"
              tx="location:permission.buttons.skip"
              onPress={handleSkip}
              disabled={isLoading}
            />
          </View>

          <Text
            preset="formHelper"
            tx="location:permission.privacy"
            style={themed($privacyNote)}
          />
        </View>
      </View>
    </Modal>
  );
}

const $overlay: ThemedStyle<ViewStyle> = theme => ({
  flex: 1,
  backgroundColor: theme.colors.palette.overlay50,
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing.lg,
});

const $container: ThemedStyle<ViewStyle> = theme => ({
  backgroundColor: theme.colors.card,
  borderRadius: 20,
  padding: theme.spacing.xl,
  width: '100%',
  maxWidth: 400,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: theme.colors.cardBorder,
});

const $iconContainer: ThemedStyle<ViewStyle> = theme => ({
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: theme.colors.tint + '15',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing.lg,
});

const $iconColor: ThemedStyle<{ color: string }> = theme => ({
  color: theme.colors.tint,
});

const $title: ThemedStyle<TextStyle> = theme => ({
  textAlign: 'center',
  marginBottom: theme.spacing.sm,
});

const $description: ThemedStyle<TextStyle> = theme => ({
  textAlign: 'center',
  marginBottom: theme.spacing.xl,
});

const $featureList: ThemedStyle<ViewStyle> = theme => ({
  width: '100%',
  marginBottom: theme.spacing.xxl,
});

const $featureItem: ThemedStyle<ViewStyle> = theme => ({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: theme.spacing.sm,
});

const $featureText: ThemedStyle<TextStyle> = theme => ({
  marginLeft: theme.spacing.sm,
  flex: 1,
});

const $buttonContainer: ThemedStyle<ViewStyle> = theme => ({
  width: '100%',
  gap: theme.spacing.sm,
});

const $privacyNote: ThemedStyle<TextStyle> = theme => ({
  textAlign: 'center',
  marginTop: theme.spacing.md,
});
