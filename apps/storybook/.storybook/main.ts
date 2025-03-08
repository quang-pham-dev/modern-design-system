import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname } from 'node:path';
import * as path from 'node:path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    '../../../packages/components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/experimental-addon-test'),
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  babel: async (options: { plugins: string[] }) => {
    options.plugins = options.plugins || [];
    // Make sure @emotion/babel-plugin is first in the plugins list
    options.plugins.unshift('@emotion/babel-plugin');
    return options;
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../../packages/core/src'),
      '@modern-design-system/components': path.resolve(
        __dirname,
        '../../../packages/components/src',
      ),
      '@modern-design-system/theme': path.resolve(
        __dirname,
        '../../../packages/theme/src',
      ),
      '@modern-design-system/hooks': path.resolve(
        __dirname,
        '../../../packages/hooks/src',
      ),
    };

    // Add Emotion plugin configuration for Vite
    config.plugins = config.plugins || [];
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include || []),
        '@emotion/styled',
        '@emotion/react',
      ],
    };

    // Add esbuild configuration for JSX
    config.esbuild = {
      ...config.esbuild,
      jsxInject: `import React from 'react'`,
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
    };

    return config;
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
