import React from 'react';
import { useAuthNavigation } from '@/hooks/useAuthNavigation';
import { usePushNotificationsRegistration } from '@/hooks/usePushNotificationsRegistration';

interface AuthNavigationHandlerProps {
  children: React.ReactNode;
}

/**
 * Component that handles authentication-based navigation
 * Must be placed inside Redux Provider context
 */
export const AuthNavigationHandler: React.FC<AuthNavigationHandlerProps> = ({ children }) => {
  useAuthNavigation();
  usePushNotificationsRegistration();
  return <>{children}</>;
};