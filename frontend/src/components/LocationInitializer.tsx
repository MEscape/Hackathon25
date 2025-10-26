import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { LocationPermissionModal } from '@/components/LocationPermissionModal';
import { useLocation } from '@/hooks/useLocation';
import { RootState } from '@/store';

interface LocationInitializerProps {
  children: React.ReactNode;
}

export const LocationInitializer: React.FC<LocationInitializerProps> = ({
  children,
}) => {
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const {
    hasRequestedPermissions,
    hasPermission,
    isInitialized,
    initializeLocationService,
  } = useLocation();

  // Get auth state to check if user is logged in
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    // Only initialize location service if user is authenticated
    if (isAuthenticated && !isInitialized) {
      initializeLocationService();
    }
  }, [isAuthenticated, isInitialized, initializeLocationService]);

  useEffect(() => {
    // Show permission modal if:
    // 1. User is authenticated
    // 2. Location service is initialized
    // 3. Permissions haven't been requested yet
    // 4. User doesn't have permission yet
    if (
      isAuthenticated &&
      isInitialized &&
      !hasRequestedPermissions &&
      !hasPermission
    ) {
      setShowPermissionModal(true);
    }
  }, [isAuthenticated, isInitialized, hasRequestedPermissions, hasPermission]);

  const handlePermissionModalComplete = () => {
    setShowPermissionModal(false);
  };

  return (
    <>
      {children}
      <LocationPermissionModal
        visible={showPermissionModal}
        onComplete={handlePermissionModalComplete}
      />
    </>
  );
};
