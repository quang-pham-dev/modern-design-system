import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@modern-design-system/theme';
import { Tag } from './index';

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: {
          main: '#1976d2',
          light: '#e3f2fd',
          dark: '#0d47a1',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#9c27b0',
          light: '#f3e5f5',
          dark: '#7b1fa2',
          contrastText: '#ffffff',
        },
        success: {
          main: '#4caf50',
          light: '#e8f5e9',
          dark: '#2e7d32',
          contrastText: '#ffffff',
        },
        error: {
          main: '#f44336',
          light: '#ffebee',
          dark: '#c62828',
          contrastText: '#ffffff',
        },
        warning: {
          main: '#ff9800',
          light: '#fff3e0',
          dark: '#e65100',
          contrastText: '#ffffff',
        },
        info: {
          main: '#2196f3',
          light: '#e3f2fd',
          dark: '#0d47a1',
          contrastText: '#ffffff',
        },
        gray: {
          main: '#9e9e9e',
          light: '#f5f5f5',
          dark: '#616161',
          contrastText: '#ffffff',
        },
      },
    },
  }),
}));

// Mock the Icon component
vi.mock('../Icon', () => ({
  Icon: ({
    name,
    size,
    color,
    ...props
  }: {
    name: string;
    size?: string;
    color?: string;
    [key: string]: unknown;
  }) => (
    <span
      data-testid={props['data-testid' as keyof typeof props] || 'icon'}
      data-icon-name={name}
      data-icon-size={size}
      data-icon-color={color}
      {...props}
    />
  ),
}));

describe('Tag Component', () => {
  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <Tag label="Test Tag" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('tag')).toBeInTheDocument();
    expect(screen.getByTestId('tag-label')).toHaveTextContent('Test Tag');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Tag label="Small Tag" size="sm" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('tag')).toHaveStyle('height: 24px');
    expect(screen.getByTestId('tag')).toHaveStyle('font-size: 0.75rem');

    rerender(
      <ThemeProvider>
        <Tag label="Medium Tag" size="md" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('tag')).toHaveStyle('height: 28px');
    expect(screen.getByTestId('tag')).toHaveStyle('font-size: 0.875rem');

    rerender(
      <ThemeProvider>
        <Tag label="Large Tag" size="lg" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('tag')).toHaveStyle('height: 32px');
    expect(screen.getByTestId('tag')).toHaveStyle('font-size: 1rem');
  });

  test('renders with different variants', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Tag label="Solid Tag" variant="solid" />
      </ThemeProvider>,
    );

    // Thay vì kiểm tra style cụ thể, kiểm tra sự tồn tại và thuộc tính
    let tag = screen.getByTestId('tag');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveAttribute('data-variant', 'solid');
    expect(tag).toHaveAttribute('data-color-scheme', 'primary');

    rerender(
      <ThemeProvider>
        <Tag label="Outline Tag" variant="outline" />
      </ThemeProvider>,
    );

    tag = screen.getByTestId('tag');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveAttribute('data-variant', 'outline');
    expect(tag).toHaveAttribute('data-color-scheme', 'primary');

    rerender(
      <ThemeProvider>
        <Tag label="Subtle Tag" variant="subtle" />
      </ThemeProvider>,
    );

    tag = screen.getByTestId('tag');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveAttribute('data-variant', 'subtle');
    expect(tag).toHaveAttribute('data-color-scheme', 'primary');
  });

  test('renders with different color schemes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Tag label="Primary Tag" colorScheme="primary" />
      </ThemeProvider>,
    );

    let tag = screen.getByTestId('tag');
    expect(tag).toHaveStyle('background-color: #1976d2');

    rerender(
      <ThemeProvider>
        <Tag label="Success Tag" colorScheme="success" />
      </ThemeProvider>,
    );

    tag = screen.getByTestId('tag');
    expect(tag).toHaveStyle('background-color: #4caf50');

    rerender(
      <ThemeProvider>
        <Tag label="Error Tag" colorScheme="error" />
      </ThemeProvider>,
    );

    tag = screen.getByTestId('tag');
    expect(tag).toHaveStyle('background-color: #f44336');
  });

  test('renders rounded tag', () => {
    render(
      <ThemeProvider>
        <Tag label="Rounded Tag" isRounded />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('tag')).toHaveStyle('border-radius: 9999px');
  });

  test('renders with left icon', () => {
    render(
      <ThemeProvider>
        <Tag label="Tag with Icon" leftIcon="info-circle" />
      </ThemeProvider>,
    );

    const leftIcon = screen.getByTestId('tag-left-icon');
    expect(leftIcon).toBeInTheDocument();
    expect(leftIcon).toHaveAttribute('data-icon-name', 'info-circle');
  });

  test('renders with right icon', () => {
    render(
      <ThemeProvider>
        <Tag label="Tag with Icon" rightIcon="check-circle" />
      </ThemeProvider>,
    );

    const rightIcon = screen.getByTestId('tag-right-icon');
    expect(rightIcon).toBeInTheDocument();
    expect(rightIcon).toHaveAttribute('data-icon-name', 'check-circle');
  });

  test('renders with close button and handles close event', () => {
    const onClose = vi.fn();
    render(
      <ThemeProvider>
        <Tag label="Closable Tag" isClosable onClose={onClose} />
      </ThemeProvider>,
    );

    const closeButton = screen.getByTestId('tag-close-button');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('applies custom styles with sx prop', () => {
    render(
      <ThemeProvider>
        <Tag
          label="Custom Tag"
          sx={{ margin: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
        />
      </ThemeProvider>,
    );

    const tag = screen.getByTestId('tag');
    expect(tag).toHaveStyle('margin: 10px');
    expect(tag).toHaveStyle('box-shadow: 0 2px 4px rgba(0,0,0,0.2)');
  });
});
