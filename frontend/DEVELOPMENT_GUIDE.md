# SafeNet Frontend - Development Guide

> **Reference Guide for Development Best Practices**  
> Always refer to this guide when working on the SafeNet frontend to maintain consistency and follow established patterns.

## 📁 Project Architecture

### Core Structure
```
src/
├── app/                    # Expo Router pages & layouts
│   ├── (tabs)/            # Tab navigation screens
│   ├── _layout.tsx        # Root layout with providers
│   └── index.tsx          # Welcome/Landing screen
├── components/            # Reusable UI components
├── features/              # Feature-specific modules (create as needed)
├── hooks/                 # Custom React hooks
├── i18n/                  # Internationalization
├── schemas/               # Zod validation schemas
├── screens/               # Screen components
├── services/              # API & external services
├── store/                 # Redux Toolkit store
├── theme/                 # Theming system
└── utils/                 # Utility functions
```

## 🎨 Theming System

### **ALWAYS Use Existing Themes**
- **Theme Context**: Import `useAppTheme()` hook for theme access
- **Themed Styles**: Use `ThemedStyle<T>` for theme-aware styling
- **Color System**: Use `theme.colors.*` instead of hardcoded colors
- **Spacing**: Use `theme.spacing.*` for consistent spacing
- **Typography**: Use `theme.typography.*` for font styles

```typescript
// ✅ CORRECT - Using themed styles
import { useAppTheme } from '@/theme/context';
import type { ThemedStyle } from '@/theme/types';

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.background,
  padding: theme.spacing.md,
  borderRadius: 12,
});

const Component = () => {
  const { themed } = useAppTheme();
  return <View style={themed($container)} />;
};

// ❌ WRONG - Hardcoded values
const $container = {
  backgroundColor: '#ffffff',
  padding: 16,
};
```

### Shared Styles
- **Global Styles**: Add reusable styles to `src/theme/styles.ts`
- **Common Patterns**: Use `$styles.row`, `$styles.flex1`, etc.
- **Error Styles**: Use `$errorContainer` and `$errorText` from shared styles

## 🧩 Predefined Components

### **ALWAYS Use Existing Components**
Available components in `src/components/`:

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `<Screen>` | Screen wrapper with safe areas | `preset`, `contentContainerStyle` |
| `<Text>` | Themed text with i18n support | `preset`, `tx`, `weight`, `size` |
| `<Button>` | Themed button component | `preset`, `text`, `onPress` |
| `<Icon>` | Ionicons with theming | `icon`, `size`, `color` |
| `<Header>` | Navigation header | `title`, `leftIcon`, `rightIcon` |

```typescript
// ✅ CORRECT - Using predefined components
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';

<Screen preset="scroll">
  <Text preset="heading" tx="welcome.title" />
  <Button preset="primary" text="Login" onPress={handleLogin} />
</Screen>

// ❌ WRONG - Creating custom components for existing functionality
import { View, Text as RNText, TouchableOpacity } from 'react-native';
```

## 🏗️ Feature Development

### **Work Within `/src/features` for New Features**
When adding new features, create organized modules:

```
src/features/
├── emergency/
│   ├── components/        # Feature-specific components
│   ├── hooks/            # Feature-specific hooks
│   ├── screens/          # Feature screens
│   ├── services/         # Feature API services
│   └── types.ts          # Feature type definitions
└── evacuation/
    ├── components/
    ├── hooks/
    └── screens/
```

### Feature Module Pattern
```typescript
// src/features/emergency/components/EmergencyCard.tsx
import { useAppTheme } from '@/theme/context';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';

export const EmergencyCard = ({ emergency }: Props) => {
  const { themed } = useAppTheme();
  
  return (
    <View style={themed($card)}>
      <Icon icon="alert-circle" color={theme.colors.error} />
      <Text preset="default" text={emergency.title} />
    </View>
  );
};

const $card: ThemedStyle<ViewStyle> = (theme) => ({
  // Use theme values
});
```

## 🔄 State Management

### Redux Toolkit Patterns
- **API Slices**: Extend `apiSlice` for new endpoints
- **State Slices**: Create feature-specific slices in `src/store/slices/`
- **Hooks**: Use `useAppSelector` and `useAppDispatch`
- **Persistence**: Configure in `src/config/config.redux.ts`

```typescript
// ✅ CORRECT - API slice pattern
export const emergencyApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getEmergencies: builder.query<Emergency[], void>({
      query: () => '/emergencies',
      providesTags: ['Emergency'],
    }),
  }),
});

// ✅ CORRECT - Using hooks
const { data: emergencies, isLoading } = useGetEmergenciesQuery();
const dispatch = useAppDispatch();
const user = useAppSelector(selectUser);
```

## 🌐 Internationalization

