import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

import { Toast } from './index';
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

describe('Toast Component', () => {
  // Setup default mock implementation
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

    // Mock timers
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  test('renders with default props', () => {
    render(<Toast>This is a toast message</Toast>);

    expect(screen.getByText('This is a toast message')).toBeInTheDocument();
    expect(screen.getByTestId('icon-info-circle')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('renders with title', () => {
    render(<Toast title="Toast Title">This is a toast with title</Toast>);

    expect(screen.getByText('Toast Title')).toBeInTheDocument();
    expect(screen.getByText('This is a toast with title')).toBeInTheDocument();
  });

  test('renders with different variants', () => {
    const { rerender } = render(<Toast variant="success">Success toast</Toast>);
    expect(screen.getByTestId('icon-check-circle')).toBeInTheDocument();

    rerender(<Toast variant="warning">Warning toast</Toast>);
    expect(screen.getByTestId('icon-exclamation-triangle')).toBeInTheDocument();

    rerender(<Toast variant="error">Error toast</Toast>);
    expect(screen.getByTestId('icon-exclamation-circle')).toBeInTheDocument();
  });

  test('renders with close button by default', () => {
    render(<Toast>Closable toast</Toast>);

    const closeButton = screen.getByRole('button', {
      name: /close notification/i,
    });
    expect(closeButton).toBeInTheDocument();
  });

  test('does not render close button when closable is false', () => {
    render(<Toast closable={false}>Non-closable toast</Toast>);

    const closeButton = screen.queryByRole('button', {
      name: /close notification/i,
    });
    expect(closeButton).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<Toast onClose={handleClose}>Closable toast</Toast>);

    const closeButton = screen.getByRole('button', {
      name: /close notification/i,
    });
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('auto-closes after duration', () => {
    const handleClose = vi.fn();
    render(
      <Toast onClose={handleClose} duration={2000}>
        Auto-closing toast
      </Toast>,
    );

    expect(handleClose).not.toHaveBeenCalled();

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not auto-close when duration is Infinity', () => {
    const handleClose = vi.fn();
    render(
      <Toast onClose={handleClose} duration={Number.POSITIVE_INFINITY}>
        Non-auto-closing toast
      </Toast>,
    );

    // Fast-forward a long time
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(handleClose).not.toHaveBeenCalled();
  });

  test('does not auto-close when isOpen is false', () => {
    const handleClose = vi.fn();
    render(
      <Toast onClose={handleClose} isOpen={false} duration={2000}>
        Closed toast
      </Toast>,
    );

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(handleClose).not.toHaveBeenCalled();
  });
});
