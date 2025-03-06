import { lightThemeColors } from './light-theme';
import { spacing } from './spacing';
import { borderRadius } from './border-radius';
import { shadows } from './shadows';
import { typography } from './typography';
import { breakpoints } from './breakpoints';
import { zIndex } from './z-index';

import type { Theme } from '../types';

export const defaultTheme: Theme = {
  mode: 'light',
  colors: lightThemeColors,
  spacing,
  borderRadius,
  shadows,
  typography,
  breakpoints,
  zIndex,
};
