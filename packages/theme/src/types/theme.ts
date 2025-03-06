import type { BorderRadius } from './border-radius';
import type { Breakpoints } from './breakpoints';
import type { Colors } from './color';
import type { Shadows } from './shadows';
import type { Spacing } from './spacing';
import type { Typography } from './typography';
import type { ZIndices } from './z-index';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  borderRadius: BorderRadius;
  colors: Colors;
  breakpoints: Breakpoints;
  shadows: Shadows;
  spacing: Spacing;
  typography: Typography;
  zIndex: ZIndices;
}
