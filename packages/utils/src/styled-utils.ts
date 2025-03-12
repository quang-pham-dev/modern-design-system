import { css } from '@emotion/react';
import type { SpacingValue } from '@modern-design-system/theme';
import { formatSpacing } from './style-utils';

/**
 * Converts kebab-case to camelCase
 * @param str - kebab-case string
 * @returns camelCase string
 */
const kebabToCamelCase = (str: string): string => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * Creates a CSS property with automatic spacing value formatting
 *
 * @param property - CSS property name
 * @param value - Spacing value (number or string)
 * @returns CSS property with formatted value
 */
export const spacingProperty = (
  property: string,
  value: SpacingValue | undefined,
) => {
  if (value === undefined) return '';

  // Convert kebab-case to camelCase for CSS properties
  const camelCaseProperty = kebabToCamelCase(property);

  // Use string interpolation to create the CSS property
  const formattedValue = formatSpacing(value);
  return css({
    [camelCaseProperty]: formattedValue,
  });
};
