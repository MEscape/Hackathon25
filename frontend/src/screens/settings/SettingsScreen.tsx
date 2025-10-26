import React from 'react';

import { View, Switch, TouchableOpacity } from 'react-native';

import BottomSheetModal from '@gorhom/bottom-sheet';

import { BottomSheet, BottomSheetAction } from '@/components/BottomSheet';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from '@/hooks/useLocation';
import { useAppTheme } from '@/theme/context';

import {
  $section,
  $settingContent,
  $settingDescription,
  $settingGroup,
  $settingRow,
  $separator,
  $sectionTitle,
  $container,
  $logoutText,
} from './settingsScreenStyles';

export default function SettingsScreen() {
  const { themed, theme, themeContext, setThemeContextOverride } =
    useAppTheme();
  const { logout } = useAuth();
  const {
    isVisible,
    trackingEnabled,
    isTracking,
    hasPermission,
    updateVisibility,
    setTrackingEnabledSetting,
    startTracking,
    stopTracking,
    requestPermissions,
  } = useLocation();

  // BottomSheet refs
  const backgroundLocationSheetRef = React.useRef<BottomSheetModal>(null);
  const dataPrivacySheetRef = React.useRef<BottomSheetModal>(null);
  const aboutSheetRef = React.useRef<BottomSheetModal>(null);

  // Emergency alerts state (this would be separate from location settings)
  const [emergencyAlertsEnabled, setEmergencyAlertsEnabled] =
    React.useState(true);

  const handleThemeToggle = () => {
    setThemeContextOverride(themeContext === 'dark' ? 'light' : 'dark');
  };

  const [localIsVisible, setLocalIsVisible] = React.useState(isVisible);

  // Sync local state with Redux state
  React.useEffect(() => {
    setLocalIsVisible(isVisible);
  }, [isVisible]);

  const handleLocationSharingToggle = async () => {
    const newValue = !localIsVisible;

    // Optimistic update
    setLocalIsVisible(newValue);

    try {
      const success = await updateVisibility(newValue);
      if (!success) {
        // Revert on failure
        setLocalIsVisible(!newValue);
      }
    } catch (error) {
      // Revert on error
      setLocalIsVisible(!newValue);
    }
  };

  const handleEmergencyAlertsToggle = () => {
    setEmergencyAlertsEnabled(!emergencyAlertsEnabled);
  };

  const handleBackgroundLocationToggle = async () => {
    if (!trackingEnabled) {
      if (!hasPermission) {
        backgroundLocationSheetRef.current?.expand();
      } else {
        setTrackingEnabledSetting(true);
        await startTracking();
      }
    } else {
      setTrackingEnabledSetting(false);
      if (isTracking) {
        await stopTracking();
      }
    }
  };

  const handleDataPrivacy = () => {
    dataPrivacySheetRef.current?.expand();
  };

  const handleAbout = () => {
    aboutSheetRef.current?.expand();
  };

  const handleLogout = () => {
    logout();
  };

  // BottomSheet actions
  const backgroundLocationActions: BottomSheetAction[] = [
    {
      text: 'Enable',
      onPress: async () => {
        setTrackingEnabledSetting(true);
        const granted = await requestPermissions();
        if (!granted) {
          setTrackingEnabledSetting(false);
        }
      },
      preset: 'primary',
    },
    {
      text: 'Cancel',
      onPress: () => {},
      preset: 'primary',
    },
  ];

  const dataPrivacyActions: BottomSheetAction[] = [
    {
      text: 'OK',
      onPress: () => {},
      preset: 'primary',
    },
  ];

  const aboutActions: BottomSheetAction[] = [
    {
      text: 'OK',
      onPress: () => {},
      preset: 'primary',
    },
  ];

  return (
    <Screen preset="scroll" contentContainerStyle={themed($container)}>
      {/* Appearance */}
      <View style={themed($section)}>
        <Text
          preset="formLabel"
          text="Appearance"
          style={themed($sectionTitle)}
        />

        <View style={themed($settingGroup)}>
          <View style={themed($settingRow)}>
            <View style={themed($settingContent)}>
              <Text preset="default" text="Dark Mode" />
            </View>
            <Switch
              value={themeContext === 'dark'}
              onValueChange={handleThemeToggle}
              trackColor={{
                false: theme.colors.borderStrong,
                true: theme.colors.tint,
              }}
              thumbColor={theme.colors.background}
              ios_backgroundColor={theme.colors.borderStrong}
            />
          </View>
        </View>
      </View>

      {/* Privacy & Location */}
      <View style={themed($section)}>
        <Text
          preset="formLabel"
          text="Privacy & Location"
          style={themed($sectionTitle)}
        />

        <View style={themed($settingGroup)}>
          <View style={themed($settingRow)}>
            <View style={themed($settingContent)}>
              <Text preset="default" text="Share Location" />
              <Text
                preset="formHelper"
                text="Allow emergency contacts to see your location"
                style={themed($settingDescription)}
              />
            </View>
            <Switch
              value={localIsVisible}
              onValueChange={handleLocationSharingToggle}
              trackColor={{
                false: theme.colors.borderStrong,
                true: theme.colors.tint,
              }}
              thumbColor={theme.colors.background}
              ios_backgroundColor={theme.colors.borderStrong}
            />
          </View>

          <View style={themed($separator)} />

          <View style={themed($settingRow)}>
            <View style={themed($settingContent)}>
              <Text preset="default" text="Background Location" />
              <Text
                preset="formHelper"
                text="Track location when app is closed"
                style={themed($settingDescription)}
              />
            </View>
            <Switch
              value={trackingEnabled}
              onValueChange={handleBackgroundLocationToggle}
              trackColor={{
                false: theme.colors.borderStrong,
                true: theme.colors.tint,
              }}
              thumbColor={theme.colors.background}
              ios_backgroundColor={theme.colors.borderStrong}
            />
          </View>
        </View>
      </View>

      {/* Notifications */}
      <View style={themed($section)}>
        <Text
          preset="formLabel"
          text="Notifications"
          style={themed($sectionTitle)}
        />

        <View style={themed($settingGroup)}>
          <View style={themed($settingRow)}>
            <View style={themed($settingContent)}>
              <Text preset="default" text="Emergency Alerts" />
              <Text
                preset="formHelper"
                text="Receive safety alerts and notifications"
                style={themed($settingDescription)}
              />
            </View>
            <Switch
              value={emergencyAlertsEnabled}
              onValueChange={handleEmergencyAlertsToggle}
              trackColor={{
                false: theme.colors.borderStrong,
                true: theme.colors.tint,
              }}
              thumbColor={theme.colors.background}
              ios_backgroundColor={theme.colors.borderStrong}
            />
          </View>
        </View>
      </View>

      {/* About & Support */}
      <View style={themed($section)}>
        <Text
          preset="formLabel"
          text="About & Support"
          style={themed($sectionTitle)}
        />

        <View style={themed($settingGroup)}>
          <TouchableOpacity
            style={themed($settingRow)}
            onPress={handleDataPrivacy}
          >
            <View style={themed($settingContent)}>
              <Text preset="default" text="Data Privacy" />
              <Text
                preset="formHelper"
                text="Learn how your data is protected"
                style={themed($settingDescription)}
              />
            </View>
            <Icon
              icon="chevron-forward"
              size={16}
              color={theme.colors.textDim}
            />
          </TouchableOpacity>

          <View style={themed($separator)} />

          <TouchableOpacity style={themed($settingRow)} onPress={handleAbout}>
            <View style={themed($settingContent)}>
              <Text preset="default" text="About SafeNet" />
              <Text
                preset="formHelper"
                text="Version and app information"
                style={themed($settingDescription)}
              />
            </View>
            <Icon
              icon="chevron-forward"
              size={16}
              color={theme.colors.textDim}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Account */}
      <View style={themed($section)}>
        <Text preset="formLabel" text="Account" style={themed($sectionTitle)} />

        <View style={themed($settingGroup)}>
          <TouchableOpacity style={themed($settingRow)} onPress={handleLogout}>
            <View style={themed($settingContent)}>
              <Text
                preset="default"
                text="Logout"
                style={themed($logoutText)}
              />
              <Text
                preset="formHelper"
                text="Sign out of your account"
                style={themed($settingDescription)}
              />
            </View>
            <Icon icon="log-out" size={16} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </View>

      {/* BottomSheets */}
      <BottomSheet
        ref={backgroundLocationSheetRef}
        title="Background Location"
        message="This allows SafeNet to track your location even when the app is closed, enabling better emergency response."
        actions={backgroundLocationActions}
      />

      <BottomSheet
        ref={dataPrivacySheetRef}
        title="Data Privacy"
        message="Your data is encrypted and only shared with your emergency contacts when you explicitly allow it."
        actions={dataPrivacyActions}
      />

      <BottomSheet
        ref={aboutSheetRef}
        title="About SafeNet"
        message="SafeNet v1.0.0&#10;Connected Safety for Everyone&#10;&#10;Built with ❤️ for Hackathon Fulda 2025"
        actions={aboutActions}
      />
    </Screen>
  );
}
