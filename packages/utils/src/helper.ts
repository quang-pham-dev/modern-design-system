/**
 * @file Helper utilities for the design system
 * @module utils/helper
 */

import { css, type CSSObject, type SerializedStyles } from '@emotion/react';
import type React from 'react';

/**
 * Processes the sx prop used across components to apply custom styles
 *
 * This utility safely handles different types of style inputs and converts them
 * to a format compatible with emotion's styling system. It can process:
 * - SerializedStyles objects (from emotion's css function)
 * - React.CSSProperties objects (standard style objects)
 * - Record objects with custom style definitions
 *
 * @param {React.CSSProperties | SerializedStyles | Record<string, unknown> | undefined} sx - The style object to process
 * @returns {SerializedStyles | string} A processed style object compatible with emotion's css prop
 *
 * @example
 * // In a component:
 * <Box css={processSxProp(props.sx)} />
 */
export const processSxProp = (
  sx:
    | React.CSSProperties
    | SerializedStyles
    | Record<string, unknown>
    | undefined,
) => {
  if (!sx) return '';

  // If it's already a SerializedStyles object, return it directly
  if (typeof (sx as SerializedStyles).styles === 'string') {
    return sx as SerializedStyles;
  }

  // Convert to CSSObject to ensure compatibility with emotion's css function
  return css(sx as CSSObject);
};