### i18n Best Practices
- **Translation Keys**: Use `tx` prop instead of hardcoded text
- **Nested Keys**: Organize translations by feature/screen
- **Type Safety**: Extend `Translations` type for new keys

```typescript
// src/i18n/en.ts
const en = {
  common: {
    ok: 'OK',
    cancel: 'Cancel',
  },
  emergency: {
    title: 'Emergency Alert',
    description: 'Immediate assistance required',
  },
};

// ✅ CORRECT - Using translation keys
<Text tx="emergency.title" />
<Button tx="common.ok" onPress={handleOk} />

// ❌ WRONG - Hardcoded text
<Text text="Emergency Alert" />
```

## 🔐 Authentication & Security

### Auth Patterns
- **OAuth2 Flow**: Use `useAuth()` hook for authentication
- **Token Management**: Handled automatically by `authService`
- **Protected Routes**: Check `isAuthenticated` state
- **Secure Storage**: Use `SecureStore` for sensitive data

```typescript
// ✅ CORRECT - Auth usage
const { login, logout, isAuthenticated, user } = useAuth();

if (!isAuthenticated) {
  return <WelcomeScreen />;
}
```

## 📱 Navigation

### Expo Router Patterns
- **File-based Routing**: Use `src/app/` directory structure
- **Tab Navigation**: Screens in `src/app/(tabs)/`
- **Navigation**: Use `useRouter()` hook
- **Layouts**: Define in `_layout.tsx` files

```typescript
// ✅ CORRECT - Navigation
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/emergency/details');
router.replace('/');
```

## 🎯 Component Development

### Component Patterns
1. **Import Order**: External → Internal → Types
2. **Props Interface**: Define clear TypeScript interfaces
3. **Themed Styles**: Use `ThemedStyle<T>` pattern
4. **Export Pattern**: Named exports preferred

```typescript
// ✅ CORRECT - Component structure
import React from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';

import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import type { ThemedStyle } from '@/theme/types';

interface FeatureCardProps {
  title: string;
  description: string;
  onPress?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  onPress,
}) => {
  const { themed } = useAppTheme();
  
  return (
    <View style={themed($container)}>
      <Text preset="default" text={title} />
      <Text preset="formHelper" text={description} />
    </View>
  );
};

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  padding: theme.spacing.md,
  backgroundColor: theme.colors.card,
  borderRadius: 12,
});
```

## 🛠️ Development Workflow

### Code Quality
- **TypeScript**: Strict typing, no `any` types
- **ESLint**: Follow configured rules
- **Prettier**: Auto-formatting enabled
- **Validation**: Use Zod schemas for API responses

### Performance
- **Memoization**: Use `React.memo`, `useMemo`, `useCallback`
- **Image Optimization**: Use `expo-image` component
- **Bundle Size**: Avoid large dependencies

### Testing & Debugging
- **Development**: Use `npm run android` or `npm run ios`
- **No Expo Go**: Project requires native prebuild
- **Debugging**: Redux DevTools enabled in development

## 📋 Checklist for New Features

- [ ] Created feature directory in `src/features/`
- [ ] Used existing components from `src/components/`
- [ ] Applied theming with `useAppTheme()` hook
- [ ] Added translations to `src/i18n/`
- [ ] Created API slice if needed
- [ ] Added proper TypeScript types
- [ ] Followed file naming conventions
- [ ] Used Redux for state management
- [ ] Implemented proper error handling
- [ ] Added loading states

## 🚫 Common Mistakes to Avoid

1. **❌ Hardcoded colors/spacing** → ✅ Use theme values
2. **❌ Creating custom text components** → ✅ Use `<Text>` component
3. **❌ Direct API calls** → ✅ Use RTK Query slices
4. **❌ Inline styles** → ✅ Use `ThemedStyle` pattern
5. **❌ Hardcoded strings** → ✅ Use i18n with `tx` prop
6. **❌ Manual state management** → ✅ Use Redux Toolkit
7. **❌ Ignoring TypeScript errors** → ✅ Fix all type issues
8. **❌ Not using safe areas** → ✅ Use `<Screen>` component

## 🔗 Key Imports Reference

```typescript
// Theme & Styling
import { useAppTheme } from '@/theme/context';
import type { ThemedStyle } from '@/theme/types';
import { $styles } from '@/theme/styles';

// Components
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';

// State Management
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { apiSlice } from '@/store/api/baseApi';

// Navigation
import { useRouter } from 'expo-router';

// Authentication
import { useAuth } from '@/hooks/useAuth';

// Utilities
import { storage } from '@/utils/storage';
import Config from '@/config';
```

---

**Remember**: This guide ensures consistency, maintainability, and follows the established patterns in the SafeNet codebase. Always refer to existing implementations as examples when in doubt.