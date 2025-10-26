import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/authSlice';
import { useRegisterExpoPushTokenMutation } from '@/store/api/userMetadataApi';

export const usePushNotificationsRegistration = () => {
  const user = useAppSelector(selectUser);
  const [registerExpoPushToken] = useRegisterExpoPushTokenMutation();
  const registeredRef = useRef<string | null>(null);

  useEffect(() => {
    const setupAndroidChannel = async () => {
      try {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          sound: 'default',
        });
      } catch (e) {
        console.log('Failed to set Android notification channel', e);
      }
    };
    if (Constants.platform?.android) {
      setupAndroidChannel();
    }
  }, []);

  useEffect(() => {
    const registerToken = async () => {
      if (Platform.OS === 'web') return;
      if (!user?.sub) return;

      try {
        let { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          const req = await Notifications.requestPermissionsAsync();
          status = req.status;
        }
        if (status !== 'granted') return;

        const projectId = Constants.expoConfig?.extra?.eas?.projectId as string | undefined;
        const tokenData = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined);
        const expoPushToken = (tokenData as any)?.data ?? (tokenData as any);

        if (!expoPushToken || registeredRef.current === expoPushToken) return;

        await registerExpoPushToken({ userId: user.sub, token: expoPushToken }).unwrap();
        registeredRef.current = expoPushToken;
      } catch (e) {
        console.log('Failed to register Expo push token', e);
      }
    };

    registerToken();
  }, [user?.sub, registerExpoPushToken]);
};