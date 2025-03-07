import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Input } from './index';
import { useTheme } from '@modern-design-system/hooks';

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: vi.fn(),
}));

describe('Input Component', () => {
  // Setup default mock implementation
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
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
        },
        borderRadius: {
          sm: 4,
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly with default props', () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  test('applies different sizes correctly', () => {
    const { rerender } = render(<Input inputSize="sm" data-testid="input" />);
    let input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();

    rerender(<Input inputSize="lg" data-testid="input" />);
    input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
  });

  test('applies different variants correctly', () => {
    const { rerender } = render(
      <Input variant="outlined" data-testid="input" />,
    );
    let input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();

    rerender(<Input variant="filled" data-testid="input" />);
    input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();

    rerender(<Input variant="standard" data-testid="input" />);
    input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
  });

  test('handles disabled state correctly', () => {
    render(<Input disabled data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
  });

  test('handles error state correctly', () => {
    render(<Input error data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
    // Visual testing would be needed to verify the error styling
  });

  test('handles fullWidth prop correctly', () => {
    render(<Input fullWidth data-testid="input" />);
    const inputContainer = screen.getByTestId('input').parentElement;
    expect(inputContainer).toHaveStyle('width: 100%');
  });

  test('renders with adornments correctly', () => {
    render(
      <Input
        startAdornment={<div data-testid="start-adornment">Start</div>}
        endAdornment={<div data-testid="end-adornment">End</div>}
        data-testid="input"
      />,
    );

    expect(screen.getByTestId('start-adornment')).toBeInTheDocument();
    expect(screen.getByTestId('end-adornment')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} data-testid="input" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('input'));
  });

  test('handles user input correctly', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input onChange={handleChange} data-testid="input" />);
    const input = screen.getByTestId('input');

    await user.type(input, 'Hello');
    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(input).toHaveValue('Hello');
  });
});
