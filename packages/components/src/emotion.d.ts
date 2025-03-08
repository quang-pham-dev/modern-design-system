import '@emotion/react';
import type { Theme as ModernDesignSystemTheme } from '@modern-design-system/theme';

declare module '@emotion/react' {
  export type Theme = ModernDesignSystemTheme;
}
