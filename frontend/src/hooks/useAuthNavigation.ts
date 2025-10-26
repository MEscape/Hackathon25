import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated, selectAuthLoading } from '@/store/slices/authSlice';

export const useAuthNavigation = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // On app startup, sync tokens from storage
    if (!hasInitialized.current) {
      hasInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    // Only handle navigation after initial sync is complete
    if (hasInitialized.current && !isLoading) {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/');
      }
    }
  }, [isAuthenticated, isLoading, router]);
};