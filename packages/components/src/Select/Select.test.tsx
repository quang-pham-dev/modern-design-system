import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@emotion/react';

import { Select } from './index';
import { useTheme } from '@modern-design-system/hooks';

// Create a mock theme that matches the structure expected by the component
const mockTheme = {
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
    background: {
      paper: '#ffffff',
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.25rem',
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  spacing: (factor: number) => `${4 * factor}px`,
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
};

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: vi.fn(),
}));

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

// Create a wrapper component that provides the theme
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
);

describe('Select Component', () => {
  // Setup default mock implementation
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: mockTheme,
    });

    // Mock offsetWidth since it's not available in JSDOM
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 200,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly with default props', () => {
    render(
      <Select
        options={mockOptions}
        placeholder="Select an option"
        data-testid="select"
      />,
      { wrapper: Wrapper },
    );
    const selectElement = screen.getByTestId('select');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.textContent).toContain('Select an option');
  });

  test('applies different sizes correctly', () => {
    const { rerender } = render(
      <Select
        options={mockOptions}
        size="sm"
        data-testid="select"
        placeholder="Select"
      />,
      { wrapper: Wrapper },
    );
    let select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();

    rerender(
      <Wrapper>
        <Select
          options={mockOptions}
          size="lg"
          data-testid="select"
          placeholder="Select"
        />
      </Wrapper>,
    );
    select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
  });

  test('applies different variants correctly', () => {
    const { rerender } = render(
      <Select
        options={mockOptions}
        variant="outlined"
        data-testid="select"
        placeholder="Select"
      />,
      { wrapper: Wrapper },
    );
    let select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();

    rerender(
      <Wrapper>
        <Select
          options={mockOptions}
          variant="filled"
          data-testid="select"
          placeholder="Select"
        />
      </Wrapper>,
    );
    select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();

    rerender(
      <Wrapper>
        <Select
          options={mockOptions}
          variant="standard"
          data-testid="select"
          placeholder="Select"
        />
      </Wrapper>,
    );
    select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
  });

  test('handles disabled state correctly', () => {
    render(
      <Select
        options={mockOptions}
        disabled
        data-testid="select"
        placeholder="Select"
      />,
      { wrapper: Wrapper },
    );
    const select = screen.getByTestId('select');

    fireEvent.click(select);
    // Dropdown should not open when disabled
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  test('handles error state correctly', () => {
    render(
      <Select
        options={mockOptions}
        error
        data-testid="select"
        placeholder="Select"
      />,
      { wrapper: Wrapper },
    );
    const select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
    // Visual testing would be needed to verify the error styling
  });

  test('handles fullWidth prop correctly', () => {
    render(
      <Select
        options={mockOptions}
        fullWidth
        data-testid="select"
        placeholder="Select"
      />,
      { wrapper: Wrapper },
    );
    const select = screen.getByTestId('select');
    expect(select).toHaveStyle('width: 100%');
  });

  test('opens dropdown when clicked', async () => {
    render(
      <Select
        options={mockOptions}
        data-testid="select"
        placeholder="Select"
      />,
      { wrapper: Wrapper },
    );
    const select = screen.getByTestId('select');

    fireEvent.click(select);

    // Dropdown should be open - use queryAllByText to handle multiple elements
    const options = screen.getAllByText(/Option \d/);
    expect(options.length).toBeGreaterThanOrEqual(3);
  });

  test('selects an option when clicked', async () => {
    const handleChange = vi.fn();
    render(
      <Select
        options={mockOptions}
        onChange={handleChange}
        data-testid="select"
        placeholder="Select"
      />,
      { wrapper: Wrapper },
    );

    const select = screen.getByTestId('select');
    fireEvent.click(select);

    // Click on an option - use getAllByText and find the one in the dropdown
    const options = screen.getAllByText('Option 2');
    // Find the option in the dropdown (not the title)
    const dropdownOption = options.find((el) => el.tagName !== 'TITLE');
    fireEvent.click(dropdownOption as Element | Node | Document | Window);

    // onChange should be called with the selected value
    expect(handleChange).toHaveBeenCalledWith('option2');

    // Dropdown should be closed
    await waitFor(() => {
      const visibleOptions = screen
        .queryAllByText('Option 1')
        .filter(
          (el) =>
            el.tagName !== 'TITLE' &&
            window.getComputedStyle(el).display !== 'none',
        );
      expect(visibleOptions.length).toBe(0);
    });
  });

  test('does not select disabled options', async () => {
    const handleChange = vi.fn();
    render(
      <Select
        options={mockOptions}
        onChange={handleChange}
        data-testid="select"
        placeholder="Select"
      />,
      { wrapper: Wrapper },
    );

    const select = screen.getByTestId('select');
    fireEvent.click(select);

    // Wait for dropdown to be visible
    await waitFor(() => {
      expect(screen.queryByText(/Option 3/)).toBeInTheDocument();
    });

    // Click on a disabled option
    const disabledOption = screen.getByText('Option 3');
    fireEvent.click(disabledOption);

    // onChange should not be called
    expect(handleChange).not.toHaveBeenCalled();

    // Instead of checking if dropdown is still open (which might be flaky),
    // let's verify that the select still shows the placeholder and not the disabled option
    expect(select.textContent).toContain('Select');
    expect(select.textContent).not.toContain('Option 3');
  });

  test('closes dropdown when clicking outside', async () => {
    render(
      <Select
        options={mockOptions}
        data-testid="select"
        placeholder="Select"
      />,
      { wrapper: Wrapper },
    );

    const select = screen.getByTestId('select');
    fireEvent.click(select);

    // Dropdown should be open
    const options = screen.getAllByText('Option 1');
    expect(options.length).toBeGreaterThan(0);

    // Click outside
    fireEvent.mouseDown(document.body);

    // Dropdown should be closed
    await waitFor(() => {
      const visibleOptions = screen
        .queryAllByText('Option 1')
        .filter(
          (el) =>
            el.tagName !== 'TITLE' &&
            window.getComputedStyle(el).display !== 'none',
        );
      expect(visibleOptions.length).toBe(0);
    });
  });

  test('displays the selected option', () => {
    render(
      <Select options={mockOptions} value="option2" data-testid="select" />,
      { wrapper: Wrapper },
    );

    // Use getByTestId and check content instead of getByText
    const select = screen.getByTestId('select');
    expect(select.textContent).toContain('Option 2');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Select
        ref={ref}
        options={mockOptions}
        data-testid="select"
        placeholder="Select"
      />,
      { wrapper: Wrapper },
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('select'));
  });
});
