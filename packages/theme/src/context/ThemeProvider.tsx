import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import type React from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import {
  borderRadius,
  breakpoints,
  darkThemeColors,
  lightThemeColors,
  shadows,
  spacing,
  typography,
  zIndex,
} from '../token';
import type { Theme, ThemeMode } from '../types';

export interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  theme: Theme;
}

const THEME_STORAGE_KEY = 'preferred-theme';

// Create context with more meaningful default values
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  storageKey = THEME_STORAGE_KEY,
}) => {
  // Initialize theme from localStorage or system preference if available
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Check for saved theme preference
    const savedTheme =
      typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // Check for system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      return prefersDark ? 'dark' : defaultTheme;
    }

    return defaultTheme;
  });

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem(storageKey, mode);
    // Optional: update document attributes for better integration with CSS
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode, storageKey]);

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const setTheme = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
  }, []);

  const theme: Theme = useMemo(
    () => ({
      mode,
      colors: mode === 'light' ? lightThemeColors : darkThemeColors,
      spacing,
      borderRadius,
      shadows,
      typography,
      breakpoints,
      zIndex,
    }),
    [mode],
  );

  const value = useMemo(
    () => ({
      mode,
      toggleTheme,
      setTheme,
      theme,
    }),
    [mode, toggleTheme, setTheme, theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};
