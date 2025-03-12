import { css, type CSSObject, type SerializedStyles } from '@emotion/react';

// Helper function to safely process sx prop
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
