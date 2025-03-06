// Import the flat config from your package
import eslintConfig from '@modern-design-system/eslint-config';

// Add overrides for specific files
const config = [
  ...eslintConfig,
  {
    files: [
      '**/hooks/**/*.ts',
      '**/theme/types.ts',
      '**/components/**/**.types.ts',
    ],
    rules: {
      'no-unused-vars': 'off', // Disable no-unused-vars for these files
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['**/useFocusVisible.ts'],
    rules: {
      'no-console': 'off', // Allow console in this specific file
    },
  },
];

// Export the configuration properly
export default config;
