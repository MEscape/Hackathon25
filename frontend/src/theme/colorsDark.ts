const palette = {
  // Stone/Neutral foundation - Dark mode (matching Keycloak theme)
  neutral50: '#0c0a09',
  neutral100: '#1c1917',
  neutral200: '#292524',
  neutral300: '#44403c',
  neutral400: '#57534e',
  neutral500: '#78716c',
  neutral600: '#a8a29e',
  neutral700: '#d6d3d1',
  neutral800: '#e7e5e4',
  neutral900: '#f5f5f4',
  neutral950: '#fafaf9',

  // Primary accent (iOS blue - adjusted for dark mode)
  primary100: '#004299',
  primary200: '#0056cc',
  primary300: '#007aff',
  primary400: '#3d94ff',
  primary500: '#90CAF9',
  primary600: '#E3F2FD',

  // Secondary (subtle blue-grays, adjusted for dark)
  secondary100: '#263238',
  secondary200: '#37474F',
  secondary300: '#607D8B',
  secondary400: '#90A4AE',
  secondary500: '#CFD8DC',

  // Success states
  success100: '#0f4229',
  success500: '#34c759',
  success600: '#6ee7b7',

  // Error states
  error100: '#4B1A15',
  error500: '#ff3b30',
  error600: '#ff6b6b',

  // Warning states
  warning500: '#ff9500',
  warning600: '#ffb340',

  // Info states
  info500: '#007aff',
  info600: '#3d94ff',

  // Overlays (lighter for dark mode)
  overlay10: 'rgba(255, 255, 255, 0.1)',
  overlay20: 'rgba(255, 255, 255, 0.2)',
  overlay50: 'rgba(255, 255, 255, 0.5)',
} as const;

export const colors = {
  palette,

  transparent: 'rgba(0, 0, 0, 0)',

  // Text colors
  text: palette.neutral950,
  textDim: palette.neutral700,
  textMuted: palette.neutral600,

  // Background colors
  background: '#0a0a0a', // Pure dark background
  backgroundElevated: '#1a1a1a', // Cards/elevated surfaces
  backgroundMuted: palette.neutral100,

  // Border and separator
  border: '#2a2a2a',
  borderStrong: palette.neutral300,
  separator: '#2a2a2a',

  // Brand/Tint colors
  tint: palette.primary300,
  tintActive: palette.primary400,
  tintInactive: palette.neutral500,

  // Semantic colors
  error: palette.error500,
  errorBackground: palette.error100,
  success: palette.success500,
  successBackground: palette.success100,
  warning: palette.warning500,
  info: palette.info500,

  // Input states
  inputBackground: '#1a1a1a',
  inputBorder: '#2a2a2a',
  inputBorderFocus: palette.primary300,
  inputPlaceholder: palette.neutral500,

  // Card/Surface
  card: '#1a1a1a',
  cardBorder: '#2a2a2a',

  // Shadow colors (for use with shadow props)
  shadowColor: '#000000',
} as const;