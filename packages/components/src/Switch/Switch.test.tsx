import type React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Switch from './Switch';
import { ThemeProvider } from '@modern-design-system/theme';
import '@testing-library/jest-dom';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Switch Component', () => {
  // Create a mock onChange handler to use in tests
  const mockOnChange = vi.fn();

  // Reset the mock before each test
  beforeEach(() => {
    mockOnChange.mockReset();
  });

  test('renders correctly', () => {
    renderWithTheme(<Switch data-testid="switch" onChange={mockOnChange} />);
    expect(screen.getByTestId('switch')).toBeInTheDocument();
  });

  test('renders with label', () => {
    renderWithTheme(<Switch label="Test Label" onChange={mockOnChange} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('handles checked state', () => {
    renderWithTheme(
      <Switch data-testid="switch" checked onChange={mockOnChange} />,
    );
    const switchInput = screen.getByTestId('switch');
    expect(switchInput).toBeChecked();
  });

  test('handles disabled state', () => {
    renderWithTheme(
      <Switch data-testid="switch" disabled onChange={mockOnChange} />,
    );
    const switchInput = screen.getByTestId('switch');
    expect(switchInput).toBeDisabled();
  });

  test('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    renderWithTheme(<Switch data-testid="switch" onChange={handleChange} />);

    const switchInput = screen.getByTestId('switch');
    fireEvent.click(switchInput);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('renders in different sizes', () => {
    const { rerender } = renderWithTheme(
      <Switch data-testid="switch" size="sm" onChange={mockOnChange} />,
    );

    // We can't easily test the exact size in pixels, but we can ensure it renders
    expect(screen.getByTestId('switch')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Switch data-testid="switch" size="md" onChange={mockOnChange} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('switch')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Switch data-testid="switch" size="lg" onChange={mockOnChange} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('switch')).toBeInTheDocument();
  });

  test('renders in error state', () => {
    renderWithTheme(
      <Switch data-testid="switch" error onChange={mockOnChange} />,
    );
    expect(screen.getByTestId('switch')).toBeInTheDocument();
    // Visual testing would be better for checking the error styling
  });
});
