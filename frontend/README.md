# 📱 SafeNet — Frontend Setup (Expo)

A cross-platform mobile application built with **Expo**, **React Native**, and **TypeScript**, providing real-time disaster awareness, secure routing, and safe communication — powered by **Keycloak OAuth2** and the **SafeNet backend**.

---

## ⚙️ 1. Prerequisites

Before running the project, ensure the following tools are installed:

| Tool               | Version     | Installation Guide                                             |
| ------------------ | ----------- | -------------------------------------------------------------- |
| **Node.js**        | ≥ 20.0      | [Download Node.js](https://nodejs.org/en/download/)            |
| **npm**            | ≥ 10.0      | Comes with Node.js                                             |
| **Expo CLI**       | ≥ 7.0       | `npm install -g expo-cli`                                      |
| **Android Studio** | Latest      | [Install Android Studio](https://developer.android.com/studio) |
| **Java (JDK)**     | ≤ 19 (≤ 17 recommended) | [Download OpenJDK 17](https://adoptium.net/temurin/releases/?version=17) |

> ⚠️ **Important:**  
> Gradle and React Native currently do **not support JDK 20+**.  
> Using Java 21 or newer will cause build errors such as  
> “Unsupported class file major version”.  
> Please use **JDK 17 or 19** instead.

Verify installation:

```bash
node -v
npm -v
expo --version
```

---

## 📁 2. Clone Repository

```bash
git clone https://github.com/<your-org>/SafeNet-App.git
cd SafeNet-App
```

---

## 🌍 3. Environment Configuration

Create a `.env` file in the project root and paste the following:

```bash
# ---------------------------
# OAuth2 Configuration
# ---------------------------
EXPO_PUBLIC_OAUTH_CLIENT_ID=frontend-app
EXPO_PUBLIC_OAUTH_CLIENT_SECRET=change-me
EXPO_PUBLIC_OAUTH_REDIRECT_PATH=/
EXPO_PUBLIC_OAUTH_ISSUER=http://10.0.2.2:8081/realms/safenet

# ---------------------------
# App Configuration
# ---------------------------
EXPO_PUBLIC_APP_SCHEME=safenet
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:8080
```

> 🧠 **Note:**
> `10.0.2.2` points to your host machine when running inside the Android emulator.
> For physical devices or iOS, replace it with your machine’s LAN IP (e.g., `192.168.x.x`).

---

## 📦 4. Install Dependencies

Use npm to install all project dependencies:

```bash
npm install
```

---

## 🚀 5. Running the App (Required: Prebuild)

Since the project uses **MMKV** and the **new architecture**, you **cannot use Expo Go**.
You must always prebuild the native project and run it via the local development build.

### 🧱 Build and Run (Android)

```bash
npm run android
```

This internally executes:

```bash
expo prebuild && expo run:android
```

### 🍏 (Optional) iOS Build

If you’re on macOS and have Xcode installed:

```bash
npm run ios
```

### 🌐 Web Preview (Development Only)

```bash
npm run web
```

---

## 🔐 6. Keycloak Configuration

Make sure your backend’s **Keycloak instance** is running (see backend setup).
Then configure the frontend client:

| Setting                  | Value                                          |
| ------------------------ | ---------------------------------------------- |
| **Realm**                | `safenet`                                      |
| **Client ID**            | `frontend-app`                                 |
| **Access Type**          | Public                                         |
| **Redirect URIs**        | `safenet://*`, `exp://*`, `http://localhost:*` |
| **Web Origins**          | `*`                                            |
| **Direct Access Grants** | Enabled ✅                                      |

> 🔑 This allows Expo’s OAuth2 flow to redirect correctly back into the app after login.

---

## 🧰 7. NPM Scripts

| Script             | Description                                           |
| ------------------ | ----------------------------------------------------- |
| `npm start`        | Start the Expo Metro bundler                          |
| `npm run android`  | Prebuild and launch app on Android emulator/device    |
| `npm run ios`      | Prebuild and launch app on iOS simulator (macOS only) |
| `npm run web`      | Start web version (for UI preview only)               |
| `npm run lint`     | Run ESLint checks                                     |
| `npm run lint:fix` | Auto-fix lint issues                                  |
| `npm run ts:check` | Run TypeScript type checking                          |

---

## 🧩 8. Tech Stack

| Layer                | Technology                    |
| -------------------- | ----------------------------- |
| **Framework**        | Expo (React Native)           |
| **Language**         | TypeScript                    |
| **Navigation**       | Expo Router                   |
| **Auth**             | Keycloak via Expo AuthSession |
| **State Management** | Redux Toolkit + Persist       |
| **Storage**          | MMKV (native, encrypted)      |
| **Localization**     | i18next + react-i18next       |
| **Animations**       | React Native Reanimated       |
| **Validation**       | Zod                           |
| **UI System**        | Custom Theming (light/dark)   |

---

## ⚙️ 9. Development Notes

* 🚫 **Do not use Expo Go.** MMKV and new-architecture libraries require native prebuild.
* ✅ Always run using `npm run android` or `npm run ios`.
* 🔄 After editing native modules or `.env` values, re-run `expo prebuild`.
* 🧠 Backend and Keycloak must both be running locally (see backend README).

---

## 🧪 10. Troubleshooting

| Issue                                 | Possible Cause / Fix                                       |
| ------------------------------------- | ---------------------------------------------------------- |
| **App fails to launch after changes** | Run `expo prebuild --clean && npm run android`.            |
| **Network request failed**            | Use `10.0.2.2` instead of `localhost` for emulator access. |
| **Redirect URI mismatch**             | Check Keycloak client → Valid Redirect URIs.               |
| **Invalid token or 401**              | Ensure Keycloak realm and issuer match `.env` config.      |
| **MMKV build errors**                 | Clear build folders: `rm -rf android && expo prebuild`.    |

---

## 🧠 11. Quick Lookup

| Action                 | Command                            |
| ---------------------- | ---------------------------------- |
| Install deps           | `npm install`                      |
| Run Android            | `npm run android`                  |
| Run iOS (macOS only)   | `npm run ios`                      |
| Lint & Type check      | `npm run lint && npm run ts:check` |
| Rebuild native project | `expo prebuild --clean`            |
 | Fix Path Length Error | https://github.com/AppAndFlow/react-native-safe-area-context/issues/424#issuecomment-2454869033 |