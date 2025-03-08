import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Checkbox } from './index';
import { useTheme } from '@modern-design-system/hooks';

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: vi.fn(),
}));

describe('Checkbox Component', () => {
  // Setup default mock implementation

  // Mock onChange handler to use in multiple tests
  const noop = vi.fn();

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

    // Reset the noop mock before each test
    noop.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly with default props', () => {
    render(<Checkbox onChange={noop} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('renders with label', () => {
    render(<Checkbox label="Test Label" onChange={noop} />);
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Test Label');

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  test('applies different sizes correctly', () => {
    const { rerender } = render(
      <Checkbox size="sm" data-testid="checkbox" onChange={noop} />,
    );
    let checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();

    rerender(<Checkbox size="lg" data-testid="checkbox" onChange={noop} />);
    checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test('handles checked state correctly', () => {
    const handleChange = vi.fn();
    render(<Checkbox checked onChange={handleChange} data-testid="checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('handles indeterminate state correctly', () => {
    const handleChange = vi.fn();
    render(
      <Checkbox indeterminate onChange={handleChange} data-testid="checkbox" />,
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveProperty('indeterminate', true);
  });

  test('handles disabled state correctly', () => {
    render(<Checkbox disabled data-testid="checkbox" onChange={noop} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  test('handles error state correctly', () => {
    render(<Checkbox error data-testid="checkbox" onChange={noop} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    // Visual testing would be needed to verify the error styling
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} data-testid="checkbox" onChange={noop} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByRole('checkbox'));
  });

  test('handles onChange event correctly', async () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} data-testid="checkbox" />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('handles user interaction correctly', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Checkbox onChange={handleChange} label="Click me" />);

    // Click on the label
    await user.click(screen.getByText('Click me'));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('transitions from unchecked to checked state', async () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Checkbox checked={false} onChange={handleChange} />,
    );
    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    rerender(<Checkbox checked={true} onChange={handleChange} />);
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('transitions from indeterminate to checked state', async () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Checkbox indeterminate={true} checked={false} onChange={handleChange} />,
    );
    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveProperty('indeterminate', true);
    expect(checkbox).not.toBeChecked();

    rerender(
      <Checkbox indeterminate={false} checked={true} onChange={handleChange} />,
    );
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveProperty('indeterminate', false);
    expect(checkbox).toBeChecked();
  });

  test('passes additional props to the input element', () => {
    render(<Checkbox name="test-name" value="test-value" onChange={noop} />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('name', 'test-name');
    expect(checkbox).toHaveAttribute('value', 'test-value');
  });

  test('applies className to the container', () => {
    render(<Checkbox className="custom-class" onChange={noop} />);
    const container = screen.getByRole('checkbox').closest('label');

    expect(container).toHaveClass('custom-class');
  });

  test('works with readOnly prop', () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        checked
        readOnly
        data-testid="checkbox"
        onChange={handleChange}
      />,
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('readOnly');
  });
});
