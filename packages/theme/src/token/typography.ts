import type { Typography } from '../types';
const baseFontSize = 16;
const pxToRem = (px: number) => `${px / baseFontSize}rem`;

export const typography: Typography = {
  fontSizes: {
    xs: pxToRem(12), // 0.75rem
    sm: pxToRem(14), // 0.875rem
    base: pxToRem(16), // 1rem
    lg: pxToRem(18), // 1.125rem
    xl: pxToRem(20), // 1.25rem
    '2xl': pxToRem(24), // 1.5rem
    '3xl': pxToRem(28), // 1.75rem
    '4xl': pxToRem(32), // 2rem
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  fontFamily: {
    sans: [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    serif: ['"Times New Roman"', 'Times', 'serif'].join(','),
    mono: [
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      '"Liberation Mono"',
      '"Courier New"',
      'monospace',
    ].join(','),
  },
};
