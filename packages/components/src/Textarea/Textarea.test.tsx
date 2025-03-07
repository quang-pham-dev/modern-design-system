import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Textarea } from './index';
import { useTheme } from '@modern-design-system/hooks';

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: vi.fn(),
}));

describe('Textarea Component', () => {
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
    render(<Textarea placeholder="Enter text" />);
    const textareaElement = screen.getByPlaceholderText('Enter text');
    expect(textareaElement).toBeInTheDocument();
  });

  test('applies different sizes correctly', () => {
    const { rerender } = render(<Textarea size="sm" data-testid="textarea" />);
    let textarea = screen.getByTestId('textarea');
    expect(textarea).toBeInTheDocument();

    rerender(<Textarea size="lg" data-testid="textarea" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toBeInTheDocument();
  });

  test('applies different variants correctly', () => {
    const { rerender } = render(
      <Textarea variant="outlined" data-testid="textarea" />,
    );
    let textarea = screen.getByTestId('textarea');
    expect(textarea).toBeInTheDocument();

    rerender(<Textarea variant="filled" data-testid="textarea" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toBeInTheDocument();

    rerender(<Textarea variant="standard" data-testid="textarea" />);
    textarea = screen.getByTestId('textarea');
    expect(textarea).toBeInTheDocument();
  });

  test('handles disabled state correctly', () => {
    render(<Textarea disabled data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeDisabled();
  });

  test('handles error state correctly', () => {
    render(<Textarea error data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeInTheDocument();
    // Visual testing would be needed to verify the error styling
  });

  test('handles fullWidth prop correctly', () => {
    render(<Textarea fullWidth data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveStyle('width: 100%');
  });

  test('sets minRows correctly', () => {
    render(<Textarea minRows={5} data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveStyle('min-height: 7.5em');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} data-testid="textarea" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('textarea'));
  });

  test('handles user input correctly', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Textarea onChange={handleChange} data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');

    await user.type(textarea, 'Hello');
    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(textarea).toHaveValue('Hello');
  });

  test('auto-resizes when autoResize is true', async () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get: () => 100,
    });

    window.getComputedStyle = vi.fn().mockReturnValue({
      lineHeight: '20px',
    });

    const handleChange = vi.fn();
    render(
      <Textarea
        autoResize
        maxRows={6}
        onChange={handleChange}
        data-testid="textarea"
      />,
    );

    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: 'New content' } });

    expect(handleChange).toHaveBeenCalled();
    expect(textarea.style.height).toBe('100px');
  });
});
