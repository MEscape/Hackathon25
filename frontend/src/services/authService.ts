import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';

import { AuthTokens, User } from '@/schemas/auth.schema';
import Config from "@/config";
import {Platform} from "react-native";

// Enable browser dismissal on iOS
WebBrowser.maybeCompleteAuthSession();

export interface OAuth2Config {
  issuer: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface OAuth2AuthorizationResult {
  type: 'success' | 'error' | 'cancel';
  params?: Record<string, string>;
  error?: string;
}

const ACCESS_TOKEN_KEY = 'oauth2_access_token';
const REFRESH_TOKEN_KEY = 'oauth2_refresh_token';
const TOKEN_METADATA_KEY = 'oauth2_token_metadata';
const STATE_KEY = 'oauth2_state';
const NONCE_KEY = 'oauth2_nonce';
const CODE_VERIFIER_KEY = 'oauth2_code_verifier';

class OAuth2AuthService {
  private static instance: OAuth2AuthService;
  private config: OAuth2Config;
  private discovery: AuthSession.DiscoveryDocument | null = null;

  private constructor() {
    this.config = {
      issuer: Config.oauth.issuer,
      clientId: Config.oauth.clientId,
      clientSecret: Config.oauth.clientSecret,
      redirectUri: makeRedirectUri({
        scheme: Config.oauth.appScheme,
        path: Config.oauth.redirectPath,
      }),
      scopes: Config.oauth.scopes || ['openid', 'email'],
    };
  }

  static getInstance(): OAuth2AuthService {
    if (!OAuth2AuthService.instance) {
      OAuth2AuthService.instance = new OAuth2AuthService();
    }
    return OAuth2AuthService.instance;
  }

  /**
   * Load OAuth2 discovery document from .well-known endpoint
   */
  async loadDiscovery(): Promise<AuthSession.DiscoveryDocument> {
    if (this.discovery) return this.discovery;
    try {
      this.discovery = await AuthSession.fetchDiscoveryAsync(
        this.config.issuer
      );

      if (Platform.OS === 'android' && __DEV__) {
        this.discovery = {
          ...this.discovery,
          ...(this.discovery.authorizationEndpoint && {
            authorizationEndpoint: this.discovery.authorizationEndpoint.replace('localhost', '10.0.2.2'),
          }),
          ...(this.discovery.tokenEndpoint && {
            tokenEndpoint: this.discovery.tokenEndpoint.replace('localhost', '10.0.2.2'),
          }),
          ...(this.discovery.userInfoEndpoint && {
            userInfoEndpoint: this.discovery.userInfoEndpoint.replace('localhost', '10.0.2.2'),
          }),
          ...(this.discovery.revocationEndpoint && {
            revocationEndpoint: this.discovery.revocationEndpoint.replace('localhost', '10.0.2.2'),
          }),
          ...(this.discovery.endSessionEndpoint && {
            endSessionEndpoint: this.discovery.endSessionEndpoint.replace('localhost', '10.0.2.2'),
          }),
        };
      }

      return this.discovery;
    } catch (error) {
      throw new Error(`Failed to load OAuth2 discovery: ${error}`);
    }
  }

