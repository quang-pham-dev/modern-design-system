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
    expect(icon).toHaveStyle('width: 20px'); // Default size is md
    expect(icon).toHaveStyle('height: 20px');
    expect(icon).toHaveStyle('color: inherit'); // Default color is inherit
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <Icon name="info-circle" size="xs" data-testid="icon" />,
    );
    let icon = screen.getByTestId('icon');
    expect(icon).toHaveStyle('width: 12px');
    expect(icon).toHaveStyle('height: 12px');

    rerender(<Icon name="info-circle" size="sm" data-testid="icon" />);
    icon = screen.getByTestId('icon');
    expect(icon).toHaveStyle('width: 16px');
    expect(icon).toHaveStyle('height: 16px');

    rerender(<Icon name="info-circle" size="lg" data-testid="icon" />);
    icon = screen.getByTestId('icon');
    expect(icon).toHaveStyle('width: 24px');
    expect(icon).toHaveStyle('height: 24px');

    rerender(<Icon name="info-circle" size="xl" data-testid="icon" />);
    icon = screen.getByTestId('icon');
    expect(icon).toHaveStyle('width: 32px');
    expect(icon).toHaveStyle('height: 32px');

    // Test numeric size
    rerender(<Icon name="info-circle" size={40} data-testid="icon" />);
    icon = screen.getByTestId('icon');
    expect(icon).toHaveStyle('width: 40px');
    expect(icon).toHaveStyle('height: 40px');
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

    // Check for animation property with updated animation name
    expect(icon).toHaveStyle('animation: icon-spin 2s infinite linear');
  });

  test('renders with pulse animation', () => {
    render(<Icon name="spinner" pulse data-testid="icon" />);
    const icon = screen.getByTestId('icon');

    // Check for animation property with updated animation name
    expect(icon).toHaveStyle('animation: icon-pulse 1s infinite steps(8)');
  });

  test('has aria-hidden attribute', () => {
    render(<Icon name="info-circle" data-testid="icon" />);
    const icon = screen.getByTestId('icon');

    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  test('renders SVG element', () => {
    render(<Icon name="info-circle" data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    const svg = icon.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  test('renders correct path for icon', () => {
    render(<Icon name="chevron-down" data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    const path = icon.querySelector('path');

    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute(
      'd',
      'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
    );
  });

  test('applies custom styles with sx prop', () => {
    render(
      <Icon name="info-circle" sx={{ margin: '10px' }} data-testid="icon" />,
    );
    const icon = screen.getByTestId('icon');

    expect(icon).toHaveStyle('margin: 10px');
  });
});
