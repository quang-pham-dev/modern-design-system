import { use } from 'react';

import { ThemeContext } from '@modern-design-system/theme';

export const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};
