import type { Theme } from './types';

export const generateCSSVariables = (theme: Theme) => `
  :root {
    /* Colors */
    --color-primary-light: ${theme.colors.primary.light};
    --color-primary-main: ${theme.colors.primary.main};
    --color-primary-dark: ${theme.colors.primary.dark};
    --color-primary-contrast: ${theme.colors.primary.contrastText};

    /* Spacing */
    --spacing-xs: ${theme.spacing.xs}px;
    --spacing-sm: ${theme.spacing.sm}px;
    --spacing-md: ${theme.spacing.md}px;
    --spacing-lg: ${theme.spacing.lg}px;
    --spacing-xl: ${theme.spacing.xl}px;

    /* Border Radius */
    --border-radius-sm: ${theme.borderRadius.sm}px;
    --border-radius-md: ${theme.borderRadius.md}px;
    --border-radius-lg: ${theme.borderRadius.lg}px;
    --border-radius-xl: ${theme.borderRadius.xl}px;

    /* Shadows */
    --shadow-sm: ${theme.shadows.sm};
    --shadow-md: ${theme.shadows.md};
    --shadow-lg: ${theme.shadows.lg};
  }
`;
