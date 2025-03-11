import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

import { Icon } from './index';
import { useTheme } from '@modern-design-system/hooks';

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: vi.fn(),
}));

describe('Icon Component', () => {
  // Setup default mock implementation
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: {
        colors: {
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#9c27b0',
          },
          success: {
            main: '#4caf50',
          },
          error: {
            main: '#f44336',
          },
          warning: {
            main: '#ff9800',
          },
          info: {
            main: '#2196f3',
          },
        },
        typography: {
          fontSizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
          },
        },
      },
    });
  });

  test('renders with default props', () => {
    render(<Icon name="info-circle" data-testid="icon" />);
    const icon = screen.getByTestId('icon');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle('font-size: 1rem'); // Default size is md
    expect(icon).toHaveStyle('color: inherit'); // Default color is inherit
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <Icon name="info-circle" size="xs" data-testid="icon" />,
    );
    let icon = screen.getByTestId('icon');
    expect(icon).toHaveStyle('font-size: 0.75rem');

    rerender(<Icon name="info-circle" size="sm" data-testid="icon" />);
    icon = screen.getByTestId('icon');
    expect(icon).toHaveStyle('font-size: 0.875rem');

    rerender(<Icon name="info-circle" size="lg" data-testid="icon" />);
    icon = screen.getByTestId('icon');
    expect(icon).toHaveStyle('font-size: 1.25rem');

    rerender(<Icon name="info-circle" size="xl" data-testid="icon" />);
    icon = screen.getByTestId('icon');
    expect(icon).toHaveStyle('font-size: 1.5rem');
  });

  test('renders with different colors', () => {
    const { rerender } = render(
      <Icon name="info-circle" color="primary" data-testid="icon" />,
    );
    let icon = screen.getByTestId('icon');
    expect(icon).toHaveStyle('color: #1976d2');

    rerender(<Icon name="info-circle" color="success" data-testid="icon" />);
    icon = screen.getByTestId('icon');
    expect(icon).toHaveStyle('color: #4caf50');

    rerender(<Icon name="info-circle" color="error" data-testid="icon" />);
    icon = screen.getByTestId('icon');
    expect(icon).toHaveStyle('color: #f44336');
  });

  test('renders with spin animation', () => {
    render(<Icon name="spinner" spin data-testid="icon" />);
    const icon = screen.getByTestId('icon');

    // Check for animation property without using stringContaining
    expect(icon).toHaveStyle('animation: fa-spin 2s infinite linear');
  });

  test('renders with pulse animation', () => {
    render(<Icon name="spinner" pulse data-testid="icon" />);
    const icon = screen.getByTestId('icon');

    // Check for animation property without using stringContaining
    expect(icon).toHaveStyle('animation: fa-pulse 1s infinite steps(8)');
  });

  test('has aria-hidden attribute', () => {
    render(<Icon name="info-circle" data-testid="icon" />);
    const icon = screen.getByTestId('icon');

    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
