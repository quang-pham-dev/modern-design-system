/**
 * @file Formatting utilities for the design system
 * @module utils/formatters
 */

/**
 * Formats a number as a currency string
 *
 * Uses the Intl.NumberFormat API to format numbers according to locale-specific
 * currency formatting rules.
 *
 * @param {number} value - The numeric value to format as currency
 * @param {string} locale - The locale to use for formatting (e.g., 'en-US', 'fr-FR')
 * @param {string} currency - The currency code to use (e.g., 'USD', 'EUR', 'VND')
 * @returns {string} The formatted currency string
 *
 * @example
 * // Returns "$1,234.56"
 * formatCurrency(1234.56);
 *
 * @example
 * // Returns "1 234,56 €"
 * formatCurrency(1234.56, 'fr-FR', 'EUR');
 */
export const formatCurrency = (
  value: number,
  locale = 'en-US',
  currency = 'USD',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

/**
 * Formats a date as a localized string
 *
 * Uses the Intl.DateTimeFormat API to format dates according to locale-specific
 * formatting rules. Accepts both Date objects and date strings.
 *
 * @param {Date | string} date - The date to format
 * @param {string} locale - The locale to use for formatting (e.g., 'en-US', 'ja-JP')
 * @param {Intl.DateTimeFormatOptions} [options] - Optional configuration for date formatting
 * @returns {string} The formatted date string
 *
 * @example
 * // Returns "January 1, 2023"
 * formatDate(new Date(2023, 0, 1));
 *
 * @example
 * // Returns "01/01/2023"
 * formatDate(new Date(2023, 0, 1), 'en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
 *
 * @example
 * // Returns "2023年1月1日"
 * formatDate('2023-01-01', 'ja-JP');
 */
export const formatDate = (
  date: Date | string,
  locale = 'en-US',
  options?: Intl.DateTimeFormatOptions,
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(
    new Date(date),
  );
};
