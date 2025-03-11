import type { Theme } from '@modern-design-system/theme';

/**
 * Safely access theme values with fallbacks
 * @param theme The theme object
 * @param path Array of keys to access nested theme properties
 * @param fallback Fallback value if the theme property doesn't exist
 * @returns The theme value or fallback
 */
export const getThemeValue = <T>(
  theme: Theme,
  path: string[],
  fallback: T,
): T => {
  let value: unknown = theme;

  for (const key of path) {
    if (!value || typeof value !== 'object') return fallback;
    value = (value as Record<string, unknown>)[key];
  }

  return (value as T) ?? fallback;
};

/**
 * Get spacing value from theme
 * @param theme The theme object
 * @param size Spacing size key
 * @param fallback Fallback value in pixels
 * @returns Spacing value with 'px' suffix
 */
export const getSpacing = (
  theme: Theme,
  size: string,
  fallback: number,
): string => `${getThemeValue(theme, ['spacing', size], fallback)}px`;

/**
 * Get color value from theme
 * @param theme The theme object
 * @param colorPath Path to color (e.g. ['primary', 'main'])
 * @param fallback Fallback color value
 * @returns Color value
 */
export const getColor = (
  theme: Theme,
  colorPath: string[],
  fallback: string,
): string => getThemeValue(theme, ['colors', ...colorPath], fallback);

/**
 * Get border radius value from theme
 * @param theme The theme object
 * @param size Border radius size key
 * @param fallback Fallback value in pixels
 * @returns Border radius value with 'px' suffix
 */
export const getBorderRadius = (
  theme: Theme,
  size: string,
  fallback: number,
): string => `${getThemeValue(theme, ['borderRadius', size], fallback)}px`;

/**
 * Get typography value from theme
 * @param theme The theme object
 * @param property Typography property (e.g. 'fontSizes', 'fontWeights')
 * @param key Property key
 * @param fallback Fallback value
 * @returns Typography value
 */
export const getTypography = <T>(
  theme: Theme,
  property: string,
  key: string,
  fallback: T,
): T => getThemeValue(theme, ['typography', property, key], fallback);
