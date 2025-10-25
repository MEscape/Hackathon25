import React, { useCallback } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { ActionButton } from '@/components/ActionButton';
import { useAuth } from '@/hooks/useAuth';
import { useTriggerEmergencyMutation } from '@/store/api/userMetadataApi';
import { useAppTheme } from '@/theme/context';
import { $sectionTitle } from '@/theme/styles';

export default function EmergencyScreen() {
  const { themed } = useAppTheme();
  const { user } = useAuth();
  const [triggerEmergency, { isLoading }] = useTriggerEmergencyMutation();

  const onTrigger = useCallback(async () => {
    if (!user?.sub) {
      Toast.show({ type: 'error', text1: 'Not authenticated' });
      return;
    }
    try {
      await triggerEmergency({ userId: user.sub }).unwrap();
      Toast.show({ type: 'success', text1: 'Emergency triggered' });
    } catch (e) {
      console.log('Error triggering emergency', e);
    }
  }, [user?.sub, triggerEmergency]);

  return (
    <Screen preset="fixed">
      <View style={{ padding: 16, gap: 16 }}>
        <Text preset="subheading" weight="semiBold" style={themed($sectionTitle)} text="Emergency" />
        <Text preset="formHelper" text="Notify your trusted contacts that you need help." />
        <ActionButton
          variant="danger"
          size="large"
          icon="warning"
          iconColor="#FFFFFF"
          iconSize={26}
          text="Trigger Emergency"
          subtitle="Send alert to your contacts"
          onPress={onTrigger}
          disabled={isLoading}
        />
      </View>
    </Screen>
  );
}