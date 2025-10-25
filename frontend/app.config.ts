import { ExpoConfig, ConfigContext } from "@expo/config"

/**
 * Use ts-node here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript
 */
require("ts-node/register")

/**
 * @param config ExpoConfig coming from the static config app.json if it exists
 *
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
    const existingPlugins = config.plugins ?? []

    return {
        ...config,
        extra: {
            ...config.extra,
            // Expose environment variables through Expo Constants
            EXPO_PUBLIC_OAUTH_CLIENT_ID: process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID,
            EXPO_PUBLIC_OAUTH_CLIENT_SECRET: process.env.EXPO_PUBLIC_OAUTH_CLIENT_SECRET,
            EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
            EXPO_PUBLIC_OAUTH_REDIRECT_PATH: process.env.EXPO_PUBLIC_OAUTH_REDIRECT_PATH,
            EXPO_PUBLIC_APP_SCHEME: process.env.EXPO_PUBLIC_APP_SCHEME,
            EXPO_PUBLIC_OAUTH_ISSUER: process.env.EXPO_PUBLIC_OAUTH_ISSUER,
        },
        ios: {
            ...config.ios,
            // This privacyManifests is to get you started.
            // See Expo's guide on apple privacy manifests here:
            // https://docs.expo.dev/guides/apple-privacy/
            // You may need to add more privacy manifests depending on your app's usage of APIs.
            // More details and a list of "required reason" APIs can be found in the Apple Developer Documentation.
            // https://developer.apple.com/documentation/bundleresources/privacy-manifest-files
            privacyManifests: {
                NSPrivacyAccessedAPITypes: [
                    {
                        NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryUserDefaults",
                        NSPrivacyAccessedAPITypeReasons: ["CA92.1"], // CA92.1 = "Access info from same app, per documentation"
                    },
                ],
            },
        },
        plugins: [...existingPlugins, require("./plugins/withSplashScreen").withSplashScreen],
    }
}