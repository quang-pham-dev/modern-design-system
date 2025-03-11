export interface Spacing {
  none: number; // 0px
  xxs: number; // 1px
  xs: number; // 2px
  sm: number; // 4px
  md: number; // 8px
  lg: number; // 16px
  xl: number; // 24px
  '2xl': number; // 32px
  '3xl': number; // 48px
  // '3xs': number; // 3px
  // '5xs': number; // 5px
}

/**
 * Type utility for spacing values
 * Accepts either a number (automatically converted to px) or a string (used as-is)
 */
export type SpacingValue = number | string;
