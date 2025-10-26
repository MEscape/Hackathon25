import { getCurrentLocale } from '@/i18n';
import {
  User,
  LoginResponse,
  RefreshTokenResponse,
  UserSchema,
  RefreshTokenResponseSchema,
  LoginResponseSchema,
} from '@/schemas/auth.schema';
import { oauth2AuthService } from '@/services/authService';
import { validateApiResponse } from '@/utils/validation';

import { apiSlice } from './baseApi';

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, void>({
      async queryFn() {
        try {
          const currentLocale = getCurrentLocale();
          const result = await oauth2AuthService.authorize({
            kc_locale: currentLocale,
          });

          if (result.type !== 'success' || !result.params?.code) {
            return {
              error: {
                status: 'CUSTOM_ERROR',
                error: result.error || 'Authorization failed',
              },
            };
          }

          const tokens = await oauth2AuthService.exchangeCodeForTokens(
            result.params.code
          );

          const user = await oauth2AuthService.getUserInfo();

          const credentials = validateApiResponse(LoginResponseSchema, {
            user,
            tokens,
          });

          return { data: credentials };
        } catch (error: any) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : String(error),
            },
          };
        }
      },
      invalidatesTags: ['Auth', 'User'],
    }),

    logout: builder.mutation<unknown, void>({
      async queryFn() {
        try {
          await oauth2AuthService.revokeToken();
          return { data: null };
        } catch (error: any) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : String(error),
            },
          };
        }
      },
      invalidatesTags: ['Auth', 'User'],
    }),

    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      async queryFn() {
        try {
          const tokens = await oauth2AuthService.refreshAccessToken();
          const validatedTokens = validateApiResponse(
            RefreshTokenResponseSchema,
            tokens
          );
          return { data: validatedTokens };
        } catch (error: any) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : String(error),
            },
          };
        }
      },
    }),

    getCurrentUser: builder.query<User, void>({
      async queryFn() {
        try {
          const user = await oauth2AuthService.getUserInfo();
          const validatedUser = validateApiResponse(UserSchema, user);
          return { data: validatedUser };
        } catch (error: any) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : String(error),
            },
          };
        }
      },
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
} = authApi;
