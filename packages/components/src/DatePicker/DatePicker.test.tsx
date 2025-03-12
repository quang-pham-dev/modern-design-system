import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@modern-design-system/theme';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  const onChange = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <DatePicker placeholder="Select date" onChange={onChange} />
      </ThemeProvider>,
    );

    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
  });

  test('opens calendar when input is focused', async () => {
    render(
      <ThemeProvider>
        <DatePicker placeholder="Select date" onChange={onChange} />
      </ThemeProvider>,
    );

    const input = screen.getByPlaceholderText('Select date');
    fireEvent.focus(input);

    // Calendar should be visible
    await waitFor(() => {
      expect(screen.getByText('Sun')).toBeInTheDocument();
      expect(screen.getByText('Mon')).toBeInTheDocument();
      // Check for month selector
      expect(
        screen.getByRole('combobox', { name: 'Select month' }),
      ).toBeInTheDocument();
      // Check for year selector
      expect(
        screen.getByRole('combobox', { name: 'Select year' }),
      ).toBeInTheDocument();
    });
  });

  test('selects a date when clicked', async () => {
    const today = new Date();

    render(
      <ThemeProvider>
        <DatePicker placeholder="Select date" onChange={onChange} />
      </ThemeProvider>,
    );

    const input = screen.getByPlaceholderText('Select date');
    fireEvent.focus(input);

    // Find today's date in the calendar and click it
    const todayDate = today.getDate().toString();
    const dateCell = screen.getAllByText(todayDate)[0];
    if (dateCell) {
      fireEvent.click(dateCell);
    }

    // onChange should be called with the selected date
    expect(onChange).toHaveBeenCalled();

    // The input should have a formatted date
    const formattedMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const formattedDay = today.getDate().toString().padStart(2, '0');
    const formattedYear = today.getFullYear();

    expect(input).toHaveValue(
      `${formattedMonth}/${formattedDay}/${formattedYear}`,
    );
  });

  test('handles manual input correctly', () => {
    render(
      <ThemeProvider>
        <DatePicker placeholder="Select date" onChange={onChange} />
      </ThemeProvider>,
    );

    const input = screen.getByPlaceholderText('Select date');
    fireEvent.change(input, { target: { value: '12/25/2023' } });

    expect(onChange).toHaveBeenCalled();
    const selectedDate = onChange.mock.calls[0]?.[0];
    expect(selectedDate.getMonth()).toBe(11); // December is 11 (0-indexed)
    expect(selectedDate.getDate()).toBe(25);
    expect(selectedDate.getFullYear()).toBe(2023);
  });

  test('handles invalid date input', () => {
    render(
      <ThemeProvider>
        <DatePicker placeholder="Select date" onChange={onChange} />
      </ThemeProvider>,
    );

    const input = screen.getByPlaceholderText('Select date');
    fireEvent.change(input, { target: { value: 'invalid date' } });

    // onChange should not be called for invalid dates
    expect(onChange).not.toHaveBeenCalled();
  });

  test('respects min and max date constraints', async () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 5);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 5);

    render(
      <ThemeProvider>
        <DatePicker
          placeholder="Select date"
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
        />
      </ThemeProvider>,
    );

    const input = screen.getByPlaceholderText('Select date');
    fireEvent.focus(input);

    // Try to select a date before minDate (should be disabled)
    const pastDate = new Date(minDate);
    pastDate.setDate(minDate.getDate() - 1);
    const pastDateString = pastDate.getDate().toString();

    // Find all elements with the past date text
    const pastDateElements = screen.queryAllByText(pastDateString);

    // If we found any elements with this date, check if they have the disabled styling
    for (const element of pastDateElements) {
      if (element.tagName === 'BUTTON') {
        // Check for CSS properties that indicate the button is disabled
        expect(element).toHaveStyle({
          opacity: '0.4',
          pointerEvents: 'none',
        });
      }
    }
  });

  test('handles different date formats', () => {
    render(
      <ThemeProvider>
        <DatePicker
          placeholder="Select date"
          onChange={onChange}
          dateFormat="DD/MM/YYYY"
        />
      </ThemeProvider>,
    );

    const input = screen.getByPlaceholderText('Select date');
    fireEvent.change(input, { target: { value: '25/12/2023' } });

    expect(onChange).toHaveBeenCalled();
    const selectedDate = onChange.mock.calls[0]?.[0] ?? new Date();
    expect(selectedDate.getMonth()).toBe(11); // December is 11 (0-indexed)
    expect(selectedDate.getDate()).toBe(25);
    expect(selectedDate.getFullYear()).toBe(2023);
  });

  test('is disabled when isDisabled is true', () => {
    render(
      <ThemeProvider>
        <DatePicker
          placeholder="Select date"
          onChange={onChange}
          isDisabled={true}
        />
      </ThemeProvider>,
    );

    const input = screen.getByPlaceholderText('Select date');
    expect(input).toBeDisabled();
  });

  test('is read-only when isReadOnly is true', () => {
    render(
      <ThemeProvider>
        <DatePicker
          placeholder="Select date"
          onChange={onChange}
          isReadOnly={true}
        />
      </ThemeProvider>,
    );

    const input = screen.getByPlaceholderText('Select date');
    expect(input).toHaveAttribute('readonly');
  });
});
