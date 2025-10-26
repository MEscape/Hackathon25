const palette = {
  // Stone/Neutral foundation (matching Keycloak theme)
  neutral50: '#fafaf9',
  neutral100: '#f5f5f4',
  neutral200: '#e7e5e4',
  neutral300: '#d6d3d1',
  neutral400: '#a8a29e',
  neutral500: '#78716c',
  neutral600: '#57534e',
  neutral700: '#44403c',
  neutral800: '#292524',
  neutral900: '#1c1917',
  neutral950: '#0c0a09',

  // Primary accent (iOS blue - matching Keycloak)
  primary100: '#E3F2FD',
  primary200: '#90CAF9',
  primary300: '#42A5F5',
  primary400: '#007aff', // iOS system blue
  primary500: '#0056cc', // Darker blue
  primary600: '#004299', // Deep blue

  // Secondary (subtle blue-grays)
  secondary100: '#ECEFF1',
  secondary200: '#CFD8DC',
  secondary300: '#90A4AE',
  secondary400: '#607D8B',
  secondary500: '#455A64',

  // Success states
  success100: '#D1FAE5',
  success500: '#34c759', // iOS green
  success600: '#28a745',

  // Error states
  error100: '#FFCDD2',
  error500: '#ff3b30', // iOS red
  error600: '#e02020',

  // Warning states
  warning500: '#ff9500', // iOS orange
  warning600: '#ff7b00',

  // Info states
  info500: '#007aff',
  info600: '#0056cc',

  // Overlays
  overlay10: 'rgba(0, 0, 0, 0.1)',
  overlay20: 'rgba(0, 0, 0, 0.2)',
  overlay50: 'rgba(0, 0, 0, 0.5)',
} as const;

export const colors = {
  palette,

  transparent: 'rgba(0, 0, 0, 0)',

  // Text colors
  text: palette.neutral900,
  textDim: palette.neutral600,
  textMuted: palette.neutral500,

  // Background colors
  background: palette.neutral50,
  backgroundElevated: '#FFFFFF',
  backgroundMuted: palette.neutral100,

  // Border and separator
  border: palette.neutral200,
  borderStrong: palette.neutral300,
  separator: palette.neutral200,

  // Brand/Tint colors
  tint: palette.primary400,
  tintActive: palette.primary500,
  tintInactive: palette.neutral400,

  // Semantic colors
  error: palette.error500,
  errorBackground: palette.error100,
  success: palette.success500,
  successBackground: palette.success100,
  warning: palette.warning500,
  info: palette.info500,

  // Input states
  inputBackground: '#FFFFFF',
  inputBorder: palette.neutral200,
  inputBorderFocus: palette.primary400,
  inputPlaceholder: palette.neutral400,

  // Card/Surface
  card: '#FFFFFF',
  cardBorder: palette.neutral200,

  // Shadow colors (for use with shadow props)
  shadowColor: '#000000',
} as const;
