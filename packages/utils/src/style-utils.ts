import type { Theme, SpacingValue } from '@modern-design-system/theme';

/**
 * Converts a spacing value to a CSS-compatible string
 * - If value is a number, appends 'px' (e.g., 20 -> '20px')
 * - If value is a string, checks if it's a theme token first, otherwise returns as-is
 *
 * @param value - The spacing value to format
 * @param theme - Optional theme object for token resolution
 * @returns Formatted CSS spacing value
 */
export const formatSpacing = (
  value: SpacingValue | undefined,
  theme?: Theme,
): string | undefined => {
  if (value === undefined) return undefined;

  // If it's a number, convert to pixels
  if (typeof value === 'number') {
    return `${value}px`;
  }

  // If we have a theme and it's a string that might be a theme token
  if (theme && typeof value === 'string' && theme.spacing) {
    // Check if it's a theme spacing token
    const themeSpacing = theme.spacing[value as keyof typeof theme.spacing];
    if (themeSpacing !== undefined) {
      return `${themeSpacing}px`;
    }
  }

  // Otherwise return the string as is
  return value;
};
