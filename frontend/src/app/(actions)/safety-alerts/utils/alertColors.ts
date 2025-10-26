import type { Theme } from '@/theme/types';

export function getSeverityColor(
  theme: Theme,
  severity: string | undefined
): string {
  switch (severity?.toLowerCase()) {
    case 'high':
    case 'severe':
      return theme.colors.error;
    case 'medium':
    case 'moderate':
      return theme.colors.warning;
    case 'low':
    case 'minor':
      return theme.colors.success;
    default:
      return theme.colors.tint;
  }
}

export function getAwarenessLevelColor(
  theme: Theme,
  level: number | undefined
): string {
  if (!level || level <= 1) return theme.colors.success;
  if (level >= 4) return theme.colors.error;
  if (level >= 3) return theme.colors.warning;
  return theme.colors.warning;
}
