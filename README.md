# Modern Design System

A comprehensive and scalable design system built with React and TypeScript, providing a collection of reusable components and utilities for building modern web applications.

## Overview

This project is a monorepo built with Turborepo that provides a robust foundation for creating consistent and maintainable user interfaces. It includes a complete set of design tokens, React components, and development tools to streamline the UI development process.

## Key Features

- 🎨 **Consistent Design Language**: Unified design tokens and theming system
- 📦 **Component Library**: Pre-built, customizable React components
- 🛠️ **Developer Tools**: Modern development workflow with TypeScript and ESLint
- 📱 **Responsive Design**: Mobile-first approach with flexible layouts
- 🧪 **Testing Utilities**: Comprehensive testing setup with Vitest
- 📚 **Interactive Documentation**: Storybook integration for component showcasing

## Project Structure

### Apps

- `web`: Main Next.js application showcasing the design system
- `storybook`: Interactive component documentation and development environment

### Packages

- `@modern-design-system/components`: Core React components library
- `@modern-design-system/theme`: Design tokens and theming system
- `@modern-design-system/hooks`: Custom React hooks collection
- `@modern-design-system/utils`: Shared utility functions
- `@modern-design-system/eslint-config`: ESLint configurations
- `@modern-design-system/typescript-config`: TypeScript configurations

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm 8.x or later

### Installation

```bash
# Clone the repository
git clone https://github.com/quang-pham-dev/modern-design-system.git

# Install dependencies
pnpm install
```

### Development

```bash
# Start development environment
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Development Workflow

### Component Development

1. Create new components in `packages/core/src/components`
2. Add stories in Storybook for visual testing and documentation
3. Write unit tests using Vitest
4. Update documentation as needed

### Quality Assurance

- TypeScript for type safety
- ESLint for code quality
- Prettier for consistent formatting
- Vitest for unit testing
- Storybook for visual testing

## Remote Caching

This project uses Turborepo's Remote Caching feature to optimize build times across team members and CI/CD pipelines. To enable Remote Caching:

```bash
# Login to your Vercel account
npx turbo login

# Link your project to Remote Cache
npx turbo link
```

## Author

Quang Pham - Creator and maintainer of Modern Design System

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Resources

- [Documentation](https://modern-design-system.com)
- [Component Storybook](https://modern-design-system-storybook.com)
- [GitHub Repository](https://github.com/quang-pham-dev/modern-design-system)

---

Built with ❤️ using [Turborepo](https://turbo.build/repo) and [React](https://reactjs.org)
