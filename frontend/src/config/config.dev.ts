import Constants from 'expo-constants';

const {
    EXPO_PUBLIC_API_BASE_URL,
} = Constants.expoConfig?.extra || {};

/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export default {
    api: {
        baseUrl: EXPO_PUBLIC_API_BASE_URL,
        timeout: 30000,
    },
};
