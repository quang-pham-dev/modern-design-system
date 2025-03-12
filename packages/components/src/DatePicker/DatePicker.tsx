import { forwardRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';
import { Input } from '../Input';
import { Button } from '../Button';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';
import type { InputProps } from '../Input';

export interface DatePickerProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  /**
   * The selected date
   */
  value?: Date | null;
  /**
   * Callback when date changes
   */
  onChange?: (date: Date | null) => void;
  /**
   * Format to display the date
   * @default 'MM/DD/YYYY'
   */
  dateFormat?: string;
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * If true, the datepicker is disabled
   */
  isDisabled?: boolean;
  /**
   * If true, the datepicker is read-only
   */
  isReadOnly?: boolean;
  /**
   * The system prop that allows defining system overrides
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const CalendarContainer = styled.div<{ theme: Theme }>`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  width: 280px;
  background-color: ${({ theme }) => getColor(theme, ['white'], '#ffffff')};
  border: 1px solid
    ${({ theme }) => getColor(theme, ['gray', '200'], '#E2E8F0')};
  border-radius: ${({ theme }) => theme.borderRadius.md || '0.375rem'};
  box-shadow: ${({ theme }) =>
    theme.shadows.md ||
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'};
  padding: 1rem;
  margin-top: 0.5rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const WeekdayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const WeekdayCell = styled.div<{ theme: Theme }>`
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => getColor(theme, ['gray', '600'], '#4A5568')};
  padding: 0.25rem 0;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;

const DayCell = styled.button<{
  isToday?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  theme: Theme;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.md || '0.375rem'};
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  background-color: ${({ isSelected, isToday, theme }) =>
    isSelected
      ? getColor(theme, ['blue', '500'], '#3182CE')
      : isToday
        ? getColor(theme, ['blue', '100'], '#EBF8FF')
        : 'transparent'};
  color: ${({ isSelected, isToday, theme }) =>
    isSelected
      ? getColor(theme, ['white'], '#FFFFFF')
      : isToday
        ? getColor(theme, ['blue', '600'], '#2B6CB0')
        : getColor(theme, ['gray', '700'], '#2D3748')};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.4 : 1)};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};

  &:hover:not(:disabled) {
    background-color: ${({ isSelected, theme }) =>
      isSelected
        ? getColor(theme, ['blue', '600'], '#2B6CB0')
        : getColor(theme, ['gray', '100'], '#EDF2F7')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px
      ${({ theme }) => getColor(theme, ['blue', '300'], '#90CDF4')};
  }
`;

const MonthYearSelect = styled.select<{ theme: Theme }>`
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md || '0.375rem'};
  border: 1px solid
    ${({ theme }) => getColor(theme, ['gray', '200'], '#E2E8F0')};
  background-color: ${({ theme }) => getColor(theme, ['white'], '#FFFFFF')};
  font-size: 0.875rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => getColor(theme, ['blue', '500'], '#3182CE')};
    box-shadow: 0 0 0 1px
      ${({ theme }) => getColor(theme, ['blue', '500'], '#3182CE')};
  }
`;

const IconButton = styled.button<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.md || '0.375rem'};
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${({ theme }) => getColor(theme, ['gray', '600'], '#4A5568')};

  &:hover {
    background-color: ${({ theme }) =>
      getColor(theme, ['gray', '100'], '#EDF2F7')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px
      ${({ theme }) => getColor(theme, ['blue', '300'], '#90CDF4')};
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

// Helper functions
const formatDate = (date: Date, format = 'MM/DD/YYYY'): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return format
    .replace(/DD/g, day)
    .replace(/MM/g, month)
    .replace(/YYYY/g, year.toString());
};

const parseDate = (dateString: string, format = 'MM/DD/YYYY'): Date | null => {
  if (!dateString) return null;

  const parts = dateString.split(/[/.-]/);
  if (parts.length !== 3) return null;

  let day: number;
  let month: number;
  let year: number;

  if (format.startsWith('MM')) {
    month = Number.parseInt(parts[0] ?? '0', 10) - 1;
    day = Number.parseInt(parts[1] ?? '0', 10);
    year = Number.parseInt(parts[2] ?? '0', 10);
  } else if (format.startsWith('DD')) {
    day = Number.parseInt(parts[0] ?? '0', 10);
    month = Number.parseInt(parts[1] ?? '0', 10) - 1;
    year = Number.parseInt(parts[2] ?? '0', 10);
  } else {
    return null;
  }

  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year))
    return null;

  const date = new Date(year, month, day);

  // Validate that the date is valid
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

const isDateInRange = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  if (minDate && date < minDate) return false;
  if (maxDate && date > maxDate) return false;
  return true;
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      dateFormat = 'MM/DD/YYYY',
      minDate,
      maxDate,
      placeholder = 'Select date',
      isDisabled = false,
      isReadOnly = false,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      value || null,
    );

    // Update input value when value prop changes
    useEffect(() => {
      if (value) {
        setSelectedDate(value);
        setInputValue(formatDate(value, dateFormat));
        setCurrentMonth(new Date(value));
      } else {
        setSelectedDate(null);
        setInputValue('');
      }
    }, [value, dateFormat]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      const parsedDate = parseDate(newValue, dateFormat);
      if (parsedDate && isDateInRange(parsedDate, minDate, maxDate)) {
        setSelectedDate(parsedDate);
        onChange?.(parsedDate);
      } else if (newValue === '') {
        setSelectedDate(null);
        onChange?.(null);
      }
    };

    const handleInputFocus = () => {
      if (!isDisabled && !isReadOnly) {
        setIsOpen(true);
      }
    };

    const handleInputBlur = () => {
      // Delay closing to allow for calendar interactions
      setTimeout(() => {
        if (document.activeElement?.closest('.datepicker-calendar') === null) {
          setIsOpen(false);
        }
      }, 100);
    };

    const handleDateSelect = (date: Date) => {
      setSelectedDate(date);
      setInputValue(formatDate(date, dateFormat));
      setIsOpen(false);
      onChange?.(date);
    };

    const handlePrevMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
      );
    };

    const handleNextMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
      );
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newMonth = Number.parseInt(e.target.value, 10);
      setCurrentMonth(new Date(currentMonth.getFullYear(), newMonth, 1));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newYear = Number.parseInt(e.target.value, 10);
      setCurrentMonth(new Date(newYear, currentMonth.getMonth(), 1));
    };

    // Generate calendar days
    const generateCalendarDays = () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();

      // First day of the month
      const firstDay = new Date(year, month, 1);
      // Last day of the month
      const lastDay = new Date(year, month + 1, 0);

      // Day of the week for the first day (0-6, where 0 is Sunday)
      const firstDayOfWeek = firstDay.getDay();

      // Total days in the month
      const daysInMonth = lastDay.getDate();

      // Array to hold all calendar days
      const days = [];

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(null);
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        days.push(date);
      }

      return days;
    };

    const calendarDays = generateCalendarDays();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Generate year options (10 years before and after current year)
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from(
      { length: 21 },
      (_, i) => currentYear - 10 + i,
    );

    return (
      <InputWrapper>
        <Input
          ref={ref}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          endAdornment={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => !isDisabled && !isReadOnly && setIsOpen(!isOpen)}
              aria-label="Toggle calendar"
              tabIndex={-1}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Toggle calendar</title>
                <path
                  d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 13.5C11.72 13.5 11.5 13.72 11.5 14C11.5 14.28 11.72 14.5 12 14.5C12.28 14.5 12.5 14.28 12.5 14C12.5 13.72 12.28 13.5 12 13.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 13.5C15.72 13.5 15.5 13.72 15.5 14C15.5 14.28 15.72 14.5 16 14.5C16.28 14.5 16.5 14.28 16.5 14C16.5 13.72 16.28 13.5 16 13.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 13.5C7.72 13.5 7.5 13.72 7.5 14C7.5 14.28 7.72 14.5 8 14.5C8.28 14.5 8.5 14.28 8.5 14C8.5 13.72 8.28 13.5 8 13.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 17.5C11.72 17.5 11.5 17.72 11.5 18C11.5 18.28 11.72 18.5 12 18.5C12.28 18.5 12.5 18.28 12.5 18C12.5 17.72 12.28 17.5 12 17.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 17.5C15.72 17.5 15.5 17.72 15.5 18C15.5 18.28 15.72 18.5 16 18.5C16.28 18.5 16.5 18.28 16.5 18C16.5 17.72 16.28 17.5 16 17.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 17.5C7.72 17.5 7.5 17.72 7.5 18C7.5 18.28 7.72 18.5 8 18.5C8.28 18.5 8.5 18.28 8.5 18C8.5 17.72 8.28 17.5 8 17.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          }
          {...props}
        />
        {isOpen && (
          <CalendarContainer theme={theme} className="datepicker-calendar">
            <CalendarHeader>
              <IconButton
                onClick={handlePrevMonth}
                theme={theme}
                aria-label="Previous month"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Previous month</title>
                  <path
                    d="M15 19L8 12L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </IconButton>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <MonthYearSelect
                  value={currentMonth.getMonth()}
                  onChange={handleMonthChange}
                  theme={theme}
                  aria-label="Select month"
                >
                  {MONTHS.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </MonthYearSelect>
                <MonthYearSelect
                  value={currentMonth.getFullYear()}
                  onChange={handleYearChange}
                  theme={theme}
                  aria-label="Select year"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </MonthYearSelect>
              </div>
              <IconButton
                onClick={handleNextMonth}
                theme={theme}
                aria-label="Next month"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Next month</title>
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </IconButton>
            </CalendarHeader>
            <WeekdayHeader>
              {WEEKDAYS.map((weekday) => (
                <WeekdayCell key={weekday} theme={theme}>
                  {weekday}
                </WeekdayCell>
              ))}
            </WeekdayHeader>
            <DaysGrid>
              {calendarDays.map((date, index) => {
                if (date === null) {
                  return <div key={`empty-${index.toString()}`} />;
                }

                const isToday =
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear();

                const isSelected =
                  selectedDate !== null &&
                  date.getDate() === selectedDate.getDate() &&
                  date.getMonth() === selectedDate.getMonth() &&
                  date.getFullYear() === selectedDate.getFullYear();

                const isDisabled = !isDateInRange(date, minDate, maxDate);

                return (
                  <DayCell
                    key={date.toISOString()}
                    isToday={isToday}
                    isSelected={isSelected}
                    isDisabled={isDisabled}
                    theme={theme}
                    onClick={() => !isDisabled && handleDateSelect(date)}
                    aria-label={date.toLocaleDateString()}
                    aria-selected={isSelected}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    {date.getDate()}
                  </DayCell>
                );
              })}
            </DaysGrid>
          </CalendarContainer>
        )}
      </InputWrapper>
    );
  },
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
