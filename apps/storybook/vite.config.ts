import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../packages/core/src'),
      '@modern-design-system/core': path.resolve(
        __dirname,
        '../../packages/core/src',
      ),
      '@modern-design-system/hooks': path.resolve(
        __dirname,
        '../../packages/hooks/src',
      ),
      '@modern-design-system/tokens': path.resolve(
        __dirname,
        '../../packages/tokens/src',
      ),
      '@modern-design-system/utils': path.resolve(
        __dirname,
        '../../packages/utils/src',
      ),
    },
  },
});
