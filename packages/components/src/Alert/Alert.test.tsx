import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

import { Alert } from './index';
import { useTheme } from '@modern-design-system/hooks';

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: vi.fn(),
}));

// Mock the Icon component
vi.mock('../Icon', () => ({
  Icon: ({ name, size }: { name: string; size: string }) => (
    <div data-testid={`icon-${name}`} data-size={size}>
      {name}
    </div>
  ),
}));

describe('Alert Component', () => {
  // Setup default mock implementation
  // Add this to the theme mock in the beforeEach function
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: {
        colors: {
          info: {
            main: '#2196f3',
            light: '#e3f2fd',
            dark: '#0d47a1',
            contrastText: '#ffffff',
          },
          success: {
            main: '#4caf50',
            light: '#e8f5e9',
            dark: '#1b5e20',
            contrastText: '#ffffff',
          },
          warning: {
            main: '#ff9800',
            light: '#fff3e0',
            dark: '#e65100',
            contrastText: '#ffffff',
          },
          error: {
            main: '#f44336',
            light: '#ffebee',
            dark: '#b71c1c',
            contrastText: '#ffffff',
          },
          text: {
            primary: '#212121',
            secondary: '#757575',
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
          },
          fontWeights: {
            normal: 400,
            medium: 500,
            bold: 700,
          },
          lineHeights: {
            none: 1,
            tight: 1.25,
            normal: 1.5,
            relaxed: 1.75,
          },
        },
        borderRadius: {
          sm: 4,
          md: 8,
          lg: 16,
        },
        spacing: {
          xs: 4,
          sm: 8,
          md: 16,
          lg: 24,
          xl: 32,
        },
      },
    });
  });

  test('renders with default props', () => {
    render(<Alert>This is an info alert</Alert>);

    expect(screen.getByText('This is an info alert')).toBeInTheDocument();
    expect(screen.getByTestId('icon-info-circle')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('renders with title', () => {
    render(<Alert title="Alert Title">This is an alert with title</Alert>);

    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('This is an alert with title')).toBeInTheDocument();
  });

  test('renders with different variants', () => {
    const { rerender } = render(<Alert variant="success">Success alert</Alert>);
    expect(screen.getByTestId('icon-check-circle')).toBeInTheDocument();

    rerender(<Alert variant="warning">Warning alert</Alert>);
    expect(screen.getByTestId('icon-exclamation-triangle')).toBeInTheDocument();

    rerender(<Alert variant="error">Error alert</Alert>);
    expect(screen.getByTestId('icon-exclamation-circle')).toBeInTheDocument();
  });

  test('renders with close button when closable is true', () => {
    const handleClose = vi.fn();
    render(
      <Alert closable onClose={handleClose}>
        Closable alert
      </Alert>,
    );

    const closeButton = screen.getByRole('button', { name: /close alert/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not render close button when closable is false', () => {
    render(<Alert>Non-closable alert</Alert>);

    const closeButton = screen.queryByRole('button', { name: /close alert/i });
    expect(closeButton).not.toBeInTheDocument();
  });
});
