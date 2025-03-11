import { css } from '@emotion/react';
import type { SpacingValue } from '@modern-design-system/theme';
import { formatSpacing } from './style-utils';

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

  // Use string interpolation to create the CSS property
  const formattedValue = formatSpacing(value);
  return css({
    [property]: formattedValue,
  });
};