  private async saveSecureItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value, { keychainService: 'oauth2' });
  }

  private async getSecureItem(key: string): Promise<string | null> {
    return SecureStore.getItemAsync(key, { keychainService: 'oauth2' });
  }

  private async removeSecureItem(key: string) {
    await SecureStore.deleteItemAsync(key, { keychainService: 'oauth2' });
  }

  private async generateState(): Promise<string> {
    const state = Math.random().toString(36).substring(2);
    await this.saveSecureItem(STATE_KEY, state);
    return state;
  }

  private async generateNonce(): Promise<string> {
    const nonce = Math.random().toString(36).substring(2);
    await this.saveSecureItem(NONCE_KEY, nonce);
    return nonce;
  }

  /**
   * Perform OAuth2 authorization code flow (login/registration)
   */
  async authorize(
    extraParams: Record<string, string> = {}
  ): Promise<OAuth2AuthorizationResult> {
    const discovery = await this.loadDiscovery();
    const state = await this.generateState();
    const nonce = await this.generateNonce();

    const authRequest = new AuthSession.AuthRequest({
      clientId: this.config.clientId,
      redirectUri: this.config.redirectUri,
      scopes: this.config.scopes,
      responseType: AuthSession.ResponseType.Code,
      usePKCE: true,
      state,
      extraParams: {
        nonce,
        ...extraParams,
      },
    });

    try {
      const result = await authRequest.promptAsync(discovery);

      if (result.type === 'success') {
        // validate state
        const storedState = await this.getSecureItem(STATE_KEY);
        if (storedState !== result.params.state) {
          return { type: 'error', error: 'Invalid state returned' };
        }

        await this.saveSecureItem(
          CODE_VERIFIER_KEY,
          authRequest.codeVerifier || ''
        );

        return {
          type: 'success',
          params: {
            code: result.params.code,
          },
        };
      } else if (result.type === 'error') {
        return {
          type: 'error',
          error:
            result.params?.error_description ||
            result.error?.message ||
            'Authorization failed',
        };
      }

      return { type: 'cancel' };
    } catch (error) {
      return {
        type: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async exchangeCodeForTokens(code: string): Promise<AuthTokens> {
    const discovery = await this.loadDiscovery();
    if (!discovery.tokenEndpoint) throw new Error('Token endpoint not found');

    const codeVerifier = await this.getSecureItem(CODE_VERIFIER_KEY);
    if (!codeVerifier)
      throw new Error('Missing code_verifier in secure storage');

    const tokenResponse = await AuthSession.exchangeCodeAsync(
      {
        clientId: this.config.clientId,
        clientSecret: this.config.clientSecret,
        redirectUri: this.config.redirectUri,
        code,
        extraParams: { code_verifier: codeVerifier },
      },
      discovery
    );

    const tokens: AuthTokens = {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken || '',
      expiresIn: tokenResponse.expiresIn || 3600,
      tokenType: tokenResponse.tokenType || 'Bearer',
    };

    // Store tokens separately to avoid SecureStore size limit
    await this.saveSecureItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    await this.saveSecureItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    await this.saveSecureItem(TOKEN_METADATA_KEY, JSON.stringify({
      expiresIn: tokens.expiresIn,
      tokenType: tokens.tokenType,
      timestamp: Date.now()
    }));
    
    return tokens;
  }

  async refreshAccessToken(): Promise<AuthTokens> {
    const discovery = await this.loadDiscovery();
    if (!discovery.tokenEndpoint) throw new Error('Token endpoint not found');

    const stored = await this.getTokens();
    if (!stored?.refreshToken) throw new Error('No refresh token available');

    const tokenResponse = await AuthSession.refreshAsync(
      { clientId: this.config.clientId, clientSecret: this.config.clientSecret, refreshToken: stored.refreshToken },
      discovery
    );

    const tokens: AuthTokens = {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken || stored.refreshToken,
      expiresIn: tokenResponse.expiresIn || 3600,
      tokenType: tokenResponse.tokenType || 'Bearer',
    };

    // Store tokens separately to avoid SecureStore size limit
    await this.saveSecureItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    await this.saveSecureItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    await this.saveSecureItem(TOKEN_METADATA_KEY, JSON.stringify({
      expiresIn: tokens.expiresIn,
      tokenType: tokens.tokenType,
      timestamp: Date.now()
    }));
    
    return tokens;
  }

  async revokeToken(): Promise<void> {
    const discovery = await this.loadDiscovery();
    if (!discovery.revocationEndpoint) return;

    const stored = await this.getTokens();
    if (!stored) return;

    try {
      await AuthSession.revokeAsync(
        {
          clientId: this.config.clientId,
          token: stored.refreshToken || stored.accessToken,
        },
        discovery
      );
    } catch (error) {
      console.warn('Token revocation failed:', error);
    }

    await this.clearTokens();
  }

  async getTokens(): Promise<AuthTokens | null> {
    try {
      const [accessToken, refreshToken, metadataStr] = await Promise.all([
        this.getSecureItem(ACCESS_TOKEN_KEY),
        this.getSecureItem(REFRESH_TOKEN_KEY),
        this.getSecureItem(TOKEN_METADATA_KEY)
      ]);

      if (!accessToken || !refreshToken || !metadataStr) {
        return null;
      }

      const metadata = JSON.parse(metadataStr);
      return {
        accessToken,
        refreshToken,
        expiresIn: metadata.expiresIn,
        tokenType: metadata.tokenType
      };
    } catch (error) {
      console.error('Error retrieving tokens:', error);
      return null;
    }
  }

  async clearTokens() {
    await Promise.all([
      this.removeSecureItem(ACCESS_TOKEN_KEY),
      this.removeSecureItem(REFRESH_TOKEN_KEY),
      this.removeSecureItem(TOKEN_METADATA_KEY),
      this.removeSecureItem(CODE_VERIFIER_KEY),
      this.removeSecureItem(STATE_KEY),
      this.removeSecureItem(NONCE_KEY)
    ]);
  }

  async getUserInfo(): Promise<User> {
    const discovery = await this.loadDiscovery();
    if (!discovery.userInfoEndpoint)
      throw new Error('UserInfo endpoint not found');

    const tokens = await this.getTokens();
    if (!tokens?.accessToken) throw new Error('No access token available');

    const response = await fetch(discovery.userInfoEndpoint, {
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
    });

    if (!response.ok) throw new Error('Failed to fetch user info');
    return response.json();
  }
}

export const oauth2AuthService = OAuth2AuthService.getInstance();
