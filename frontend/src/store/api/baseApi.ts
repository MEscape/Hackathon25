import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import Toast from 'react-native-toast-message';

import { AuthTokensSchema } from '@/schemas/auth.schema';
import { oauth2AuthService } from '@/services/authService';
import type { RootState } from '@/store';
import { setTokens, clearAuth } from '@/store/slices/authSlice';
import { safeValidateApiResponse } from '@/utils/validation';
import { translate } from '@/i18n';
import Config from "@/config";

// Helper function to show toast messages based on HTTP status codes
const showApiErrorToast = (status: number | string, data?: any) => {
  let message: string;
  
  switch (status) {
    case 400:
      message = translate('toast:badRequest');
      break;
    case 403:
      message = translate('toast:forbidden');
      break;
    case 404:
      message = translate('toast:notFound');
      break;
    case 408:
      message = translate('toast:requestTimeout');
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      message = translate('toast:serverError');
      break;
    case 'FETCH_ERROR':
    case 'TIMEOUT_ERROR':
      message = translate('toast:networkError');
      break;
    default:
      // Check if there's a custom error message from the server
      if (data?.message) {
        message = data.message;
      } else {
        message = translate('toast:serverError');
      }
  }
  
  Toast.show({
    type: 'error',
    text1: message,
  });
};

const baseQuery = fetchBaseQuery({
  baseUrl: Config.api.baseUrl,
  timeout: Config.api.timeout,
  prepareHeaders: async headers => {
    try {
      const tokens = await oauth2AuthService.getTokens();
      if (tokens?.accessToken) {
        headers.set('Authorization', `Bearer ${tokens.accessToken}`);
      }
    } catch (e) {
      console.warn('Failed to attach auth header:', e);
    }

    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    return headers;
  },
});

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait if refresh is in progress
  if (isRefreshing && refreshPromise) {
    await refreshPromise;
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.auth?.tokens?.refreshToken;

    if (!refreshToken) {
      api.dispatch(clearAuth());
      Toast.show({
        type: 'error',
        text1: translate('toast:sessionExpired'),
      });
      return result;
    }

    // Prevent multiple simultaneous refresh attempts
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = (async () => {
        try {
          const tokens = await oauth2AuthService.refreshAccessToken();

          if (tokens) {
            const validationResult = safeValidateApiResponse(
              AuthTokensSchema,
              tokens
            );

            if (validationResult.success) {
              api.dispatch(setTokens(validationResult.data));
              return true;
            }
          }

          api.dispatch(clearAuth());
          Toast.show({
            type: 'error',
            text1: translate('toast:tokenRefreshFailed'),
          });
          return false;
        } catch (_err) {
          console.log(_err)
          api.dispatch(clearAuth());
          Toast.show({
            type: 'error',
            text1: translate('toast:tokenRefreshFailed'),
          });
          return false;
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      })();

      const refreshSuccess = await refreshPromise;

      if (refreshSuccess) {
        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      await refreshPromise;
      result = await baseQuery(args, api, extraOptions);
    }
  }

  // Show toast for other API errors (not 401, as it's handled above)
  if (result.error && result.error.status !== 401) {
    showApiErrorToast(result.error.status, result.error.data);
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Auth', 'EmergencyContacts', 'DiscoverableUsers'],
  endpoints: () => ({}),
});
