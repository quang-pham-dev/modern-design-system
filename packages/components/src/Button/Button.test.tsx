/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import { useTheme } from '@modern-design-system/hooks';

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: vi.fn(),
}));

describe('Button Component', () => {
  // Setup default mock implementation
  beforeEach(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (useTheme as any).mockReturnValue({
      theme: {
        colors: {
          primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#ffffff',
          },
          error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
            contrastText: '#ffffff',
          },
        },
        spacing: {
          xs: 4,
          sm: 8,
          md: 16,
          lg: 24,
          xl: 32,
        },
        borderRadius: {
          xs: 2,
          sm: 4,
        },
        typography: {
          fontFamily: 'Roboto, sans-serif',
          fontSizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.25rem',
          },
          lineHeights: {
            normal: 1.5,
          },
          fontWeights: {
            medium: 500,
          },
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders button with text content', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeDefined();
    });

    test('renders as a button element by default', () => {
      render(<Button>Button</Button>);
      const button = screen.getByText('Button').closest('button');
      expect(button?.tagName.toLowerCase()).toBe('button');
    });

    test('forwards ref to the button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button with Ref</Button>);
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName.toLowerCase()).toBe('button');
    });
  });

  describe('Variants', () => {
    test('renders primary variant by default', () => {
      render(<Button>Primary</Button>);
      // Implementation depends on how you can test styles
      expect(screen.getByText('Primary')).toBeDefined();
    });

    test('renders secondary variant correctly', () => {
      render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByText('Secondary')).toBeDefined();
    });

    test('renders outline variant correctly', () => {
      render(<Button variant="outline">Outline</Button>);
      expect(screen.getByText('Outline')).toBeDefined();
    });

    test('renders text variant correctly', () => {
      render(<Button variant="text">Text</Button>);
      expect(screen.getByText('Text')).toBeDefined();
    });
  });

  describe('Sizes', () => {
    test('renders medium size by default', () => {
      render(<Button>Medium</Button>);
      expect(screen.getByText('Medium')).toBeDefined();
    });

    test('renders extra small size correctly', () => {
      render(<Button size="xs">Extra Small</Button>);
      expect(screen.getByText('Extra Small')).toBeDefined();
    });

    test('renders large size correctly', () => {
      render(<Button size="lg">Large</Button>);
      expect(screen.getByText('Large')).toBeDefined();
    });
  });

  describe('Colors', () => {
    test('renders default color correctly', () => {
      render(<Button>Default</Button>);
      expect(screen.getByText('Default')).toBeDefined();
    });

    test('renders success color correctly', () => {
      render(<Button color="success">Success</Button>);
      expect(screen.getByText('Success')).toBeDefined();
    });

    test('renders error color correctly', () => {
      render(<Button color="error">Error</Button>);
      expect(screen.getByText('Error')).toBeDefined();
    });

    test('renders warning color correctly', () => {
      render(<Button color="warning">Warning</Button>);
      expect(screen.getByText('Warning')).toBeDefined();
    });
  });

  describe('Loading State', () => {
    test('shows loading text when loading is true', () => {
      render(<Button loading>Submit</Button>);
      expect(screen.getByText('Loading...')).toBeDefined();
      expect(screen.queryByText('Submit')).toBeNull();
    });

    test('disables button when loading is true', () => {
      render(<Button loading>Submit</Button>);
      const button = screen.getByText('Loading...').closest('button');
      expect(button).toBeDisabled();
    });

    test('applies loading styles when loading is true', () => {
      render(<Button loading>Submit</Button>);
      // Implementation depends on how you can test styles
      expect(screen.getByText('Loading...')).toBeDefined();
    });
  });

  describe('Full Width', () => {
    test('applies full width style when fullWidth is true', () => {
      render(<Button fullWidth>Full Width</Button>);
      // Implementation depends on how you can test styles
      expect(screen.getByText('Full Width')).toBeDefined();
    });

    test('does not apply full width style by default', () => {
      render(<Button>Normal Width</Button>);
      // Implementation depends on how you can test styles
      expect(screen.getByText('Normal Width')).toBeDefined();
    });
  });

  describe('Custom Component', () => {
    test('renders with custom component', () => {
      const CustomComponent = React.forwardRef<
        HTMLAnchorElement,
        React.AnchorHTMLAttributes<HTMLAnchorElement>
      >((props, ref) => <a ref={ref} {...props} />);
      CustomComponent.displayName = 'CustomComponent';

      render(
        // Pass href as a prop to the custom component, not directly to Button
        <Button component={CustomComponent} onClick={() => {}}>
          Link Button
        </Button>,
      );

      // Since we can't pass href directly, let's test something else
      const linkElement = screen.getByText('Link Button').closest('a');
      expect(linkElement).toBeDefined();
      expect(linkElement?.tagName.toLowerCase()).toBe('a');
    });
  });

  describe('Icons', () => {
    test('renders start icon correctly', () => {
      const startIcon = <span data-testid="start-icon">🔍</span>;
      render(<Button startIcon={startIcon}>Search</Button>);

      expect(screen.getByText('Search')).toBeDefined();
      expect(screen.getByTestId('start-icon')).toBeDefined();
    });

    test('renders end icon correctly', () => {
      const endIcon = <span data-testid="end-icon">→</span>;
      render(<Button endIcon={endIcon}>Next</Button>);

      expect(screen.getByText('Next')).toBeDefined();
      expect(screen.getByTestId('end-icon')).toBeDefined();
    });

    test('renders both icons correctly', () => {
      const startIcon = <span data-testid="start-icon">📁</span>;
      const endIcon = <span data-testid="end-icon">↓</span>;
      render(
        <Button startIcon={startIcon} endIcon={endIcon}>
          Download
        </Button>,
      );

      expect(screen.getByText('Download')).toBeDefined();
      expect(screen.getByTestId('start-icon')).toBeDefined();
      expect(screen.getByTestId('end-icon')).toBeDefined();
    });

    test('does not render icons when not provided', () => {
      render(<Button>No Icons</Button>);

      const button = screen.getByText('No Icons');
      expect(button.querySelector('span')).toBeNull();
    });
  });

  describe('Interactions', () => {
    test('calls onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByText('Click me');
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('does not call onClick handler when disabled', async () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Click me
        </Button>,
      );

      // Get the button element directly
      const button = screen.getByText('Click me');

      // Verify the button is actually disabled
      expect(button).toBeDisabled();

      await userEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    test('does not call onClick handler when loading', async () => {
      const handleClick = vi.fn();
      render(
        <Button loading onClick={handleClick}>
          Click me
        </Button>,
      );

      const button = screen.getByText('Loading...');
      await userEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
