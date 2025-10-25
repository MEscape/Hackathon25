import React from 'react';
import { useAuthNavigation } from '@/hooks/useAuthNavigation';

interface AuthNavigationHandlerProps {
  children: React.ReactNode;
}

/**
 * Component that handles authentication-based navigation
 * Must be placed inside Redux Provider context
 */
export const AuthNavigationHandler: React.FC<AuthNavigationHandlerProps> = ({ children }) => {
  useAuthNavigation();
  return <>{children}</>;
};